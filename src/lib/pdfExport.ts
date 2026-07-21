const CANVAS_WIDTH = 1240;
const CANVAS_HEIGHT = 1754;
const PAGE_MARGIN = 100;
const CONTENT_WIDTH = CANVAS_WIDTH - PAGE_MARGIN * 2;
const PDF_WIDTH_POINTS = 595.28;
const PDF_HEIGHT_POINTS = 841.89;
const SERIF_FONT = '"Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP", serif';
const SANS_FONT = '"Yu Gothic", "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif';

type TextWeight = "normal" | "bold";

type DrawBlock = {
  text: string;
  size: number;
  lineHeight: number;
  color: string;
  weight?: TextWeight;
  font?: "serif" | "sans";
  marginTop?: number;
  marginBottom?: number;
  indent?: number;
  keepTogether?: boolean;
};

type PdfPage = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  y: number;
};

export async function downloadDiagnosisReportPdf(
  reportElement: HTMLElement,
  diagnosisDate: string,
): Promise<{ pageCount: number; byteLength: number }> {
  await document.fonts?.ready;

  const canvases = renderReportPages(reportElement);
  const pageImages = canvases.map((canvas) => {
    const dataUrl = canvas.toDataURL("image/jpeg", 0.94);
    return base64ToBytes(dataUrl.split(",")[1]);
  });
  const pdfBytes = createImagePdf(pageImages);
  const fileDate = diagnosisDate.replace(/[年月]/g, "-").replace("日", "");
  const fileName = `幕末・明治維新_経営資質診断結果_${fileDate}.pdf`;

  downloadBlob(new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" }), fileName);
  return { pageCount: pageImages.length, byteLength: pdfBytes.length };
}

function renderReportPages(reportElement: HTMLElement): HTMLCanvasElement[] {
  const pages: PdfPage[] = [];
  let currentPage = createPage("#ffffff");
  pages.push(currentPage);
  drawCompactReportHeader(currentPage, reportElement);

  const sections = reportElement.querySelectorAll<HTMLElement>(".report-body > .report-section");
  sections.forEach((section) => {
    if (currentPage.y > CANVAS_HEIGHT - 360) {
      currentPage = createPage("#ffffff");
      pages.push(currentPage);
    }

    drawDivider(currentPage);
    const blocks = extractSectionBlocks(section);
    blocks.forEach((block) => {
      currentPage = drawBlock(currentPage, pages, block);
    });
  });

  const footerText = reportElement.querySelector<HTMLElement>(".report-footer")?.textContent?.trim();
  if (footerText) {
    currentPage = drawBlock(currentPage, pages, {
      text: footerText,
      size: 21,
      lineHeight: 34,
      color: "#665e55",
      font: "sans",
      marginTop: 36,
      marginBottom: 0,
      keepTogether: true,
    });
  }

  return pages.map((page) => page.canvas);
}

function drawCompactReportHeader(page: PdfPage, reportElement: HTMLElement) {
  const titleLines = Array.from(reportElement.querySelectorAll<HTMLElement>(".report-cover h2 span"))
    .map((element) => element.textContent?.trim())
    .filter((text): text is string => Boolean(text));
  const title = titleLines.join(" ");
  const date = reportElement.querySelector<HTMLElement>(".report-meta dd")?.textContent?.trim();

  drawSingleLine(page, title, PAGE_MARGIN, 34, "#211d18", "bold", "serif");
  page.y += 54;
  if (date) {
    drawSingleLine(page, `診断日　${date}`, PAGE_MARGIN, 20, "#665e55", "normal", "sans");
    page.y += 42;
  }
}

function extractSectionBlocks(section: HTMLElement): DrawBlock[] {
  const blocks: DrawBlock[] = [];
  const heading = section.querySelector<HTMLElement>(":scope > h2");

  if (heading?.textContent?.trim()) {
    blocks.push({
      text: heading.textContent.trim(),
      size: heading.classList.contains("diagnosis-heading") ? 34 : 29,
      lineHeight: 48,
      color: "#806224",
      weight: "bold",
      marginBottom: 22,
      keepTogether: true,
    });
  }

  Array.from(section.children).forEach((child) => {
    if (!(child instanceof HTMLElement) || child === heading) {
      return;
    }

    if (child.matches("p")) {
      const text = child.textContent?.trim();
      if (!text) {
        return;
      }

      if (child.classList.contains("diagnosis-type-title")) {
        blocks.push(textBlock(text, child.classList.contains("secondary") ? 46 : 52, 64, "#211d18", "bold", 8, 22));
      } else if (child.classList.contains("diagnosis-combination")) {
        blocks.push(textBlock(text, 42, 58, "#211d18", "bold", 6, 14));
      } else if (child.classList.contains("diagnosis-combination-people")) {
        blocks.push(textBlock(text, 24, 38, "#665e55", "normal", 0, 20));
      } else {
        blocks.push(textBlock(text, 24, 41, "#332e27", "normal", 0, 20));
      }
      return;
    }

    if (child.classList.contains("diagnosis-person")) {
      const label = child.querySelector("span")?.textContent?.trim();
      const person = child.querySelector("strong")?.textContent?.trim();
      const stars = child.querySelector(".diagnosis-stars")?.textContent?.trim();
      if (label) blocks.push(textBlock(label, 19, 30, "#665e55", "normal", 8, 6, "sans"));
      if (person) blocks.push(textBlock(person, 30, 44, "#211d18", "bold", 0, 4));
      if (stars) blocks.push(textBlock(stars, 24, 35, "#806224", "bold", 0, 20));
      return;
    }

    if (child.classList.contains("diagnosis-advice")) {
      child.querySelectorAll<HTMLElement>("p").forEach((paragraph) => {
        const text = paragraph.textContent?.trim();
        if (text) blocks.push(textBlock(text, 23, 39, "#332e27", "normal", 0, 18));
      });
      return;
    }

    if (child.classList.contains("diagnosis-points")) {
      child.querySelectorAll<HTMLElement>(":scope > div").forEach((column) => {
        const title = column.querySelector("h3")?.textContent?.trim();
        if (title) blocks.push(textBlock(title, 24, 38, "#806224", "bold", 8, 8));
        column.querySelectorAll<HTMLElement>("li").forEach((item) => {
          const text = item.textContent?.trim();
          if (text) blocks.push(listBlock(text));
        });
      });
      return;
    }

    if (child.matches("ul")) {
      child.querySelectorAll<HTMLElement>(":scope > li").forEach((item) => {
        const text = item.textContent?.trim();
        if (text) blocks.push(listBlock(text));
      });
    }
  });

  return blocks;
}

function textBlock(
  text: string,
  size: number,
  lineHeight: number,
  color: string,
  weight: TextWeight,
  marginTop: number,
  marginBottom: number,
  font: "serif" | "sans" = "serif",
): DrawBlock {
  return { text, size, lineHeight, color, weight, marginTop, marginBottom, font };
}

function listBlock(text: string): DrawBlock {
  return {
    text: `・${text}`,
    size: 22,
    lineHeight: 36,
    color: "#332e27",
    marginBottom: 8,
    indent: 16,
  };
}

function drawBlock(page: PdfPage, pages: PdfPage[], block: DrawBlock): PdfPage {
  const marginTop = block.marginTop ?? 0;
  const marginBottom = block.marginBottom ?? 0;
  const indent = block.indent ?? 0;
  const maxWidth = CONTENT_WIDTH - indent;
  const context = page.context;
  context.font = fontValue(block.size, block.weight ?? "normal", block.font ?? "serif");
  const lines = wrapText(context, block.text, maxWidth);
  const blockHeight = marginTop + lines.length * block.lineHeight + marginBottom;

  if (block.keepTogether && page.y + blockHeight > CANVAS_HEIGHT - PAGE_MARGIN && page.y > PAGE_MARGIN) {
    page = createPage("#ffffff");
    pages.push(page);
  }

  page.y += marginTop;
  lines.forEach((line) => {
    if (page.y + block.lineHeight > CANVAS_HEIGHT - PAGE_MARGIN) {
      page = createPage("#ffffff");
      pages.push(page);
      page.context.font = fontValue(block.size, block.weight ?? "normal", block.font ?? "serif");
    }

    page.context.fillStyle = block.color;
    page.context.fillText(line, PAGE_MARGIN + indent, page.y);
    page.y += block.lineHeight;
  });
  page.y += marginBottom;

  return page;
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  const characters = Array.from(normalizedText);
  const lines: string[] = [];
  let currentLine = "";

  characters.forEach((character) => {
    const candidate = currentLine + character;
    if (currentLine && context.measureText(candidate).width > maxWidth) {
      lines.push(currentLine.trimEnd());
      currentLine = character.trimStart();
    } else {
      currentLine = candidate;
    }
  });

  if (currentLine) {
    lines.push(currentLine.trimEnd());
  }

  return lines.length ? lines : [""];
}

function createPage(background: string): PdfPage {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("PDF描画用の画面を作成できませんでした。");
  }

  context.fillStyle = background;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.textBaseline = "top";

  return { canvas, context, y: PAGE_MARGIN };
}

function drawDivider(page: PdfPage) {
  if (page.y > PAGE_MARGIN) {
    page.y += 12;
  }
  page.context.strokeStyle = "#b9aa88";
  page.context.lineWidth = 2;
  page.context.beginPath();
  page.context.moveTo(PAGE_MARGIN, page.y);
  page.context.lineTo(CANVAS_WIDTH - PAGE_MARGIN, page.y);
  page.context.stroke();
  page.y += 28;
}

function drawSingleLine(
  page: PdfPage,
  text: string,
  x: number,
  size: number,
  color: string,
  weight: TextWeight,
  font: "serif" | "sans",
) {
  page.context.font = fontValue(size, weight, font);
  page.context.fillStyle = color;
  page.context.fillText(text, x, page.y);
}

function fontValue(size: number, weight: TextWeight, font: "serif" | "sans"): string {
  return `${weight === "bold" ? 700 : 400} ${size}px ${font === "serif" ? SERIF_FONT : SANS_FONT}`;
}

function createImagePdf(images: Uint8Array[]): Uint8Array {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let byteLength = 0;

  const appendBytes = (bytes: Uint8Array) => {
    chunks.push(bytes);
    byteLength += bytes.length;
  };
  const appendText = (text: string) => appendBytes(encoder.encode(text));
  const startObject = (id: number) => {
    offsets[id] = byteLength;
    appendText(`${id} 0 obj\n`);
  };

  appendText("%PDF-1.4\n");
  appendBytes(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));

  startObject(1);
  appendText("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  const pageIds = images.map((_, index) => 3 + index * 3);
  startObject(2);
  appendText(`<< /Type /Pages /Count ${images.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>\nendobj\n`);

  images.forEach((imageBytes, index) => {
    const pageId = 3 + index * 3;
    const imageId = pageId + 1;
    const contentId = pageId + 2;

    startObject(pageId);
    appendText(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PDF_WIDTH_POINTS} ${PDF_HEIGHT_POINTS}] `
      + `/Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`,
    );

    startObject(imageId);
    appendText(
      `<< /Type /XObject /Subtype /Image /Width ${CANVAS_WIDTH} /Height ${CANVAS_HEIGHT} `
      + `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`,
    );
    appendBytes(imageBytes);
    appendText("\nendstream\nendobj\n");

    const content = `q\n${PDF_WIDTH_POINTS} 0 0 ${PDF_HEIGHT_POINTS} 0 0 cm\n/Im0 Do\nQ\n`;
    startObject(contentId);
    appendText(`<< /Length ${encoder.encode(content).length} >>\nstream\n${content}endstream\nendobj\n`);
  });

  const xrefOffset = byteLength;
  const objectCount = 2 + images.length * 3;
  appendText(`xref\n0 ${objectCount + 1}\n`);
  appendText("0000000000 65535 f \n");

  for (let id = 1; id <= objectCount; id += 1) {
    appendText(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  }

  appendText(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return concatenateBytes(chunks, byteLength);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function concatenateBytes(chunks: Uint8Array[], byteLength: number): Uint8Array {
  const result = new Uint8Array(byteLength);
  let offset = 0;

  chunks.forEach((chunk) => {
    result.set(chunk, offset);
    offset += chunk.length;
  });

  return result;
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

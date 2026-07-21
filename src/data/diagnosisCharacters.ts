export type DiagnosisCharacterId =
  | "yoshida"
  | "kusaka"
  | "takasugi"
  | "kido"
  | "sakamoto"
  | "omura"
  | "saigo"
  | "okubo"
  | "katsu"
  | "yamagata";

export type DiagnosisCharacter = {
  id: DiagnosisCharacterId;
  name: string;
  type: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  secondaryDescription: string;
  recommendedPath: string;
};

export const diagnosisCharacters: DiagnosisCharacter[] = [
  {
    id: "yoshida",
    name: "吉田松陰",
    type: "理念型",
    summary: "大切にすべき理念を掲げ、人の心に火をつけながら未来への道を示すことが得意です",
    strengths: ["理念や目的を言葉にできる", "人の可能性を信じて育てられる", "困難な状況でも志を失いにくい"],
    challenges: ["理想が先に立ち、現実の制約を見落とすことがある", "周囲に高い覚悟を求めすぎることがある"],
    secondaryDescription: "人の可能性を信じ、理念によって周囲を奮い立たせる力",
    recommendedPath: "事業の存在意義を言葉にし、新しい構想を示すことや、次の世代を担う人材を育てること",
  },
  {
    id: "kusaka",
    name: "久坂玄瑞",
    type: "信念型",
    summary: "強い信念を軸に、迷いの多い局面でも覚悟をもって前に進むことが得意です",
    strengths: ["ぶれない判断軸を持てる", "困難な局面で覚悟を示せる", "周囲に本気度を伝えられる"],
    challenges: ["信念が強いほど選択肢を狭めることがある", "状況の変化に合わせた軌道修正が遅れることがある"],
    secondaryDescription: "信念を貫き、困難な場面でも覚悟を示す力",
    recommendedPath: "難しい局面で判断基準を明確にし、事業の立て直しや重要な方針転換を先頭に立って進めること",
  },
  {
    id: "takasugi",
    name: "高杉晋作",
    type: "革新型",
    summary: "古い前提にとらわれず、状況を打開する新しい一手を選ぶことが得意です",
    strengths: ["停滞した状況を動かせる", "前例に縛られず発想できる", "勝負所で大胆に踏み出せる"],
    challenges: ["周囲がついてくる前に動きすぎることがある", "勢いが強いほど反発を招くことがある"],
    secondaryDescription: "前例にとらわれず、停滞した状況を動かす突破力",
    recommendedPath: "新規事業の立ち上げや事業転換など、従来の方法では前へ進めない課題に新しい道をつくること",
  },
  {
    id: "kido",
    name: "木戸孝允",
    type: "戦略型",
    summary: "先を見通し、組織全体の進む方向を考えながら改革を進めることが得意です",
    strengths: ["長期的な視点から方針を考えられる", "複雑な状況を整理できる", "周囲と調整しながら改革を進められる"],
    challenges: ["慎重になりすぎて決断が遅れることがある", "周囲への配慮から自分の考えを抑えることがある"],
    secondaryDescription: "状況を広く捉え、将来を見据えて物事の順序を組み立てる力",
    recommendedPath: "中長期の経営戦略や事業計画を描き、複雑な課題を整理して組織の進む順序を定めること",
  },
  {
    id: "sakamoto",
    name: "坂本龍馬",
    type: "共創型",
    summary: "立場の異なる人をつなぎ、協力者を増やしながら構想を形にすることが得意です",
    strengths: ["人と人をつなげられる", "異なる意見から新しい可能性を見つけられる", "開かれた関係性をつくれる"],
    challenges: ["構想が広がりすぎて焦点がぼやけることがある", "調整相手が増えるほど実行が遅れることがある"],
    secondaryDescription: "立場の異なる人をつなぎ、協力関係を広げる力",
    recommendedPath: "他社との連携や部門横断のプロジェクトなど、異なる立場の人々を結んで新しい価値を生み出すこと",
  },
  {
    id: "omura",
    name: "大村益次郎",
    type: "合理型",
    summary: "感情に流されず、事実と仕組みから最も合理的な道を選ぶことが得意です",
    strengths: ["状況を冷静に分析できる", "仕組みや制度で問題を解決できる", "無駄を減らして成果に近づける"],
    challenges: ["正しさを重視するあまり感情面への配慮が薄くなることがある", "周囲に冷たく見られることがある"],
    secondaryDescription: "感情に流されず、事実と仕組みから判断する力",
    recommendedPath: "業務改善やデジタル化、収益構造の見直しなど、事実を分析して仕組みから成果を高めること",
  },
  {
    id: "saigo",
    name: "西郷隆盛",
    type: "人望型",
    summary: "人の思いを受け止め、信頼と覚悟によって周囲をまとめることが得意です",
    strengths: ["人から信頼されやすい", "相手の感情や誇りを受け止められる", "大きな局面で腹をくくれる"],
    challenges: ["人情を重んじるほど判断が重くなることがある", "期待を背負い込みすぎることがある"],
    secondaryDescription: "人の思いを受け止め、信頼によって周囲を動かす力",
    recommendedPath: "組織文化づくりや人材育成、後継者の支援など、人の信頼を土台に組織を一つにまとめること",
  },
  {
    id: "okubo",
    name: "大久保利通",
    type: "実行型",
    summary: "必要な改革を現実に進めるため、決断と実務を積み重ねることが得意です",
    strengths: ["決めたことを実行に移せる", "制度や組織を現実的に作り替えられる", "厳しい判断から逃げにくい"],
    challenges: ["実行を優先するほど周囲に厳しく映ることがある", "反発や孤立を招くことがある"],
    secondaryDescription: "構想を現実に落とし込み、粘り強く実行する力",
    recommendedPath: "組織改革や制度導入、重要プロジェクトなど、決めた方針を具体的な計画へ落とし込み完遂すること",
  },
  {
    id: "katsu",
    name: "勝海舟",
    type: "調整型",
    summary: "対立する相手とも向き合い、全体を守る落としどころを探ることが得意です",
    strengths: ["対立を収める道を探せる", "広い視野で損失を抑えられる", "現実的な交渉ができる"],
    challenges: ["強い主張をする人から弱腰に見られることがある", "妥協点を探すほど本音が伝わりにくいことがある"],
    secondaryDescription: "対立の中でも全体を見て、現実的な落としどころを探る力",
    recommendedPath: "利害の異なる関係者との交渉や組織統合など、対立を収めながら全体にとって納得できる着地点をつくること",
  },
  {
    id: "yamagata",
    name: "山縣有朋",
    type: "組織型",
    summary: "個人の力に頼りすぎず、継続して動く組織や仕組みを整えることが得意です",
    strengths: ["組織の規律を整えられる", "継続的に動く仕組みを考えられる", "リスクに備えた体制を作れる"],
    challenges: ["統制を重んじるほど柔軟さを欠くことがある", "現場の自由度を狭めることがある"],
    secondaryDescription: "継続して動く組織や体制を整える力",
    recommendedPath: "事業の拡大に耐えられる組織設計や権限分担、ガバナンスやリスク管理の仕組みを整えること",
  },
];

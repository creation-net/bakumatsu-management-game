import { chapters as fullChapters } from "@/data/chapters";
import type { Chapter, Choice, Passage } from "@/types/story";

type TrialChapterSource = {
  id: number;
  title: string;
  subtitle?: string;
  passages: Passage[];
  choices: Array<{
    label: string;
    text: string;
    value?: string;
  }>;
};

export type TrialEditReport = {
  chapterId: number;
  originalCharacters: number;
  editedCharacters: number;
  reductionRate: number;
  theme: string;
  removedNarrationSummary: string;
  changedDialogueSummary: string;
};

const trialChapterSources: TrialChapterSource[] = [
  {
    "id": 1,
    "title": "第一章 黒船来航",
    "subtitle": "時代の幕開け",
    "passages": [
      {
        "id": "trial-1-p-1",
        "kind": "narration",
        "text": "嘉永六年（1853年）。"
      },
      {
        "id": "trial-1-p-2",
        "kind": "narration",
        "text": "アメリカのペリー提督率いる黒船が浦賀へ現れた。"
      },
      {
        "id": "trial-1-p-3",
        "kind": "narration",
        "text": "二百年以上続いた泰平の世は、大きく揺れ始める。"
      },
      {
        "id": "trial-1-p-4",
        "kind": "scene",
        "text": "【長州藩　城下町】"
      },
      {
        "id": "trial-1-p-5",
        "kind": "narration",
        "text": "村瀬 新之助は、長州藩の下級武士である。"
      },
      {
        "id": "trial-1-p-6",
        "kind": "narration",
        "text": "国が変わろうとしていることは感じていた。"
      },
      {
        "id": "trial-1-p-7",
        "kind": "narration",
        "text": "しかし、自分に何ができるのか分からない。"
      },
      {
        "id": "trial-1-p-8",
        "kind": "narration",
        "text": "そんなある日、藩でも評判の秀才・久坂 玄瑞が声を掛ける。"
      },
      {
        "id": "trial-1-p-9",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「松下村塾へ来んか。」"
      },
      {
        "id": "trial-1-p-10",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「吉田 松陰先生がおられる。」"
      },
      {
        "id": "trial-1-p-11",
        "kind": "scene",
        "text": "【松下村塾】"
      },
      {
        "id": "trial-1-p-12",
        "kind": "narration",
        "text": "村瀬は初めて松下村塾を訪れる。"
      },
      {
        "id": "trial-1-p-13",
        "kind": "narration",
        "text": "そこでは吉田 松陰を囲み、多くの若者が国の未来について議論していた。"
      },
      {
        "id": "trial-1-p-14",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「黒船が現れた今、日本は大きな岐路に立っちょる。」"
      },
      {
        "id": "trial-1-p-15",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「皆はどう思う。」"
      },
      {
        "id": "trial-1-p-16",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「今こそ攘夷を決行すべきです。」"
      },
      {
        "id": "trial-1-p-17",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「日本が屈しない国であることを示さねばなりません。」"
      },
      {
        "id": "trial-1-p-18",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「志は立派じゃ。」"
      },
      {
        "id": "trial-1-p-19",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「じゃが、まずは西洋に学び、日本を強くすることが先じゃ。」"
      },
      {
        "id": "trial-1-p-20",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「どちらももっともじゃ。」"
      },
      {
        "id": "trial-1-p-21",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「じゃが、今はまだ何も見えちょらん。」"
      },
      {
        "id": "trial-1-p-22",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「情勢を見極め、来るべき日に備えることじゃ。」"
      },
      {
        "id": "trial-1-p-23",
        "kind": "narration",
        "text": "三人の視線が村瀬へ向く。"
      },
      {
        "id": "trial-1-p-24",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「さて、村瀬君。」"
      },
      {
        "id": "trial-1-p-25",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「君なら、どう考える。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "今こそ、攘夷（外国を打ち払う）を決行すべきだ。\n（久坂玄瑞の考え）",
        "value": "久坂玄瑞の考え"
      },
      {
        "label": "②",
        "text": "まずは学び、日本を強くする道を探るべきだ。\n（吉田松陰の考え）",
        "value": "吉田松陰の考え"
      },
      {
        "label": "③",
        "text": "今は情勢を見極め、来るべき日に備えるべきだ。\n（高杉晋作の考え）",
        "value": "高杉晋作の考え"
      }
    ]
  },
  {
    "id": 2,
    "title": "第二章 安政の大獄",
    "subtitle": "志は誰が継ぐ",
    "passages": [
      {
        "id": "trial-2-p-1",
        "kind": "narration",
        "text": "安政六年（1859年）。"
      },
      {
        "id": "trial-2-p-2",
        "kind": "narration",
        "text": "吉田 松陰は江戸・伝馬町牢屋敷で処刑された。"
      },
      {
        "id": "trial-2-p-3",
        "kind": "narration",
        "text": "享年二十九。"
      },
      {
        "id": "trial-2-p-4",
        "kind": "narration",
        "text": "先生は最後まで、日本の未来を信じていた。"
      },
      {
        "id": "trial-2-p-5",
        "kind": "scene",
        "text": "【松下村塾】"
      },
      {
        "id": "trial-2-p-6",
        "kind": "narration",
        "text": "松陰を失った松下村塾には、静かな時間が流れていた。"
      },
      {
        "id": "trial-2-p-7",
        "kind": "narration",
        "text": "誰もが悲しみを抱えながら、それぞれの志を胸に秘めている。"
      },
      {
        "id": "trial-2-p-8",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「先生は死んだ。」"
      },
      {
        "id": "trial-2-p-9",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「じゃが、先生の志まで終わらせちゃならん。」"
      },
      {
        "id": "trial-2-p-10",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「古い世を壊し、新しい日本をつくる。」"
      },
      {
        "id": "trial-2-p-11",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「そのために、時代に合わせて戦い方も変えにゃならん。」"
      },
      {
        "id": "trial-2-p-12",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「わしは、変革によって先生の志を継ぐ。」"
      },
      {
        "id": "trial-2-p-13",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「先生は正しいと思う道のために命を懸けられた。」"
      },
      {
        "id": "trial-2-p-14",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「ならば我らも、志を言葉で終わらせてはならん。」"
      },
      {
        "id": "trial-2-p-15",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「私は、命を懸けて志を実行します。」"
      },
      {
        "id": "trial-2-p-16",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「二人とも先生を思う気持ちは同じじゃ。」"
      },
      {
        "id": "trial-2-p-17",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「じゃが、一人の命だけでは国は変わらん。」"
      },
      {
        "id": "trial-2-p-18",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「志を人へ伝え、未来へ受け継ぐ。」"
      },
      {
        "id": "trial-2-p-19",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「私は、継承によって先生の志を守りたい。」"
      },
      {
        "id": "trial-2-p-20",
        "kind": "narration",
        "text": "村瀬は三人の言葉を静かに聞いていた。"
      },
      {
        "id": "trial-2-p-21",
        "kind": "narration",
        "text": "どれも先生を思う気持ちから生まれた考えだった。"
      },
      {
        "id": "trial-2-p-22",
        "kind": "narration",
        "text": "その時、先生の言葉が頭をよぎる。"
      },
      {
        "id": "trial-2-p-23",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「諸君、狂いたまえ。」"
      },
      {
        "id": "trial-2-p-24",
        "kind": "narration",
        "text": "久坂が村瀬へ目を向ける。"
      },
      {
        "id": "trial-2-p-25",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「村瀬。」"
      },
      {
        "id": "trial-2-p-26",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「お前なら、どうする。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "先生の志は、古い世を壊し、新しい道を切り開くことで受け継ぐべきです。\n（変革によって志を継ぐ）",
        "value": "変革によって志を継ぐ"
      },
      {
        "label": "②",
        "text": "先生の志は、命を懸けて実行することで受け継ぐべきです。\n（決行によって志を継ぐ）",
        "value": "決行によって志を継ぐ"
      },
      {
        "label": "③",
        "text": "先生の志は、人と組織に残し、未来へつなぐことで受け継ぐべきです。\n（継承によって志を継ぐ）",
        "value": "継承によって志を継ぐ"
      }
    ]
  },
  {
    "id": 3,
    "title": "第三章 京都料亭にて",
    "subtitle": "日本を動かす都",
    "passages": [
      {
        "id": "trial-3-p-1",
        "kind": "narration",
        "text": "文久二年（1862年）。"
      },
      {
        "id": "trial-3-p-2",
        "kind": "narration",
        "text": "吉田 松陰が処刑されて数年。"
      },
      {
        "id": "trial-3-p-3",
        "kind": "narration",
        "text": "久坂 玄瑞、高杉 晋作、桂 小五郎らは、それぞれの方法で日本を変えようと動き始めていた。"
      },
      {
        "id": "trial-3-p-4",
        "kind": "narration",
        "text": "その中心となったのが、天皇のおられる都・京都だった。"
      },
      {
        "id": "trial-3-p-5",
        "kind": "scene",
        "text": "【京都・料亭・近江屋】"
      },
      {
        "id": "trial-3-p-6",
        "kind": "narration",
        "text": "静かな座敷に、三人の男が向かい合っていた。"
      },
      {
        "id": "trial-3-p-7",
        "kind": "narration",
        "text": "幕臣・勝 海舟。"
      },
      {
        "id": "trial-3-p-8",
        "kind": "narration",
        "text": "薩摩藩の西郷 吉之助。"
      },
      {
        "id": "trial-3-p-9",
        "kind": "narration",
        "text": "土佐藩出身の坂本 龍馬。"
      },
      {
        "id": "trial-3-p-10",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「今日は敵味方はなしじゃき。」"
      },
      {
        "id": "trial-3-p-11",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「日本の話をしようぜよ。」"
      },
      {
        "id": "trial-3-p-12",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「幕府が古くなったのは、俺も認める。」"
      },
      {
        "id": "trial-3-p-13",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「だが、古いってだけで全部壊しちまうのはよくねぇ。」"
      },
      {
        "id": "trial-3-p-14",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「残すもんは残す。」"
      },
      {
        "id": "trial-3-p-15",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「直すもんは直す。」"
      },
      {
        "id": "trial-3-p-16",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「今ある仕組みを活かして、国を変えるべきだ。」"
      },
      {
        "id": "trial-3-p-17",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「そいは立派な考えでごわす。」"
      },
      {
        "id": "trial-3-p-18",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「じゃっどん、話し合いばかりで日本は変わりもしたか。」"
      },
      {
        "id": "trial-3-p-19",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「今こそ覚悟を決める時でごわす。」"
      },
      {
        "id": "trial-3-p-20",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「変えるなら、一気に変えんにゃいかん。」"
      },
      {
        "id": "trial-3-p-21",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「二人とも、守るか壊すかにとらわれすぎぜよ。」"
      },
      {
        "id": "trial-3-p-22",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「朝廷も、幕府も、薩摩も、長州も、皆が敵になる必要はないがじゃ。」"
      },
      {
        "id": "trial-3-p-23",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「皆が力を合わせられる、新しい仕組みをつくるべきぜよ。」"
      },
      {
        "id": "trial-3-p-24",
        "kind": "narration",
        "text": "村瀬は三人を見つめる。"
      },
      {
        "id": "trial-3-p-25",
        "kind": "narration",
        "text": "勝は、積み上げてきたものを活かそうとしている。"
      },
      {
        "id": "trial-3-p-26",
        "kind": "narration",
        "text": "西郷は、今を逃せば国は変わらないと考えている。"
      },
      {
        "id": "trial-3-p-27",
        "kind": "narration",
        "text": "龍馬は、争いを越えて協力できる国を目指している。"
      },
      {
        "id": "trial-3-p-28",
        "kind": "narration",
        "text": "考え方は違っても、皆が日本の未来を真剣に考えていた。"
      },
      {
        "id": "trial-3-p-29",
        "kind": "narration",
        "text": "勝が村瀬を見据える。"
      },
      {
        "id": "trial-3-p-30",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「長州の若ぇ衆。」"
      },
      {
        "id": "trial-3-p-31",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「人の話を聞いて、おめぇは何を思った。」"
      },
      {
        "id": "trial-3-p-32",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「聞かせてみな。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "今ある仕組みを活かしながら、改革を進めるべきです。\n（勝 海舟の考え）",
        "value": "勝 海舟の考え"
      },
      {
        "label": "②",
        "text": "今こそ覚悟を決め、一気に改革を進めるべきです。\n（西郷 吉之助の考え）",
        "value": "西郷 吉之助の考え"
      },
      {
        "label": "③",
        "text": "新しい仕組みをつくり、皆が協力できる国を目指すべきです。\n（坂本 龍馬の考え）",
        "value": "坂本 龍馬の考え"
      }
    ]
  },
  {
    "id": 4,
    "title": "第四章 禁門の変",
    "subtitle": "理想と現実",
    "passages": [
      {
        "id": "trial-4-p-1",
        "kind": "narration",
        "text": "文久三年（1863年）。"
      },
      {
        "id": "trial-4-p-2",
        "kind": "narration",
        "text": "八月十八日の政変により、長州藩は京都から追われた。"
      },
      {
        "id": "trial-4-p-3",
        "kind": "narration",
        "text": "長州は朝廷へ真意を伝えるため、軍勢を率いて再び京都へ向かう。"
      },
      {
        "id": "trial-4-p-4",
        "kind": "scene",
        "text": "【京都郊外】"
      },
      {
        "id": "trial-4-p-5",
        "kind": "narration",
        "text": "村瀬は久坂 玄瑞の本陣にいた。"
      },
      {
        "id": "trial-4-p-6",
        "kind": "narration",
        "text": "目の前には京都。"
      },
      {
        "id": "trial-4-p-7",
        "kind": "narration",
        "text": "目的は朝廷への嘆願。"
      },
      {
        "id": "trial-4-p-8",
        "kind": "narration",
        "text": "しかし、本陣には緊張が漂っていた。"
      },
      {
        "id": "trial-4-p-9",
        "kind": "narration",
        "text": "その時、来島 又兵衛が姿を現す。"
      },
      {
        "id": "trial-4-p-10",
        "kind": "dialogue",
        "speaker": "来島 又兵衛",
        "text": "「久坂。」"
      },
      {
        "id": "trial-4-p-11",
        "kind": "dialogue",
        "speaker": "来島 又兵衛",
        "text": "「いつまで待つ。」"
      },
      {
        "id": "trial-4-p-12",
        "kind": "dialogue",
        "speaker": "来島 又兵衛",
        "text": "「会津も薩摩も、戦うつもりじゃ。」"
      },
      {
        "id": "trial-4-p-13",
        "kind": "dialogue",
        "speaker": "来島 又兵衛",
        "text": "「今こそ武力で長州の覚悟を示さねば、誰も我らの話など聞かん。」"
      },
      {
        "id": "trial-4-p-14",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「我らは戦をしに来たのではありません。」"
      },
      {
        "id": "trial-4-p-15",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「目的は朝廷へ長州の真意を伝えることです。」"
      },
      {
        "id": "trial-4-p-16",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「戦えば、本来の目的を失ってしまいます。」"
      },
      {
        "id": "trial-4-p-17",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「二人とも言うことは分かる。」"
      },
      {
        "id": "trial-4-p-18",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「じゃが、軍勢を率いて京都へ来た時点で、相手は戦と受け取る。」"
      },
      {
        "id": "trial-4-p-19",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「今日ここで戦になれば、長州は朝廷との道を失うかもしれん。」"
      },
      {
        "id": "trial-4-p-20",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「退くことも、未来を守る決断じゃ。」"
      },
      {
        "id": "trial-4-p-21",
        "kind": "narration",
        "text": "村瀬は三人を見つめる。"
      },
      {
        "id": "trial-4-p-22",
        "kind": "narration",
        "text": "来島は、今動かなければ長州は終わると考えている。"
      },
      {
        "id": "trial-4-p-23",
        "kind": "narration",
        "text": "久坂は、目的を見失ってはならないと言う。"
      },
      {
        "id": "trial-4-p-24",
        "kind": "narration",
        "text": "桂は、長州が再び立ち上がる未来を守ろうとしている。"
      },
      {
        "id": "trial-4-p-25",
        "kind": "narration",
        "text": "皆、長州を救いたいという思いは同じだった。"
      },
      {
        "id": "trial-4-p-26",
        "kind": "narration",
        "text": "久坂が村瀬を見る。"
      },
      {
        "id": "trial-4-p-27",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「お前はどう思う。」"
      },
      {
        "id": "trial-4-p-28",
        "kind": "dialogue",
        "speaker": "久坂 玄瑞",
        "text": "「お前なら考えを持っているはずだ。」"
      },
      {
        "id": "trial-4-p-29",
        "kind": "narration",
        "text": "本陣が静まり返る。"
      },
      {
        "id": "trial-4-p-30",
        "kind": "narration",
        "text": "（私などが……。）"
      },
      {
        "id": "trial-4-p-31",
        "kind": "narration",
        "text": "しかし、先生の言葉がよみがえる。"
      },
      {
        "id": "trial-4-p-32",
        "kind": "dialogue",
        "speaker": "吉田 松陰",
        "text": "「自分で考えよ。」"
      },
      {
        "id": "trial-4-p-33",
        "kind": "narration",
        "text": "村瀬は一歩前へ出た。"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "今こそ行動を起こし、長州の覚悟を示すべきです。\n（来島 又兵衛の考え）",
        "value": "来島 又兵衛の考え"
      },
      {
        "label": "②",
        "text": "目的は朝廷への嘆願です。戦えば本来の目的を失います。\n（久坂 玄瑞の考え）",
        "value": "久坂 玄瑞の考え"
      },
      {
        "label": "③",
        "text": "今日は退き、長州が再び立ち上がる機会を残すべきです。\n（桂 小五郎の考え）",
        "value": "桂 小五郎の考え"
      }
    ]
  },
  {
    "id": 5,
    "title": "第五章 第一次長州征討",
    "subtitle": "藩を残す決断",
    "passages": [
      {
        "id": "trial-5-p-1",
        "kind": "narration",
        "text": "元治元年（1864年）。"
      },
      {
        "id": "trial-5-p-2",
        "kind": "narration",
        "text": "禁門の変で敗れ、朝敵となった長州藩へ、幕府は諸藩に出兵を命じた。"
      },
      {
        "id": "trial-5-p-3",
        "kind": "narration",
        "text": "幕府軍は十五万。"
      },
      {
        "id": "trial-5-p-4",
        "kind": "narration",
        "text": "対する長州は、戦える状態ではなかった。"
      },
      {
        "id": "trial-5-p-5",
        "kind": "scene",
        "text": "【萩城　評議の間】"
      },
      {
        "id": "trial-5-p-6",
        "kind": "narration",
        "text": "机の中央には、幕府からの書状が置かれている。"
      },
      {
        "id": "trial-5-p-7",
        "kind": "narration",
        "text": "長州藩重臣の椋梨 藤太が静かに口を開く。"
      },
      {
        "id": "trial-5-p-8",
        "kind": "dialogue",
        "speaker": "椋梨 藤太",
        "text": "「幕府軍は十五万。」"
      },
      {
        "id": "trial-5-p-9",
        "kind": "dialogue",
        "speaker": "椋梨 藤太",
        "text": "「今の長州に勝ち目はない。」"
      },
      {
        "id": "trial-5-p-10",
        "kind": "dialogue",
        "speaker": "椋梨 藤太",
        "text": "「ここで戦えば、藩そのものが滅ぶ。」"
      },
      {
        "id": "trial-5-p-11",
        "kind": "dialogue",
        "speaker": "椋梨 藤太",
        "text": "「藩を残し、家臣と領民を守るためには、幕府の要求を受け入れるしかない。」"
      },
      {
        "id": "trial-5-p-12",
        "kind": "narration",
        "text": "その時、高杉 晋作が部屋へ入ってくる。"
      },
      {
        "id": "trial-5-p-13",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「幕府軍は十五万。」"
      },
      {
        "id": "trial-5-p-14",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「じゃが、寄せ集めの諸藩じゃ。」"
      },
      {
        "id": "trial-5-p-15",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「ここは長州。」"
      },
      {
        "id": "trial-5-p-16",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「地の利も、奇兵隊もある。」"
      },
      {
        "id": "trial-5-p-17",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「戦えば、まだ勝機はある。」"
      },
      {
        "id": "trial-5-p-18",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「頭を下げて志まで失うくらいなら、戦うべきじゃ。」"
      },
      {
        "id": "trial-5-p-19",
        "kind": "narration",
        "text": "そこへ、病床の周布 政之助から書状が届く。"
      },
      {
        "id": "trial-5-p-20",
        "kind": "dialogue",
        "speaker": "周布 政之助　書状より",
        "text": "「今は感情で動く時ではない。」"
      },
      {
        "id": "trial-5-p-21",
        "kind": "dialogue",
        "speaker": "周布 政之助　書状より",
        "text": "「しかし、未来まで差し出してはならない。」"
      },
      {
        "id": "trial-5-p-22",
        "kind": "dialogue",
        "speaker": "周布 政之助　書状より",
        "text": "「交渉によって時間を稼ぎ、少しでも長州に有利な条件を引き出せ。」"
      },
      {
        "id": "trial-5-p-23",
        "kind": "dialogue",
        "speaker": "周布 政之助　書状より",
        "text": "「再び立ち上がる日のために、知恵を尽くせ。」"
      },
      {
        "id": "trial-5-p-24",
        "kind": "narration",
        "text": "長州藩主・毛利 敬親が、三人の意見を静かに聞く。"
      },
      {
        "id": "trial-5-p-25",
        "kind": "dialogue",
        "speaker": "毛利 敬親",
        "text": "「椋梨は、藩を残そうとしちょる。」"
      },
      {
        "id": "trial-5-p-26",
        "kind": "dialogue",
        "speaker": "毛利 敬親",
        "text": "「高杉は、志を守ろうとしちょる。」"
      },
      {
        "id": "trial-5-p-27",
        "kind": "dialogue",
        "speaker": "毛利 敬親",
        "text": "「周布は、未来へつなごうとしちょる。」"
      },
      {
        "id": "trial-5-p-28",
        "kind": "dialogue",
        "speaker": "毛利 敬親",
        "text": "「皆、長州を思う気持ちは同じじゃ。」"
      },
      {
        "id": "trial-5-p-29",
        "kind": "narration",
        "text": "敬親は村瀬を見る。"
      },
      {
        "id": "trial-5-p-30",
        "kind": "dialogue",
        "speaker": "毛利 敬親",
        "text": "「松下村塾（しょうかそんじゅく）の者。」"
      },
      {
        "id": "trial-5-p-31",
        "kind": "dialogue",
        "speaker": "毛利 敬親",
        "text": "「お前のことは聞いておる。」"
      },
      {
        "id": "trial-5-p-32",
        "kind": "dialogue",
        "speaker": "毛利 敬親",
        "text": "「お前はどう思う。」"
      },
      {
        "id": "trial-5-p-33",
        "kind": "narration",
        "text": "（……私に何ができる。）"
      },
      {
        "id": "trial-5-p-34",
        "kind": "narration",
        "text": "村瀬は一度目を閉じた。"
      },
      {
        "id": "trial-5-p-35",
        "kind": "dialogue",
        "speaker": "村瀬",
        "text": "「恐れながら、申し上げます。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "藩を守るため、幕府の要求を受け入れるべきです。\n（椋梨 藤太の考え）",
        "value": "椋梨 藤太の考え"
      },
      {
        "label": "②",
        "text": "交渉し、少しでも長州に有利な条件を引き出すべきです。\n（周布 政之助の考え）",
        "value": "周布 政之助の考え"
      },
      {
        "label": "③",
        "text": "勝機があるなら、長州の志を守るために戦うべきです。\n（高杉 晋作の考え）",
        "value": "高杉 晋作の考え"
      }
    ]
  },
  {
    "id": 6,
    "title": "第六章 奇兵隊、決断の夜",
    "subtitle": "動く者の責任",
    "passages": [
      {
        "id": "trial-6-p-1",
        "kind": "narration",
        "text": "元治二年（1865年）。"
      },
      {
        "id": "trial-6-p-2",
        "kind": "narration",
        "text": "第一次長州征討が終わり、藩内では恭順派が実権を握っていた。"
      },
      {
        "id": "trial-6-p-3",
        "kind": "narration",
        "text": "正義派は追われ、長州は再び分裂の危機を迎えていた。"
      },
      {
        "id": "trial-6-p-4",
        "kind": "scene",
        "text": "【夜　奇兵隊屯所】"
      },
      {
        "id": "trial-6-p-5",
        "kind": "narration",
        "text": "奇兵隊の隊士たちが集まり、重苦しい空気が流れている。"
      },
      {
        "id": "trial-6-p-6",
        "kind": "narration",
        "text": "高杉 晋作が静かに立ち上がる。"
      },
      {
        "id": "trial-6-p-7",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「このまま恭順派に従えば、長州は終わる。」"
      },
      {
        "id": "trial-6-p-8",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「奇兵隊には力がある。」"
      },
      {
        "id": "trial-6-p-9",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「今なら、まだひっくり返せる。」"
      },
      {
        "id": "trial-6-p-10",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「ここで立たにゃ、長州は救えん。」"
      },
      {
        "id": "trial-6-p-11",
        "kind": "narration",
        "text": "赤根 武人が静かに口を開く。"
      },
      {
        "id": "trial-6-p-12",
        "kind": "dialogue",
        "speaker": "赤根 武人",
        "text": "「高杉さんの志は立派じゃ。」"
      },
      {
        "id": "trial-6-p-13",
        "kind": "dialogue",
        "speaker": "赤根 武人",
        "text": "「じゃが、戦えば相手は幕府ではない。」"
      },
      {
        "id": "trial-6-p-14",
        "kind": "dialogue",
        "speaker": "赤根 武人",
        "text": "「同じ長州の仲間じゃ。」"
      },
      {
        "id": "trial-6-p-15",
        "kind": "dialogue",
        "speaker": "赤根 武人",
        "text": "「長州人同士が血を流してまで得る勝利は、本当の勝利とは言えん。」"
      },
      {
        "id": "trial-6-p-16",
        "kind": "narration",
        "text": "部屋の隅で、山縣 狂介がつぶやく。"
      },
      {
        "id": "trial-6-p-17",
        "kind": "dialogue",
        "speaker": "山縣 狂介",
        "text": "「俺には、どちらも長州を思う気持ちは同じに見える。」"
      },
      {
        "id": "trial-6-p-18",
        "kind": "dialogue",
        "speaker": "山縣 狂介",
        "text": "「だからこそ、まだ決断する時ではない。」"
      },
      {
        "id": "trial-6-p-19",
        "kind": "dialogue",
        "speaker": "山縣 狂介",
        "text": "「情勢を見極めれば、流れは変わるかもしれん。」"
      },
      {
        "id": "trial-6-p-20",
        "kind": "dialogue",
        "speaker": "山縣 狂介",
        "text": "「今動けば、仲間へ銃を向けることになる。」"
      },
      {
        "id": "trial-6-p-21",
        "kind": "narration",
        "text": "村瀬は三人を見つめる。"
      },
      {
        "id": "trial-6-p-22",
        "kind": "narration",
        "text": "高杉は、今こそ立ち上がるべきだと言う。"
      },
      {
        "id": "trial-6-p-23",
        "kind": "narration",
        "text": "赤根は、長州人同士の争いを避けるべきだと言う。"
      },
      {
        "id": "trial-6-p-24",
        "kind": "narration",
        "text": "山縣は、今は情勢を見極めるべきだと考えている。"
      },
      {
        "id": "trial-6-p-25",
        "kind": "narration",
        "text": "誰もが、長州を守りたいという思いは同じだった。"
      },
      {
        "id": "trial-6-p-26",
        "kind": "narration",
        "text": "高杉が村瀬を見る。"
      },
      {
        "id": "trial-6-p-27",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「村瀬！」"
      },
      {
        "id": "trial-6-p-28",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「何か言いたそうな顔しちょるな。」"
      },
      {
        "id": "trial-6-p-29",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「お前は、どう思う。」"
      },
      {
        "id": "trial-6-p-30",
        "kind": "narration",
        "text": "部屋中の視線が村瀬へ集まる。"
      },
      {
        "id": "trial-6-p-31",
        "kind": "narration",
        "text": "村瀬も部屋を見渡した。"
      },
      {
        "id": "trial-6-p-32",
        "kind": "narration",
        "text": "（私は……。）"
      },
      {
        "id": "trial-6-p-33",
        "kind": "narration",
        "text": "村瀬はゆっくり立ち上がった。"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "今こそ立つべきだ。長州を救うには、今しかない。\n（高杉 晋作の考え）",
        "value": "高杉 晋作の考え"
      },
      {
        "label": "②",
        "text": "藩内で争うべきではない。同じ長州人同士が血を流してはならない。\n（赤根 武人の考え）",
        "value": "赤根 武人の考え"
      },
      {
        "label": "③",
        "text": "まだ決断する時ではない。情勢を見極めるべきだ。\n（山縣 狂介の考え）",
        "value": "山縣 狂介の考え"
      }
    ]
  },
  {
    "id": 7,
    "title": "第七章 薩長密約",
    "subtitle": "政敵と手を取り合う",
    "passages": [
      {
        "id": "trial-7-p-1",
        "kind": "narration",
        "text": "慶応元年（1865年）。"
      },
      {
        "id": "trial-7-p-2",
        "kind": "narration",
        "text": "功山寺挙兵によって長州藩は再び一つとなった。"
      },
      {
        "id": "trial-7-p-3",
        "kind": "narration",
        "text": "しかし幕府は第二次長州征討の準備を進めていた。"
      },
      {
        "id": "trial-7-p-4",
        "kind": "narration",
        "text": "長州に足りないもの。"
      },
      {
        "id": "trial-7-p-5",
        "kind": "narration",
        "text": "それは、戦い抜くための力だった。"
      },
      {
        "id": "trial-7-p-6",
        "kind": "scene",
        "text": "【下関・白石正一郎邸】"
      },
      {
        "id": "trial-7-p-7",
        "kind": "narration",
        "text": "桂 小五郎は、薩摩との会談に望みを託していた。"
      },
      {
        "id": "trial-7-p-8",
        "kind": "narration",
        "text": "しかし、待ち続けても西郷 吉之助は現れない。"
      },
      {
        "id": "trial-7-p-9",
        "kind": "narration",
        "text": "重苦しい空気の中、桂は立ち上がる。"
      },
      {
        "id": "trial-7-p-10",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「……帰ろう。」"
      },
      {
        "id": "trial-7-p-11",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「今日はここまでです。」"
      },
      {
        "id": "trial-7-p-12",
        "kind": "narration",
        "text": "その時、坂本 龍馬と中岡 慎太郎が駆け込んでくる。"
      },
      {
        "id": "trial-7-p-13",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「待っちょくれ！」"
      },
      {
        "id": "trial-7-p-14",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「まだ終わっちゃおらん！」"
      },
      {
        "id": "trial-7-p-15",
        "kind": "narration",
        "text": "村田 蔵六が静かに口を開く。"
      },
      {
        "id": "trial-7-p-16",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「桂さん。」"
      },
      {
        "id": "trial-7-p-17",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「本当に長州だけで勝てるとお考えですか。」"
      },
      {
        "id": "trial-7-p-18",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「戦は感情では勝てません。」"
      },
      {
        "id": "trial-7-p-19",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「日本を守るためなら、昨日まで敵だった相手とも手を結ぶべきです。」"
      },
      {
        "id": "trial-7-p-20",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「あなたのおっしゃることは正しい。」"
      },
      {
        "id": "trial-7-p-21",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「ですが、国は理屈だけでは動かん。」"
      },
      {
        "id": "trial-7-p-22",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「藩をまとめ、人心を守ることも私の務めです。」"
      },
      {
        "id": "trial-7-p-23",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「まずは長州が一つであることが大切です。」"
      },
      {
        "id": "trial-7-p-24",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「二人とも、見ちゅう先が違うだけじゃ。」"
      },
      {
        "id": "trial-7-p-25",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「いきなり同盟を結ぼうとするき揉めるがじゃ。」"
      },
      {
        "id": "trial-7-p-26",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「まずは商いでもえい。」"
      },
      {
        "id": "trial-7-p-27",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「小さな約束を守れば、人は信用する。」"
      },
      {
        "id": "trial-7-p-28",
        "kind": "dialogue",
        "speaker": "坂本 龍馬",
        "text": "「その積み重ねが、やがて本当の同盟になるがじゃ。」"
      },
      {
        "id": "trial-7-p-29",
        "kind": "narration",
        "text": "村瀬は三人を見つめる。"
      },
      {
        "id": "trial-7-p-30",
        "kind": "narration",
        "text": "桂は、組織の結束を守ろうとしている。"
      },
      {
        "id": "trial-7-p-31",
        "kind": "narration",
        "text": "龍馬は、人と人との信頼を育てようとしている。"
      },
      {
        "id": "trial-7-p-32",
        "kind": "narration",
        "text": "村田は、日本を救うため最善の方法を考えている。"
      },
      {
        "id": "trial-7-p-33",
        "kind": "narration",
        "text": "三人とも、日本を救おうとしていた。"
      },
      {
        "id": "trial-7-p-34",
        "kind": "narration",
        "text": "だから。"
      },
      {
        "id": "trial-7-p-35",
        "kind": "narration",
        "text": "誰も間違っていない。"
      },
      {
        "id": "trial-7-p-36",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「村瀬君。」"
      },
      {
        "id": "trial-7-p-37",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「……君なら。」"
      },
      {
        "id": "trial-7-p-38",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「君の考えも聞かせてほしい。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "敵であっても、日本のためなら手を結ぶべきだ。\n（村田 蔵六の考え）",
        "value": "村田 蔵六の考え"
      },
      {
        "label": "②",
        "text": "まずは小さな信頼を積み重ねるべきだ。\n（坂本 龍馬の考え）",
        "value": "坂本 龍馬の考え"
      },
      {
        "label": "③",
        "text": "自国の結束を固めてから協力を考えるべきだ。\n（桂 小五郎の考え）",
        "value": "桂 小五郎の考え"
      }
    ]
  },
  {
    "id": 8,
    "title": "第八章 第二次長州征討",
    "subtitle": "誰の下で戦うか",
    "passages": [
      {
        "id": "trial-8-p-1",
        "kind": "narration",
        "text": "慶応二年（1866年）。"
      },
      {
        "id": "trial-8-p-2",
        "kind": "narration",
        "text": "禁門の変、第一次長州征討、功山寺挙兵。"
      },
      {
        "id": "trial-8-p-3",
        "kind": "narration",
        "text": "多くの犠牲と屈辱を越え、長州は再び立ち上がった。"
      },
      {
        "id": "trial-8-p-4",
        "kind": "narration",
        "text": "そして今、幕府との最後の決戦が始まろうとしていた。"
      },
      {
        "id": "trial-8-p-5",
        "kind": "scene",
        "text": "【出陣前夜　軍議】"
      },
      {
        "id": "trial-8-p-6",
        "kind": "narration",
        "text": "村瀬は軍議へ呼ばれた。"
      },
      {
        "id": "trial-8-p-7",
        "kind": "narration",
        "text": "部屋には、桂 小五郎、高杉 晋作、村田 蔵六の三人がいる。"
      },
      {
        "id": "trial-8-p-8",
        "kind": "narration",
        "text": "桂が地図を広げる。"
      },
      {
        "id": "trial-8-p-9",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「敵は、こちらの何倍もの兵力です。」"
      },
      {
        "id": "trial-8-p-10",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「じゃが、数で勝てぬ戦ほど、戦う場所と退く判断が大事になります。」"
      },
      {
        "id": "trial-8-p-11",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「指揮官は、勝つ責任だけではない。」"
      },
      {
        "id": "trial-8-p-12",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「皆を生きて帰す責任も負うてます。」"
      },
      {
        "id": "trial-8-p-13",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「敵は強い。」"
      },
      {
        "id": "trial-8-p-14",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「数も向こうが上じゃ。」"
      },
      {
        "id": "trial-8-p-15",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「じゃが、最後に戦うんは人じゃ。」"
      },
      {
        "id": "trial-8-p-16",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「兵は、指揮官の背中を見て動く。」"
      },
      {
        "id": "trial-8-p-17",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「わしが先頭へ出れば、皆も前へ出る。」"
      },
      {
        "id": "trial-8-p-18",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「士気は、数の差をひっくり返す。」"
      },
      {
        "id": "trial-8-p-19",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「士気は大切です。」"
      },
      {
        "id": "trial-8-p-20",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「しかし、士気だけでは勝てません。」"
      },
      {
        "id": "trial-8-p-21",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「兵糧、補給、情報、配置。」"
      },
      {
        "id": "trial-8-p-22",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「勝つための仕組みが整って初めて、兵は安心して戦えます。」"
      },
      {
        "id": "trial-8-p-23",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「理屈で勝てる戦なら、理屈で勝つべきです。」"
      },
      {
        "id": "trial-8-p-24",
        "kind": "narration",
        "text": "桂は二人の意見を聞き、静かにうなずく。"
      },
      {
        "id": "trial-8-p-25",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「二人とも、間違うちょらん。」"
      },
      {
        "id": "trial-8-p-26",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「戦には、勇気も、準備もいる。」"
      },
      {
        "id": "trial-8-p-27",
        "kind": "narration",
        "text": "軍議が終わり、村瀬も部屋を出ようとする。"
      },
      {
        "id": "trial-8-p-28",
        "kind": "narration",
        "text": "桂が呼び止める。"
      },
      {
        "id": "trial-8-p-29",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「村瀬君。」"
      },
      {
        "id": "trial-8-p-30",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「待ちなさい。」"
      },
      {
        "id": "trial-8-p-31",
        "kind": "narration",
        "text": "村瀬は振り返る。"
      },
      {
        "id": "trial-8-p-32",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「誰の下で戦いたいか。」"
      },
      {
        "id": "trial-8-p-33",
        "kind": "narration",
        "text": "村田。"
      },
      {
        "id": "trial-8-p-34",
        "kind": "dialogue",
        "speaker": "村田 蔵六",
        "text": "「命を預ける相手は、自分で選ぶべきです。」"
      },
      {
        "id": "trial-8-p-35",
        "kind": "narration",
        "text": "桂。"
      },
      {
        "id": "trial-8-p-36",
        "kind": "dialogue",
        "speaker": "桂 小五郎",
        "text": "「その決断が、お前自身の戦い方になる。」"
      },
      {
        "id": "trial-8-p-37",
        "kind": "narration",
        "text": "高杉は村瀬の肩を軽く叩く。"
      },
      {
        "id": "trial-8-p-38",
        "kind": "dialogue",
        "speaker": "高杉 晋作",
        "text": "「どこへ来ても、長州のために戦うんは同じじゃ。」"
      },
      {
        "id": "trial-8-p-39",
        "kind": "narration",
        "text": "村瀬は三人へ深く頭を下げた。"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "桂 小五郎隊\n慎重な判断で仲間を守り、勝てる戦を積み重ねる。\n（桂 小五郎の考え）",
        "value": "桂 小五郎の考え"
      },
      {
        "label": "②",
        "text": "高杉 晋作隊\n自ら先頭に立ち、勇気で仲間の士気を高め、不利な戦況を覆す。\n（高杉 晋作の考え）",
        "value": "高杉 晋作の考え"
      },
      {
        "label": "③",
        "text": "村田 蔵六隊\n合理的な準備と仕組みを整え、確実な勝利を目指す。\n（村田 蔵六の考え）",
        "value": "村田 蔵六の考え"
      }
    ]
  },
  {
    "id": 9,
    "title": "第九章 小御所会議",
    "subtitle": "決断とは何か",
    "passages": [
      {
        "id": "trial-9-p-1",
        "kind": "narration",
        "text": "慶応三年十二月九日（1867年）。"
      },
      {
        "id": "trial-9-p-2",
        "kind": "narration",
        "text": "王政復古の大号令が発せられた。"
      },
      {
        "id": "trial-9-p-3",
        "kind": "narration",
        "text": "しかし、新しい国の形はまだ決まっていなかった。"
      },
      {
        "id": "trial-9-p-4",
        "kind": "narration",
        "text": "徳川慶喜を新政府へ迎えるのか。"
      },
      {
        "id": "trial-9-p-5",
        "kind": "narration",
        "text": "それとも、新たな政を始めるのか。"
      },
      {
        "id": "trial-9-p-6",
        "kind": "narration",
        "text": "その答えを求め、小御所に諸侯と公家が集まっていた。"
      },
      {
        "id": "trial-9-p-7",
        "kind": "scene",
        "text": "【小御所会議】"
      },
      {
        "id": "trial-9-p-8",
        "kind": "narration",
        "text": "岩倉 具視が静かに口を開く。"
      },
      {
        "id": "trial-9-p-9",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「それでは、新しい国づくりについて、ご意見をお願いいたします。」"
      },
      {
        "id": "trial-9-p-10",
        "kind": "narration",
        "text": "山内 容堂が立ち上がる。"
      },
      {
        "id": "trial-9-p-11",
        "kind": "dialogue",
        "speaker": "山内 容堂",
        "text": "「徳川家は二百六十年、この国を治めてきた。」"
      },
      {
        "id": "trial-9-p-12",
        "kind": "dialogue",
        "speaker": "山内 容堂",
        "text": "「その功績を認めず、新しい国を決めるのは道理に合わん。」"
      },
      {
        "id": "trial-9-p-13",
        "kind": "dialogue",
        "speaker": "山内 容堂",
        "text": "「まずは慶喜公をここへ呼び、本人の前で議論すべきじゃ。」"
      },
      {
        "id": "trial-9-p-14",
        "kind": "narration",
        "text": "松平 春嶽が続く。"
      },
      {
        "id": "trial-9-p-15",
        "kind": "dialogue",
        "speaker": "松平 春嶽",
        "text": "「私は、徳川中心である必要はないと思います。」"
      },
      {
        "id": "trial-9-p-16",
        "kind": "dialogue",
        "speaker": "松平 春嶽",
        "text": "「しかし、日本の未来を決める以上、一方の話だけで結論を出してはなりません。」"
      },
      {
        "id": "trial-9-p-17",
        "kind": "dialogue",
        "speaker": "松平 春嶽",
        "text": "「徳川の考えも聞いた上で、日本にとって最善の道を選ぶべきです。」"
      },
      {
        "id": "trial-9-p-18",
        "kind": "narration",
        "text": "議論は続く。"
      },
      {
        "id": "trial-9-p-19",
        "kind": "narration",
        "text": "誰もが国の未来を思っていた。"
      },
      {
        "id": "trial-9-p-20",
        "kind": "narration",
        "text": "だからこそ、結論は出なかった。"
      },
      {
        "id": "trial-9-p-21",
        "kind": "narration",
        "text": "岩倉は静かに立ち上がる。"
      },
      {
        "id": "trial-9-p-22",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「ひとまず休憩といたしましょう。」"
      },
      {
        "id": "trial-9-p-23",
        "kind": "scene",
        "text": "【廊下】"
      },
      {
        "id": "trial-9-p-24",
        "kind": "narration",
        "text": "岩倉が庭を眺めている。"
      },
      {
        "id": "trial-9-p-25",
        "kind": "narration",
        "text": "そこへ西郷 吉之助が歩いてくる。"
      },
      {
        "id": "trial-9-p-26",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「岩倉さま、まだ決まりもはんか。」"
      },
      {
        "id": "trial-9-p-27",
        "kind": "narration",
        "text": "岩倉は苦笑する。"
      },
      {
        "id": "trial-9-p-28",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「皆、正しいことを申す。」"
      },
      {
        "id": "trial-9-p-29",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「だから決められん。」"
      },
      {
        "id": "trial-9-p-30",
        "kind": "narration",
        "text": "西郷は腰の短刀へそっと手を添える。"
      },
      {
        "id": "trial-9-p-31",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「あいくち（短刀）が一本あればよか。」"
      },
      {
        "id": "trial-9-p-32",
        "kind": "narration",
        "text": "村瀬は驚く。"
      },
      {
        "id": "trial-9-p-33",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「人を斬るためではなか。」"
      },
      {
        "id": "trial-9-p-34",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「責任を負う覚悟です。」"
      },
      {
        "id": "trial-9-p-35",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「議論は尽くした。」"
      },
      {
        "id": "trial-9-p-36",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「最後は誰かが決めんと、国は前へ進まん。」"
      },
      {
        "id": "trial-9-p-37",
        "kind": "narration",
        "text": "岩倉は静かにうなずく。"
      },
      {
        "id": "trial-9-p-38",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「……そうですな。」"
      },
      {
        "id": "trial-9-p-39",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「会議を再開いたしましょう。」"
      },
      {
        "id": "trial-9-p-40",
        "kind": "narration",
        "text": "村瀬は岩倉の後ろを歩く。"
      },
      {
        "id": "trial-9-p-41",
        "kind": "narration",
        "text": "胸には、一つの問いが残っていた。"
      },
      {
        "id": "trial-9-p-42",
        "kind": "narration",
        "text": "――自分なら、何を最も大切にするか。"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "長年築き上げた信頼や恩義を大切にする。\n（山内 容堂の考え）",
        "value": "山内 容堂の考え"
      },
      {
        "label": "②",
        "text": "公平な手続きと納得できる意思決定を大切にする。\n（松平 春嶽の考え）",
        "value": "松平 春嶽の考え"
      },
      {
        "label": "③",
        "text": "最後は責任を背負い、自ら決断する。\n（西郷 吉之助の考え）",
        "value": "西郷 吉之助の考え"
      }
    ]
  },
  {
    "id": 10,
    "title": "第十章 鳥羽・伏見前夜",
    "subtitle": "将軍、最後の決断",
    "passages": [
      {
        "id": "trial-10-p-1",
        "kind": "narration",
        "text": "慶応四年（1868年）。"
      },
      {
        "id": "trial-10-p-2",
        "kind": "narration",
        "text": "京都、鳥羽・伏見。"
      },
      {
        "id": "trial-10-p-3",
        "kind": "narration",
        "text": "新政府軍と旧幕府軍は、ついに武器を手に向かい合った。"
      },
      {
        "id": "trial-10-p-4",
        "kind": "narration",
        "text": "大坂城では、徳川十五代将軍・徳川 慶喜が大きな決断を迫られていた。"
      },
      {
        "id": "trial-10-p-5",
        "kind": "scene",
        "text": "【大坂城】"
      },
      {
        "id": "trial-10-p-6",
        "kind": "narration",
        "text": "重臣たちが並ぶ中、勝 海舟が口を開く。"
      },
      {
        "id": "trial-10-p-7",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「上様。」"
      },
      {
        "id": "trial-10-p-8",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「こいつぁ、徳川だけの戦じゃありません。」"
      },
      {
        "id": "trial-10-p-9",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「戦えば勝てるかもしれません。」"
      },
      {
        "id": "trial-10-p-10",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「ですが、戦が長引けば、日本の力は失われていきます。」"
      },
      {
        "id": "trial-10-p-11",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「上様には、この大坂城にお残りいただきたい。」"
      },
      {
        "id": "trial-10-p-12",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「幕府軍をまとめ、薩長と交渉するのです。」"
      },
      {
        "id": "trial-10-p-13",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「最後に守るべきものは、日本でしょう。」"
      },
      {
        "id": "trial-10-p-14",
        "kind": "narration",
        "text": "板倉 勝静が静かに続ける。"
      },
      {
        "id": "trial-10-p-15",
        "kind": "dialogue",
        "speaker": "板倉 勝静",
        "text": "「勝殿のお考えにも道理がございます。」"
      },
      {
        "id": "trial-10-p-16",
        "kind": "dialogue",
        "speaker": "板倉 勝静",
        "text": "「しかし、上様には徳川家を残す責任がございます。」"
      },
      {
        "id": "trial-10-p-17",
        "kind": "dialogue",
        "speaker": "板倉 勝静",
        "text": "「徳川家とともに生きてきた家臣や、その家族もおります。」"
      },
      {
        "id": "trial-10-p-18",
        "kind": "dialogue",
        "speaker": "板倉 勝静",
        "text": "「上様がお生きであれば、徳川家は残ります。」"
      },
      {
        "id": "trial-10-p-19",
        "kind": "dialogue",
        "speaker": "板倉 勝静",
        "text": "「家が残れば、人々を守る道も残ります。」"
      },
      {
        "id": "trial-10-p-20",
        "kind": "dialogue",
        "speaker": "板倉 勝静",
        "text": "「どうか江戸へお戻りください。」"
      },
      {
        "id": "trial-10-p-21",
        "kind": "narration",
        "text": "松平 容保が立ち上がる。"
      },
      {
        "id": "trial-10-p-22",
        "kind": "dialogue",
        "speaker": "松平 容保",
        "text": "「私は、戦うべきであると考えます。」"
      },
      {
        "id": "trial-10-p-23",
        "kind": "dialogue",
        "speaker": "松平 容保",
        "text": "「兵の数も、海軍の力も、我らが劣っているわけではございません。」"
      },
      {
        "id": "trial-10-p-24",
        "kind": "dialogue",
        "speaker": "松平 容保",
        "text": "「会津も、桑名も、幕臣たちも、戦う覚悟を固めております。」"
      },
      {
        "id": "trial-10-p-25",
        "kind": "dialogue",
        "speaker": "松平 容保",
        "text": "「今ここで退けば、軍の統制を失うおそれがあります。」"
      },
      {
        "id": "trial-10-p-26",
        "kind": "dialogue",
        "speaker": "松平 容保",
        "text": "「上様と徳川家を守るためにも。」"
      },
      {
        "id": "trial-10-p-27",
        "kind": "dialogue",
        "speaker": "松平 容保",
        "text": "「勝機がある今こそ、戦うべきです。」"
      },
      {
        "id": "trial-10-p-28",
        "kind": "narration",
        "text": "三人は互いに譲らない。"
      },
      {
        "id": "trial-10-p-29",
        "kind": "narration",
        "text": "勝は、日本全体を守ろうとしている。"
      },
      {
        "id": "trial-10-p-30",
        "kind": "narration",
        "text": "板倉は、徳川家と人々の生活を守ろうとしている。"
      },
      {
        "id": "trial-10-p-31",
        "kind": "narration",
        "text": "容保は、軍の統制と勝機を守ろうとしている。"
      },
      {
        "id": "trial-10-p-32",
        "kind": "narration",
        "text": "誰も、自らの利益のために語っているわけではなかった。"
      },
      {
        "id": "trial-10-p-33",
        "kind": "narration",
        "text": "守ろうとしているものが、それぞれ違うだけだった。"
      },
      {
        "id": "trial-10-p-34",
        "kind": "narration",
        "text": "慶喜は静かに立ち上がる。"
      },
      {
        "id": "trial-10-p-35",
        "kind": "dialogue",
        "speaker": "徳川 慶喜",
        "text": "「皆の考え、よく分かった。」"
      },
      {
        "id": "trial-10-p-36",
        "kind": "dialogue",
        "speaker": "徳川 慶喜",
        "text": "「どの策にも道理がある。」"
      },
      {
        "id": "trial-10-p-37",
        "kind": "dialogue",
        "speaker": "徳川 慶喜",
        "text": "「だからこそ。」"
      },
      {
        "id": "trial-10-p-38",
        "kind": "dialogue",
        "speaker": "徳川 慶喜",
        "text": "「決めねばならぬ。」"
      },
      {
        "id": "trial-10-p-39",
        "kind": "narration",
        "text": "静寂が流れる。"
      },
      {
        "id": "trial-10-p-40",
        "kind": "narration",
        "text": "慶喜は、何を最も守るべきだと考えるか。"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "日本全体を守ることを優先する。\n（勝 海舟の考え）",
        "value": "勝 海舟の考え"
      },
      {
        "label": "②",
        "text": "徳川家と人々の生活を守ることを優先する。\n（板倉 勝静の考え）",
        "value": "板倉 勝静の考え"
      },
      {
        "label": "③",
        "text": "勝機を生かし、組織の統制を守ることを優先する。\n（松平 容保の考え）",
        "value": "松平 容保の考え"
      }
    ]
  },
  {
    "id": 11,
    "title": "第十一章 江戸城無血開城",
    "subtitle": "勝つことと、終わらせること",
    "passages": [
      {
        "id": "trial-11-p-1",
        "kind": "narration",
        "text": "慶応四年三月（1868年）。"
      },
      {
        "id": "trial-11-p-2",
        "kind": "narration",
        "text": "鳥羽・伏見の戦いは新政府軍の勝利に終わった。"
      },
      {
        "id": "trial-11-p-3",
        "kind": "narration",
        "text": "徳川慶喜は江戸へ退き、新政府軍は江戸城へ迫る。"
      },
      {
        "id": "trial-11-p-4",
        "kind": "narration",
        "text": "しかし、その先には百万人を超える人々が暮らす町があった。"
      },
      {
        "id": "trial-11-p-5",
        "kind": "narration",
        "text": "ここで戦になれば、多くの民が巻き込まれる。"
      },
      {
        "id": "trial-11-p-6",
        "kind": "scene",
        "text": "【軍議】"
      },
      {
        "id": "trial-11-p-7",
        "kind": "narration",
        "text": "村瀬は重要な軍議へ呼ばれた。"
      },
      {
        "id": "trial-11-p-8",
        "kind": "narration",
        "text": "そこには、西郷 吉之助、大村 益次郎、そして勝 海舟がいた。"
      },
      {
        "id": "trial-11-p-9",
        "kind": "narration",
        "text": "勝が窓の外を見ながら話し始める。"
      },
      {
        "id": "trial-11-p-10",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「あの町には、侍だけじゃねえ。」"
      },
      {
        "id": "trial-11-p-11",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「商人も、職人も、子どもも暮らしている。」"
      },
      {
        "id": "trial-11-p-12",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「おれが守りてえのは、徳川だけじゃねえ。」"
      },
      {
        "id": "trial-11-p-13",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「日本だ。」"
      },
      {
        "id": "trial-11-p-14",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「戦って勝つことはできるかもしれねえ。」"
      },
      {
        "id": "trial-11-p-15",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「だがな。」"
      },
      {
        "id": "trial-11-p-16",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「始まった戦を終わらせる方が、よっぽど難しいんだよ。」"
      },
      {
        "id": "trial-11-p-17",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「だから、もう少しだけ待っちゃくれねえか。」"
      },
      {
        "id": "trial-11-p-18",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「勝先生のお気持ちは、よう分かりもす。」"
      },
      {
        "id": "trial-11-p-19",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「じゃっどん。」"
      },
      {
        "id": "trial-11-p-20",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「新政府は、まだ生まれたばかいじゃ。」"
      },
      {
        "id": "trial-11-p-21",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「火種ば残せば、また戦が始まりもす。」"
      },
      {
        "id": "trial-11-p-22",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「禍根だけは残したくなか。」"
      },
      {
        "id": "trial-11-p-23",
        "kind": "dialogue",
        "speaker": "西郷 吉之助",
        "text": "「そのためには、断たねばならん火種もありもす。」"
      },
      {
        "id": "trial-11-p-24",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「江戸城で戦う必要はありません。」"
      },
      {
        "id": "trial-11-p-25",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「ですが、武器を持つ集団を放置すれば、人々は安心して暮らせません。」"
      },
      {
        "id": "trial-11-p-26",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「私は戦が好きではありません。」"
      },
      {
        "id": "trial-11-p-27",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「だからこそ。」"
      },
      {
        "id": "trial-11-p-28",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「二度と戦が起きぬよう、必要な秩序は守らねばなりません。」"
      },
      {
        "id": "trial-11-p-29",
        "kind": "narration",
        "text": "部屋は静まり返る。"
      },
      {
        "id": "trial-11-p-30",
        "kind": "narration",
        "text": "勝は、日本全体を守ろうとしている。"
      },
      {
        "id": "trial-11-p-31",
        "kind": "narration",
        "text": "西郷は、新しい日本の未来を守ろうとしている。"
      },
      {
        "id": "trial-11-p-32",
        "kind": "narration",
        "text": "大村は、人々が安心して暮らせる秩序を守ろうとしている。"
      },
      {
        "id": "trial-11-p-33",
        "kind": "narration",
        "text": "誰も、自分の利だけを語ってはいなかった。"
      },
      {
        "id": "trial-11-p-34",
        "kind": "narration",
        "text": "守ろうとしているものが違うだけだった。"
      },
      {
        "id": "trial-11-p-35",
        "kind": "scene",
        "text": "【休憩】"
      },
      {
        "id": "trial-11-p-36",
        "kind": "narration",
        "text": "村瀬は廊下へ出る。"
      },
      {
        "id": "trial-11-p-37",
        "kind": "narration",
        "text": "荷を運ぶ商人。"
      },
      {
        "id": "trial-11-p-38",
        "kind": "narration",
        "text": "笑う子ども。"
      },
      {
        "id": "trial-11-p-39",
        "kind": "narration",
        "text": "夕餉の支度をする母親。"
      },
      {
        "id": "trial-11-p-40",
        "kind": "narration",
        "text": "村瀬は静かにつぶやく。"
      },
      {
        "id": "trial-11-p-41",
        "kind": "dialogue",
        "speaker": "村瀬",
        "text": "「皆、日本を思っている。」"
      },
      {
        "id": "trial-11-p-42",
        "kind": "dialogue",
        "speaker": "村瀬",
        "text": "「だから。」"
      },
      {
        "id": "trial-11-p-43",
        "kind": "dialogue",
        "speaker": "村瀬",
        "text": "「答えは一つじゃない。」"
      },
      {
        "id": "trial-11-p-44",
        "kind": "scene",
        "text": "【決断】"
      },
      {
        "id": "trial-11-p-45",
        "kind": "narration",
        "text": "勝が静かに笑う。"
      },
      {
        "id": "trial-11-p-46",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「村瀬。」"
      },
      {
        "id": "trial-11-p-47",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「若いんだから。」"
      },
      {
        "id": "trial-11-p-48",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「よく見て、よく考えろ。」"
      },
      {
        "id": "trial-11-p-49",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「さて。」"
      },
      {
        "id": "trial-11-p-50",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「お前なら。」"
      },
      {
        "id": "trial-11-p-51",
        "kind": "dialogue",
        "speaker": "勝 海舟",
        "text": "「この戦を、どう終わらせる。」"
      },
      {
        "id": "trial-11-p-52",
        "kind": "narration",
        "text": "村瀬は、何を最も大切にするか。"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "禍根を残さない。未来の日本のため、争いの芽を断つ。\n（西郷 吉之助の考え）",
        "value": "西郷 吉之助の考え"
      },
      {
        "label": "②",
        "text": "国を疲弊させない。人を信じ、できる限り戦わずに収める。\n（勝 海舟の考え）",
        "value": "勝 海舟の考え"
      },
      {
        "label": "③",
        "text": "秩序を守る。戦は避ける。しかし、人々の安心を守るため、必要な秩序は維持する。\n（大村 益次郎の考え）",
        "value": "大村 益次郎の考え"
      }
    ]
  },
  {
    "id": 12,
    "title": "第十二章 大阪砲兵工廠",
    "subtitle": "国家を守る備え",
    "passages": [
      {
        "id": "trial-12-p-1",
        "kind": "narration",
        "text": "明治二年（1869年）。"
      },
      {
        "id": "trial-12-p-2",
        "kind": "narration",
        "text": "戊辰戦争は終結し、新しい政府が誕生した。"
      },
      {
        "id": "trial-12-p-3",
        "kind": "narration",
        "text": "しかし、各藩はなお兵と財を持ち、日本はまだ一つではなかった。"
      },
      {
        "id": "trial-12-p-4",
        "kind": "narration",
        "text": "村瀬は、大村 益次郎に大阪へ呼び出される。"
      },
      {
        "id": "trial-12-p-5",
        "kind": "narration",
        "text": "そこには木戸 孝允、山縣 有朋もいた。"
      },
      {
        "id": "trial-12-p-6",
        "kind": "scene",
        "text": "【大阪】"
      },
      {
        "id": "trial-12-p-7",
        "kind": "narration",
        "text": "大村が一枚の地図を広げる。"
      },
      {
        "id": "trial-12-p-8",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「ここへ政府直轄の武器庫を造ります。」"
      },
      {
        "id": "trial-12-p-9",
        "kind": "narration",
        "text": "村瀬が尋ねる。"
      },
      {
        "id": "trial-12-p-10",
        "kind": "dialogue",
        "speaker": "村瀬",
        "text": "「先生。」"
      },
      {
        "id": "trial-12-p-11",
        "kind": "dialogue",
        "speaker": "村瀬",
        "text": "「なぜ大阪なのですか。」"
      },
      {
        "id": "trial-12-p-12",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「大阪なら、日本の東西どちらへも兵を動かせます。」"
      },
      {
        "id": "trial-12-p-13",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「もちろん……薩摩へも。」"
      },
      {
        "id": "trial-12-p-14",
        "kind": "narration",
        "text": "村瀬は驚く。"
      },
      {
        "id": "trial-12-p-15",
        "kind": "narration",
        "text": "大村は静かに続ける。"
      },
      {
        "id": "trial-12-p-16",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「備えとは、相手を疑うことではありません。」"
      },
      {
        "id": "trial-12-p-17",
        "kind": "dialogue",
        "speaker": "大村 益次郎",
        "text": "「誰が相手でも、国家が揺らがないようにすることです。」"
      },
      {
        "id": "trial-12-p-18",
        "kind": "narration",
        "text": "木戸 孝允が口を開く。"
      },
      {
        "id": "trial-12-p-19",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「先生のお考えは理解できます。」"
      },
      {
        "id": "trial-12-p-20",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「ですが、長州は薩摩と手を取り合ったからこそ今日があります。」"
      },
      {
        "id": "trial-12-p-21",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「私は、その信頼を失いたくありません。」"
      },
      {
        "id": "trial-12-p-22",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「信頼があってこそ、新しい国は一つになれるのです。」"
      },
      {
        "id": "trial-12-p-23",
        "kind": "narration",
        "text": "山縣 有朋が前へ出る。"
      },
      {
        "id": "trial-12-p-24",
        "kind": "dialogue",
        "speaker": "山縣 有朋",
        "text": "「私は、もう一歩先まで進めるべきだと思います。」"
      },
      {
        "id": "trial-12-p-25",
        "kind": "dialogue",
        "speaker": "山縣 有朋",
        "text": "「国家は、公平でなければなりません。」"
      },
      {
        "id": "trial-12-p-26",
        "kind": "dialogue",
        "speaker": "山縣 有朋",
        "text": "「力を持つ藩ほど、大きな責任を負う。」"
      },
      {
        "id": "trial-12-p-27",
        "kind": "dialogue",
        "speaker": "山縣 有朋",
        "text": "「そうして力を国家へ集める仕組みを作ることが、争いを防ぐ一番の備えです。」"
      },
      {
        "id": "trial-12-p-28",
        "kind": "narration",
        "text": "静かな時間が流れる。"
      },
      {
        "id": "trial-12-p-29",
        "kind": "narration",
        "text": "大村は、国家を守る備えを語った。"
      },
      {
        "id": "trial-12-p-30",
        "kind": "narration",
        "text": "木戸は、人と人との信頼を語った。"
      },
      {
        "id": "trial-12-p-31",
        "kind": "narration",
        "text": "山縣は、公平な制度を語った。"
      },
      {
        "id": "trial-12-p-32",
        "kind": "narration",
        "text": "目指す国は同じだった。"
      },
      {
        "id": "trial-12-p-33",
        "kind": "narration",
        "text": "違うのは、その国を守る方法だけだった。"
      },
      {
        "id": "trial-12-p-34",
        "kind": "narration",
        "text": "木戸は村瀬へ向き直る。"
      },
      {
        "id": "trial-12-p-35",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「村瀬君。」"
      },
      {
        "id": "trial-12-p-36",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「新しい国を築くなら。」"
      },
      {
        "id": "trial-12-p-37",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「君は、何を一番大切にする。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "平和は、平時の備えから生まれる。\n（大村 益次郎の考え）",
        "value": "大村 益次郎の考え"
      },
      {
        "label": "②",
        "text": "信頼を失えば、どんな仕組みも長続きしない。\n（木戸 孝允の考え）",
        "value": "木戸 孝允の考え"
      },
      {
        "label": "③",
        "text": "力ある者が国家を支える仕組みを作る。\n（山縣 有朋の考え）",
        "value": "山縣 有朋の考え"
      }
    ]
  },
  {
    "id": 13,
    "title": "第十三章 廃藩置県",
    "subtitle": "藩を越える国",
    "passages": [
      {
        "id": "trial-13-p-1",
        "kind": "narration",
        "text": "明治四年（1871年）。"
      },
      {
        "id": "trial-13-p-2",
        "kind": "narration",
        "text": "戊辰戦争が終わり、新しい政府が誕生した。"
      },
      {
        "id": "trial-13-p-3",
        "kind": "narration",
        "text": "しかし、税も兵も役人も、なお藩が握っていた。"
      },
      {
        "id": "trial-13-p-4",
        "kind": "narration",
        "text": "日本はまだ、本当の意味で一つの国ではなかった。"
      },
      {
        "id": "trial-13-p-5",
        "kind": "scene",
        "text": "【政府の一室】"
      },
      {
        "id": "trial-13-p-6",
        "kind": "narration",
        "text": "机の上には、日本地図が広げられている。"
      },
      {
        "id": "trial-13-p-7",
        "kind": "narration",
        "text": "部屋には、木戸 孝允、大久保 利通、江藤 新平がいた。"
      },
      {
        "id": "trial-13-p-8",
        "kind": "narration",
        "text": "大久保が静かに口を開く。"
      },
      {
        "id": "trial-13-p-9",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「今の政府は、藩に頼らなければ動けません。」"
      },
      {
        "id": "trial-13-p-10",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「税も、兵も、役人も、藩が握っています。」"
      },
      {
        "id": "trial-13-p-11",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「だから藩をなくす。」"
      },
      {
        "id": "trial-13-p-12",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「国が直接、税を集め、兵を持ち、役人を任命する。」"
      },
      {
        "id": "trial-13-p-13",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「変えるなら、一気に進めるべきです。」"
      },
      {
        "id": "trial-13-p-14",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「迷えば、日本は変わりません。」"
      },
      {
        "id": "trial-13-p-15",
        "kind": "narration",
        "text": "木戸が続く。"
      },
      {
        "id": "trial-13-p-16",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「私も、藩をなくすことには賛成です。」"
      },
      {
        "id": "trial-13-p-17",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「ですが、急ぎすぎれば、人は変化についていけません。」"
      },
      {
        "id": "trial-13-p-18",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「改革は、人が理解し、受け入れてこそ長く続きます。」"
      },
      {
        "id": "trial-13-p-19",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「日本を一つにするからこそ、人々の納得を大切にすべきです。」"
      },
      {
        "id": "trial-13-p-20",
        "kind": "narration",
        "text": "江藤 新平が地図を見ながら口を開く。"
      },
      {
        "id": "trial-13-p-21",
        "kind": "dialogue",
        "speaker": "江藤 新平",
        "text": "「お二人のお考えは分かります。」"
      },
      {
        "id": "trial-13-p-22",
        "kind": "dialogue",
        "speaker": "江藤 新平",
        "text": "「ですが、藩をなくした翌日から、国は動かねばなりません。」"
      },
      {
        "id": "trial-13-p-23",
        "kind": "dialogue",
        "speaker": "江藤 新平",
        "text": "「税は誰が集めるのか。」"
      },
      {
        "id": "trial-13-p-24",
        "kind": "dialogue",
        "speaker": "江藤 新平",
        "text": "「裁判、戸籍、土地は誰が管理するのか。」"
      },
      {
        "id": "trial-13-p-25",
        "kind": "dialogue",
        "speaker": "江藤 新平",
        "text": "「改革とは、決断するだけではありません。」"
      },
      {
        "id": "trial-13-p-26",
        "kind": "dialogue",
        "speaker": "江藤 新平",
        "text": "「法律や制度、役所を整えてこそ成功するのです。」"
      },
      {
        "id": "trial-13-p-27",
        "kind": "narration",
        "text": "静かな時間が流れる。"
      },
      {
        "id": "trial-13-p-28",
        "kind": "narration",
        "text": "大久保は、改革を進める決断力を重んじている。"
      },
      {
        "id": "trial-13-p-29",
        "kind": "narration",
        "text": "木戸は、人々の理解と納得を大切にしている。"
      },
      {
        "id": "trial-13-p-30",
        "kind": "narration",
        "text": "江藤は、改革を支える制度を整えようとしている。"
      },
      {
        "id": "trial-13-p-31",
        "kind": "narration",
        "text": "三人とも、日本を一つの国にしようとしていた。"
      },
      {
        "id": "trial-13-p-32",
        "kind": "narration",
        "text": "違うのは、何を最も大切にするかだけだった。"
      },
      {
        "id": "trial-13-p-33",
        "kind": "narration",
        "text": "木戸が村瀬へ向き直る。"
      },
      {
        "id": "trial-13-p-34",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「村瀬君。」"
      },
      {
        "id": "trial-13-p-35",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「君の話には、いつも何か気づかされる。」"
      },
      {
        "id": "trial-13-p-36",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「君なら。」"
      },
      {
        "id": "trial-13-p-37",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「新しい国をつくるために、何を大切に考える。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "改革は、一気に進める。\n（大久保 利通の考え）",
        "value": "大久保 利通の考え"
      },
      {
        "label": "②",
        "text": "改革は、人の理解を得ながら進める。\n（木戸 孝允の考え）",
        "value": "木戸 孝允の考え"
      },
      {
        "label": "③",
        "text": "改革は、制度を整えてこそ成功する。\n（江藤 新平の考え）",
        "value": "江藤 新平の考え"
      }
    ]
  },
  {
    "id": 14,
    "title": "第十四章 征韓論",
    "subtitle": "外へ向かう覚悟",
    "passages": [
      {
        "id": "trial-14-p-1",
        "kind": "narration",
        "text": "明治六年（1873年）。"
      },
      {
        "id": "trial-14-p-2",
        "kind": "narration",
        "text": "廃藩置県から二年。"
      },
      {
        "id": "trial-14-p-3",
        "kind": "narration",
        "text": "日本は一つの国家として歩み始めていた。"
      },
      {
        "id": "trial-14-p-4",
        "kind": "narration",
        "text": "しかし、朝鮮との関係をめぐり、新政府は大きな決断を迫られていた。"
      },
      {
        "id": "trial-14-p-5",
        "kind": "scene",
        "text": "【政府の一室】"
      },
      {
        "id": "trial-14-p-6",
        "kind": "narration",
        "text": "村瀬が部屋へ入ると、西郷 隆盛、大久保 利通、木戸 孝允が向かい合っていた。"
      },
      {
        "id": "trial-14-p-7",
        "kind": "narration",
        "text": "三条 実美と岩倉 具視も、その様子を見守っている。"
      },
      {
        "id": "trial-14-p-8",
        "kind": "narration",
        "text": "西郷が静かに口を開く。"
      },
      {
        "id": "trial-14-p-9",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「政府は、おいを朝鮮へ送ると決めた。」"
      },
      {
        "id": "trial-14-p-10",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「ならば、その約束は守るべきです。」"
      },
      {
        "id": "trial-14-p-11",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「おいは戦をしに行くのではなか。」"
      },
      {
        "id": "trial-14-p-12",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「誠を尽くして話をしてきもす。」"
      },
      {
        "id": "trial-14-p-13",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「誰かが向き合わねばならん役目なら、おいが引き受けもす。」"
      },
      {
        "id": "trial-14-p-14",
        "kind": "narration",
        "text": "大久保が応じる。"
      },
      {
        "id": "trial-14-p-15",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「西郷さん。」"
      },
      {
        "id": "trial-14-p-16",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「状況が変われば、決定も見直さねばならん。」"
      },
      {
        "id": "trial-14-p-17",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「外国を見て分かった。」"
      },
      {
        "id": "trial-14-p-18",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「今の日本は、まだ外へ力を向けられる国ではない。」"
      },
      {
        "id": "trial-14-p-19",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「今、優先すべきは国内の改革です。」"
      },
      {
        "id": "trial-14-p-20",
        "kind": "dialogue",
        "speaker": "大久保 利通",
        "text": "「国家の責任者は、やりたいことではなく、今最も必要なことを選ばねばならん。」"
      },
      {
        "id": "trial-14-p-21",
        "kind": "narration",
        "text": "木戸が静かに口を開く。"
      },
      {
        "id": "trial-14-p-22",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「私は、お二人とは違うところを問題にしています。」"
      },
      {
        "id": "trial-14-p-23",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「政府は一度、西郷さんを送ると決めました。」"
      },
      {
        "id": "trial-14-p-24",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「それを変えるなら、その根拠と手続を明らかにしなければなりません。」"
      },
      {
        "id": "trial-14-p-25",
        "kind": "dialogue",
        "speaker": "木戸 孝允",
        "text": "「決め方が揺らげば、政府そのものが揺らぎます。」"
      },
      {
        "id": "trial-14-p-26",
        "kind": "narration",
        "text": "三条は深く息をつく。"
      },
      {
        "id": "trial-14-p-27",
        "kind": "dialogue",
        "speaker": "三条 実美",
        "text": "「西郷の覚悟も分かる。」"
      },
      {
        "id": "trial-14-p-28",
        "kind": "dialogue",
        "speaker": "三条 実美",
        "text": "「大久保の言う国の事情も分かる。」"
      },
      {
        "id": "trial-14-p-29",
        "kind": "dialogue",
        "speaker": "三条 実美",
        "text": "「木戸の言う政府の道理も分かる。」"
      },
      {
        "id": "trial-14-p-30",
        "kind": "dialogue",
        "speaker": "三条 実美",
        "text": "「皆、国を思っておる。」"
      },
      {
        "id": "trial-14-p-31",
        "kind": "dialogue",
        "speaker": "三条 実美",
        "text": "「それなのに、一つの答えにならぬのだ……。」"
      },
      {
        "id": "trial-14-p-32",
        "kind": "narration",
        "text": "岩倉が静かに口を開く。"
      },
      {
        "id": "trial-14-p-33",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「同志とは、同じ考えを持つ者ではない。」"
      },
      {
        "id": "trial-14-p-34",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「違う考えであっても、同じ国を思える者じゃ。」"
      },
      {
        "id": "trial-14-p-35",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「だが。」"
      },
      {
        "id": "trial-14-p-36",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「決断する者は、すべての意見を理解したうえで、最後には一つを選ばねばならぬ。」"
      },
      {
        "id": "trial-14-p-37",
        "kind": "narration",
        "text": "岩倉は村瀬を見る。"
      },
      {
        "id": "trial-14-p-38",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「村瀬。」"
      },
      {
        "id": "trial-14-p-39",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「そなたの考えは、一度聞いてみる価値がある。」"
      },
      {
        "id": "trial-14-p-40",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「そなたなら、何を最も大切にする。」"
      },
      {
        "id": "trial-14-p-41",
        "kind": "dialogue",
        "speaker": "岩倉 具視",
        "text": "「そなたの意見も聞かせてくれないか。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "国の信義を守り、自ら責任を引き受ける。\n（西郷 隆盛の考え）",
        "value": "西郷 隆盛の考え"
      },
      {
        "label": "②",
        "text": "状況に応じて決定を見直し、国内改革を優先する。\n（大久保 利通の考え）",
        "value": "大久保 利通の考え"
      },
      {
        "label": "③",
        "text": "決定を変えるなら、その根拠と手続を明確にする。\n（木戸 孝允の考え）",
        "value": "木戸 孝允の考え"
      }
    ]
  },
  {
    "id": 15,
    "title": "第十五章 武士の終焉",
    "subtitle": "志を受け継ぐ者",
    "passages": [
      {
        "id": "trial-15-p-1",
        "kind": "narration",
        "text": "明治十年（1877年）。"
      },
      {
        "id": "trial-15-p-2",
        "kind": "narration",
        "text": "廃刀令、徴兵令、そして廃藩置県。"
      },
      {
        "id": "trial-15-p-3",
        "kind": "narration",
        "text": "武士の時代は、大きな転換点を迎えていた。"
      },
      {
        "id": "trial-15-p-4",
        "kind": "narration",
        "text": "政府を辞した村瀬は、恩人・西郷隆盛を訪ねて薩摩へ向かう。"
      },
      {
        "id": "trial-15-p-5",
        "kind": "narration",
        "text": "しかし、その頃、鹿児島では政府と薩摩の対立が深まり、若者たちが武器庫を襲撃する事件が起こっていた。"
      },
      {
        "id": "trial-15-p-6",
        "kind": "scene",
        "text": "【西郷邸】"
      },
      {
        "id": "trial-15-p-7",
        "kind": "narration",
        "text": "知らせを受け、桐野 利秋、村田 新八、大山 綱良が集まる。"
      },
      {
        "id": "trial-15-p-8",
        "kind": "narration",
        "text": "桐野が声を上げる。"
      },
      {
        "id": "trial-15-p-9",
        "kind": "dialogue",
        "speaker": "桐野 利秋",
        "text": "「若い者は、戦がしたいわけではありもはん。」"
      },
      {
        "id": "trial-15-p-10",
        "kind": "dialogue",
        "speaker": "桐野 利秋",
        "text": "「先生を信じて、ここまでついて来た者たちでごわす。」"
      },
      {
        "id": "trial-15-p-11",
        "kind": "dialogue",
        "speaker": "桐野 利秋",
        "text": "「先生が背を向ければ、若い者は行き場を失います。」"
      },
      {
        "id": "trial-15-p-12",
        "kind": "dialogue",
        "speaker": "桐野 利秋",
        "text": "「先生を信じた者たちを、見捨てたくありもはん。」"
      },
      {
        "id": "trial-15-p-13",
        "kind": "narration",
        "text": "村田が静かに応じる。"
      },
      {
        "id": "trial-15-p-14",
        "kind": "dialogue",
        "speaker": "村田 新八",
        "text": "「気持ちは分かります。」"
      },
      {
        "id": "trial-15-p-15",
        "kind": "dialogue",
        "speaker": "村田 新八",
        "text": "「ですが、このまま戦えば先生まで逆賊になります。」"
      },
      {
        "id": "trial-15-p-16",
        "kind": "dialogue",
        "speaker": "村田 新八",
        "text": "「武器庫を襲った者は政府へ差し出し、事情を説明する。」"
      },
      {
        "id": "trial-15-p-17",
        "kind": "dialogue",
        "speaker": "村田 新八",
        "text": "「先生だけは守らねばなりません。」"
      },
      {
        "id": "trial-15-p-18",
        "kind": "narration",
        "text": "大山が首を振る。"
      },
      {
        "id": "trial-15-p-19",
        "kind": "dialogue",
        "speaker": "大山 綱良",
        "text": "「それも違う。」"
      },
      {
        "id": "trial-15-p-20",
        "kind": "dialogue",
        "speaker": "大山 綱良",
        "text": "「今動けば、政府の思うつぼじゃ。」"
      },
      {
        "id": "trial-15-p-21",
        "kind": "dialogue",
        "speaker": "大山 綱良",
        "text": "「薩摩は、じっと耐えるべきじゃ。」"
      },
      {
        "id": "trial-15-p-22",
        "kind": "dialogue",
        "speaker": "大山 綱良",
        "text": "「今は薩摩全体を守ることを考えねばならん。」"
      },
      {
        "id": "trial-15-p-23",
        "kind": "narration",
        "text": "部屋は静まり返る。"
      },
      {
        "id": "trial-15-p-24",
        "kind": "narration",
        "text": "桐野は、仲間への責任を語った。"
      },
      {
        "id": "trial-15-p-25",
        "kind": "narration",
        "text": "村田は、法と規律を語った。"
      },
      {
        "id": "trial-15-p-26",
        "kind": "narration",
        "text": "大山は、薩摩全体を守ることを語った。"
      },
      {
        "id": "trial-15-p-27",
        "kind": "narration",
        "text": "誰も、自分のために語っているわけではなかった。"
      },
      {
        "id": "trial-15-p-28",
        "kind": "narration",
        "text": "守ろうとしているものが違うだけだった。"
      },
      {
        "id": "trial-15-p-29",
        "kind": "scene",
        "text": "【夜　西郷邸】"
      },
      {
        "id": "trial-15-p-30",
        "kind": "narration",
        "text": "夜風が庭を吹き抜ける。"
      },
      {
        "id": "trial-15-p-31",
        "kind": "narration",
        "text": "西郷は縁側で静かに庭を眺めていた。"
      },
      {
        "id": "trial-15-p-32",
        "kind": "narration",
        "text": "村瀬が隣へ腰を下ろす。"
      },
      {
        "id": "trial-15-p-33",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「桐野どんにも理がある。」"
      },
      {
        "id": "trial-15-p-34",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「村田どんにも理がある。」"
      },
      {
        "id": "trial-15-p-35",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「大山どんにも理がある。」"
      },
      {
        "id": "trial-15-p-36",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「皆。」"
      },
      {
        "id": "trial-15-p-37",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「薩摩を思うちょる。」"
      },
      {
        "id": "trial-15-p-38",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「じゃっどん。」"
      },
      {
        "id": "trial-15-p-39",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「最後に決めるんは、おいじゃ。」"
      },
      {
        "id": "trial-15-p-40",
        "kind": "narration",
        "text": "西郷は村瀬を見つめる。"
      },
      {
        "id": "trial-15-p-41",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「村瀬どん。」"
      },
      {
        "id": "trial-15-p-42",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「おはんなら。」"
      },
      {
        "id": "trial-15-p-43",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「どうする。」"
      },
      {
        "id": "trial-15-p-44",
        "kind": "dialogue",
        "speaker": "西郷 隆盛",
        "text": "「おはんの考えを、聞かせてもらえんか。」"
      }
    ],
    "choices": [
      {
        "label": "①",
        "text": "仲間への責任を果たす。\n（桐野 利秋の考え）",
        "value": "桐野 利秋の考え"
      },
      {
        "label": "②",
        "text": "法と規律を守る責任を果たす。\n（村田 新八の考え）",
        "value": "村田 新八の考え"
      },
      {
        "label": "③",
        "text": "今は耐え、薩摩を守る。\n（大山 綱良の考え）",
        "value": "大山 綱良の考え"
      }
    ]
  }
];

export const trialChapters: Chapter[] = trialChapterSources.map((trialChapter, index) => {
  const fullChapter = fullChapters[index];

  if (!fullChapter) {
    throw new Error(`対応する本編の章が見つかりません: ${trialChapter.id}`);
  }

  return {
    ...fullChapter,
    id: trialChapter.id,
    title: trialChapter.title,
    subtitle: trialChapter.subtitle,
    sourceFile: "短縮版ストーリー.txt",
    passages: trialChapter.passages,
    endingPassages: [],
    choices: fullChapter.choices.map((choice, choiceIndex) =>
      mergeTrialChoice(choice, trialChapter.choices[choiceIndex]),
    ),
  };
});

export const trialEditReports: TrialEditReport[] = trialChapters.map((chapter, index) => {
  const original = fullChapters[index];
  const originalCharacters = countCharacters([...original.passages, ...original.endingPassages]);
  const editedCharacters = countCharacters([...chapter.passages, ...chapter.endingPassages]);

  return {
    chapterId: chapter.id,
    originalCharacters,
    editedCharacters,
    reductionRate: Math.round((1 - editedCharacters / originalCharacters) * 1000) / 10,
    theme: "短縮版ストーリー.txt の内容を使用した体験版シナリオです。",
    removedNarrationSummary: "本編とは別データとして管理しています。本編テキストは変更していません。",
    changedDialogueSummary: "選択肢IDと診断スコアは本編の同じ章・同じ順番のものを再利用しています。",
  };
});

function mergeTrialChoice(
  fullChoice: Choice,
  trialChoice: TrialChapterSource["choices"][number] | undefined,
): Choice {
  if (!trialChoice) {
    return fullChoice;
  }

  return {
    ...fullChoice,
    label: trialChoice.label,
    text: trialChoice.text,
    value: trialChoice.value ?? fullChoice.value,
  };
}

function countCharacters(passages: Passage[]): number {
  return passages.reduce((total, passage) => total + passage.text.replace(/\s/g, "").length, 0);
}

export type QuickDiagnosisOption = {
  id: "choice-1" | "choice-2" | "choice-3";
  text: string;
  note?: string;
};

export type QuickDiagnosisQuestion = {
  id: number;
  heading: string;
  description: string;
  question: string;
  options: QuickDiagnosisOption[];
};

export const quickDiagnosisQuestions: QuickDiagnosisQuestion[] = [
  {
    id: 1,
    heading: "突然、外部環境が大きく変わったら",
    description: "1853年、黒船が来航し、日本はこれまでの常識が通用しない状況に直面しました。",
    question: "あなたなら、まずどうしますか。",
    options: [
      { id: "choice-1", text: "危機に対して、すぐ行動を起こす。" },
      { id: "choice-2", text: "まず相手を学び、自分たちを強くする方法を考える。" },
      { id: "choice-3", text: "情勢を見極め、動くべき時に備える。" },
    ],
  },
  {
    id: 2,
    heading: "尊敬する人の教えをどう受け継ぐか",
    description: "自分を導いてくれた人物がいなくなりました。",
    question: "その人が残した考えを、あなたならどう受け継ぎますか。",
    options: [
      { id: "choice-1", text: "教えを実践して証明する。", note: "決行によって志を継ぐ" },
      { id: "choice-2", text: "時代に合わせて考え続ける。", note: "変革によって志を継ぐ" },
      { id: "choice-3", text: "志を仲間へ受け継ぐ。", note: "継承によって志を継ぐ" },
    ],
  },
  {
    id: 3,
    heading: "大きな変革が必要になったら",
    description: "国の仕組みそのものを見直さなければならない時代が来ました。",
    question: "あなたなら、どのように未来を築きますか。",
    options: [
      { id: "choice-1", text: "今ある仕組みを生かしながら、日本を改革する。", note: "勝 海舟の考え" },
      { id: "choice-2", text: "覚悟を持って時代を切り開き、新しい日本を築く。", note: "西郷 吉之助の考え" },
      { id: "choice-3", text: "立場を越えて人をつなぎ、協力できる日本を築く。", note: "坂本 龍馬の考え" },
    ],
  },
  {
    id: 4,
    heading: "自分たちの立場が危うくなったら",
    description: "長州は京都から追われ、立場を失いました。このままでは終われない一方、無理に動けばさらに大きな損失を招く可能性があります。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "今こそ行動し、自分たちの覚悟を示す。" },
      { id: "choice-2", text: "本来の目的を見失わず、必要以上の争いは避ける。" },
      { id: "choice-3", text: "一度退き、再び立ち上がる機会を残す。" },
    ],
  },
  {
    id: 5,
    heading: "圧倒的に不利な交渉を迫られたら",
    description: "組織の存続そのものが危ぶまれる状況です。相手の力は圧倒的で、正面から対抗するのは困難です。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "組織を残すことを優先し、相手の要求を受け入れる。" },
      { id: "choice-2", text: "交渉し、少しでも有利な条件を引き出す。" },
      { id: "choice-3", text: "勝機があるなら、信念を守るために戦う。" },
    ],
  },
  {
    id: 6,
    heading: "今すぐ動くべきか迷ったら",
    description: "組織の方針に納得できず、変革を求める仲間が集まっています。しかし、動けば内部対立につながります。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "今しかないと判断し、行動を起こす。" },
      { id: "choice-2", text: "仲間同士の争いを避け、対話による解決を探る。" },
      { id: "choice-3", text: "まだ動かず、情勢を見極める。" },
    ],
  },
  {
    id: 7,
    heading: "かつての敵と協力する必要が出てきたら",
    description: "大きな目的を実現するためには、これまで対立していた相手との協力が必要になりました。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "必要なら、敵であってもすぐに手を組む。" },
      { id: "choice-2", text: "まず小さな協力から始め、信頼を積み重ねる。" },
      { id: "choice-3", text: "まず自分たちの結束を固めてから協力する。" },
    ],
  },
  {
    id: 8,
    heading: "限られた人員で、仲間が危機に陥ったら",
    description: "圧倒的に不利な戦いの中、一部の地域が攻撃され、人々が苦しんでいます。しかし、救援に人員を割けば、全体が危険になります。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "限定的な援軍を送り、長州全体を守る。", note: "桂 小五郎の考え" },
      { id: "choice-2", text: "奇兵隊を率いて、大島を奪還する。", note: "高杉 晋作の考え" },
      { id: "choice-3", text: "大島へ兵を送らず、他の戦線へ集中する。", note: "村田 蔵六の考え" },
    ],
  },
  {
    id: 9,
    heading: "重要な決定で意見が割れたら",
    description: "新しい体制を作ろうとしています。これまでの関係を大切にする意見、公平な手続きを求める意見、最後は責任者が決断すべきという意見があります。",
    question: "あなたなら何を重視しますか。",
    options: [
      { id: "choice-1", text: "これまで築いてきた信頼や恩義。" },
      { id: "choice-2", text: "公平な手続きと、皆が納得できる意思決定。" },
      { id: "choice-3", text: "最後は責任を背負い、自分で決断する。" },
    ],
  },
  {
    id: 10,
    heading: "組織が敗北の危機に立ったら",
    description: "戦いを続ければ組織そのものが失われる可能性があります。一方で、まだ戦えるという意見もあります。",
    question: "あなたなら何を優先しますか。",
    options: [
      { id: "choice-1", text: "より大きな全体を守る。" },
      { id: "choice-2", text: "自分の組織と、その中で暮らす人々を守る。" },
      { id: "choice-3", text: "残された勝機を生かし、組織の統制を守る。" },
    ],
  },
  {
    id: 11,
    heading: "勝てる戦いでも、大きな犠牲が出るなら",
    description: "勝利できる可能性は高い。しかし戦えば、多くの市民も巻き込まれます。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "将来の禍根を残さないため、最後まで決着をつける。" },
      { id: "choice-2", text: "国を疲弊させないため、できる限り戦わずに終わらせる。" },
      { id: "choice-3", text: "戦いは避けながら、必要な秩序は維持する。" },
    ],
  },
  {
    id: 12,
    heading: "平和な時に、何へ投資するか",
    description: "大きな争いが終わりました。今後の安定を守るため、新たな仕組みを作ろうとしています。",
    question: "あなたなら何を重視しますか。",
    options: [
      { id: "choice-1", text: "将来の危機に備え、平時から準備する。" },
      { id: "choice-2", text: "関係者との信頼を守る。" },
      { id: "choice-3", text: "力のある者が相応の責任を負う仕組みにする。" },
    ],
  },
  {
    id: 13,
    heading: "大きな改革を進めるなら",
    description: "これまでの仕組みを廃止し、大きな制度改革を行うことになりました。",
    question: "あなたなら、改革をどう進めますか。",
    options: [
      { id: "choice-1", text: "必要な改革なら、一気に進める。" },
      { id: "choice-2", text: "人の理解を得ながら進める。" },
      { id: "choice-3", text: "制度を整えながら進める。" },
    ],
  },
  {
    id: 14,
    heading: "一度決めた方針を変える必要が出たら",
    description: "組織として一度決めた方針があります。しかし、その後に状況が変わり、見直すべきという意見が出てきました。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "一度した約束を守り、自ら責任を引き受ける。" },
      { id: "choice-2", text: "状況が変わったなら、決定を見直して優先順位を変える。" },
      { id: "choice-3", text: "変更するなら、その理由と手続きを明確にする。" },
    ],
  },
  {
    id: 15,
    heading: "時代が変わり、これまでの価値観が失われていく時",
    description: "自分たちが大切にしてきた時代が終わろうとしています。仲間には不満があり、新しい社会のルールとの間で葛藤が生まれています。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "仲間への責任を果たす。" },
      { id: "choice-2", text: "法と規律を守る責任を果たす。" },
      { id: "choice-3", text: "今は耐え、組織と地域を守る。" },
    ],
  },
];

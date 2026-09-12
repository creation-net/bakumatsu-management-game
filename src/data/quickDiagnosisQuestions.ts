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
      { id: "choice-2", text: "相手から学び、自分たちを強くする方法を考える。" },
      { id: "choice-3", text: "すぐには動かず、情勢を見極める。" },
    ],
  },
  {
    id: 2,
    heading: "尊敬する人の教えをどう受け継ぐか",
    description: "自分を導いてくれた人物がいなくなりました。",
    question: "その人が残した考えを、あなたならどう受け継ぎますか。",
    options: [
      { id: "choice-1", text: "教えが正しいのか、自分で実践して確かめる。" },
      { id: "choice-2", text: "時代に合わせて、教えを自分なりに考え直す。" },
      { id: "choice-3", text: "教えや志を仲間に伝え、次の人へつないでいく。" },
    ],
  },
  {
    id: 3,
    heading: "大きな変革が必要になったら",
    description: "国の仕組みそのものを見直さなければならない時代が来ました。",
    question: "あなたなら、どのように未来を築きますか。",
    options: [
      { id: "choice-1", text: "今ある仕組みを生かしながら、日本を改革する。" },
      { id: "choice-2", text: "覚悟を持って変革を進め、新しい日本を築く。" },
      { id: "choice-3", text: "立場を越えて人をつなぎ、協力できる日本を築く。" },
    ],
  },
  {
    id: 4,
    heading: "自分たちの立場が危うくなったら",
    description: "政治の中心から追われ、立場を失いました。このままでは終われない一方、無理に動けばさらに大きな損失を招く可能性があります。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "立場を取り戻すため、覚悟をもって行動を起こす。" },
      { id: "choice-2", text: "争いを避けながら、交渉による解決を目指す。" },
      { id: "choice-3", text: "一度退き、再び立ち上がる機会を待つ。" },
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
      { id: "choice-3", text: "まず内部の結束を固めてから、協力を検討する。" },
    ],
  },
  {
    id: 8,
    heading: "限られた人員で、仲間が危機に陥ったら",
    description: "圧倒的に不利な戦いの中、一部の地域が攻撃され、人々が苦しんでいます。しかし、救援に人員を割けば、全体が危険になります。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "援軍は限定的でも、仲間を守る姿勢を示す。" },
      { id: "choice-2", text: "全体の士気も考え、全力で仲間を救う。" },
      { id: "choice-3", text: "援軍は送らず、全体を守ることを優先する。" },
    ],
  },
  {
    id: 9,
    heading: "重要な決定で意見が割れたら",
    description: "新しい体制を作ろうとしています。これまで貢献してくれた人に対して、どのような処遇にすべきか意見が割れています。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "これまで貢献してくれた人とともに、新しい国づくりを進める。" },
      { id: "choice-2", text: "過去の貢献だけで特別扱いせず、公正・公平な手続きを踏む。" },
      { id: "choice-3", text: "過去の貢献にとらわれず、決別する覚悟で新しい国づくりを進める。" },
    ],
  },
  {
    id: 10,
    heading: "組織が敗北の危機に立ったら",
    description: "戦いを続ければ組織そのものが失われる可能性があります。一方で、戦う意思を示さないと軍の統制が失われる危険があります。",
    question: "あなたなら何を優先しますか。",
    options: [
      { id: "choice-1", text: "組織の枠を越え、国全体を考えて行動する。" },
      { id: "choice-2", text: "自分の組織と、その中で暮らす人々を守る。" },
      { id: "choice-3", text: "組織の統制を守るため、残された勝機に賭ける。" },
    ],
  },
  {
    id: 11,
    heading: "勝てる戦いでも、大きな犠牲が出るなら",
    description: "勝利できる可能性は高い。しかし戦えば、多くの市民も巻き込まれます。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "将来の禍根を残さないため、覚悟をもって最後まで決着をつける。" },
      { id: "choice-2", text: "国を疲弊させないため、できる限り戦わずに終わらせる。" },
      { id: "choice-3", text: "戦いは避けながら、人々の安心に必要な秩序は維持する。" },
    ],
  },
  {
    id: 12,
    heading: "平和な時に、何へ投資するか",
    description: "大きな争いが終わりました。今後の安定を守るため、新たな仕組みを作ろうとしています。",
    question: "あなたなら何を重視しますか。",
    options: [
      { id: "choice-1", text: "将来の内部対立に備え、平時から準備を進める。" },
      { id: "choice-2", text: "内部の信頼関係を強くする。" },
      { id: "choice-3", text: "内部の規律と責任の仕組みを整える。" },
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
      { id: "choice-3", text: "必要な制度を整えながら進める。" },
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
      { id: "choice-3", text: "変更の理由と正式な手続きを明らかにして進める。" },
    ],
  },
  {
    id: 15,
    heading: "時代が変わり、これまでの価値観が失われていく時",
    description: "自分たちが大切にしてきた時代が終わろうとしています。仲間には不満があり、新しい社会のルールとの間で葛藤が生まれています。",
    question: "あなたならどうしますか。",
    options: [
      { id: "choice-1", text: "仲間の不満を一手に引き受け、自分の責任を果たす。" },
      { id: "choice-2", text: "新たな法と規律を守り、自分の責任を果たす。" },
      { id: "choice-3", text: "すぐには行動に移さず、状況を見極めながら待つ。" },
    ],
  },
];

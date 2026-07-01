import type { DiagnosisDefinition, DiagnosisResult, DiagnosisSlug } from "@/types";

export const diagnosisDefinitions: DiagnosisDefinition[] = [
  {
    slug: "bone",
    title: "骨格診断",
    shortTitle: "骨格",
    description: "体のラインや素材感の得意傾向から、似合いやすい服の形を見つけます。",
    duration: "約3分",
    icon: "Sparkles",
    resultTypes: ["ストレート", "ウェーブ", "ナチュラル"],
    questions: [
      {
        id: "bone-1",
        question: "上半身の印象に近いものは？",
        helper: "鏡で見たときの全体バランスで選んでください。",
        options: [
          { label: "厚みや立体感がある", description: "胸元や腰位置が高く見えやすい", scores: { ストレート: 2 } },
          { label: "華奢でやわらかい", description: "首元や肩まわりが薄く見えやすい", scores: { ウェーブ: 2 } },
          { label: "骨や関節が目立つ", description: "肩・手首・膝などのフレーム感がある", scores: { ナチュラル: 2 } }
        ]
      },
      {
        id: "bone-2",
        question: "得意だと感じる服の素材は？",
        helper: "着たときにしっくり来る質感を選びましょう。",
        options: [
          { label: "ハリのあるシャツやジャケット", description: "きれいめで立体的な素材", scores: { ストレート: 2 } },
          { label: "薄手ニットやシフォン", description: "軽くてやわらかな素材", scores: { ウェーブ: 2 } },
          { label: "リネンやデニム", description: "ラフで表情のある素材", scores: { ナチュラル: 2 } }
        ]
      },
      {
        id: "bone-3",
        question: "トップスの形で安心するのは？",
        helper: "一番よく手に取る形でも大丈夫です。",
        options: [
          { label: "Vネックやシンプルな首元", description: "上半身がすっきり見える", scores: { ストレート: 2 } },
          { label: "短め丈やふんわり袖", description: "重心が上がって見える", scores: { ウェーブ: 2 } },
          { label: "ゆるめのオーバーサイズ", description: "抜け感が出る", scores: { ナチュラル: 2 } }
        ]
      }
    ]
  },
  {
    slug: "color",
    title: "パーソナルカラー診断",
    shortTitle: "カラー",
    description: "肌・髪・瞳の印象から、顔まわりを明るく見せる色の方向性を探します。",
    duration: "約4分",
    icon: "Palette",
    resultTypes: ["イエベ春", "ブルベ夏", "イエベ秋", "ブルベ冬"],
    questions: [
      {
        id: "color-1",
        question: "顔色が明るく見えるリップは？",
        helper: "よく褒められる色を思い出してください。",
        options: [
          { label: "コーラル・ピーチ", description: "明るくフレッシュな色", scores: { イエベ春: 2 } },
          { label: "ローズ・青みピンク", description: "透明感が出る色", scores: { ブルベ夏: 2 } },
          { label: "テラコッタ・ブラウン", description: "落ち着いて深みのある色", scores: { イエベ秋: 2 } },
          { label: "ベリー・ワイン", description: "くっきり華やかな色", scores: { ブルベ冬: 2 } }
        ]
      },
      {
        id: "color-2",
        question: "アクセサリーでなじみやすいのは？",
        helper: "肌から浮きにくい方を選んでください。",
        options: [
          { label: "明るいゴールド", description: "軽やかに見える", scores: { イエベ春: 2 } },
          { label: "淡いシルバー", description: "やさしく涼しげに見える", scores: { ブルベ夏: 2 } },
          { label: "アンティークゴールド", description: "大人っぽくまとまる", scores: { イエベ秋: 2 } },
          { label: "プラチナ・黒系", description: "コントラストが映える", scores: { ブルベ冬: 2 } }
        ]
      },
      {
        id: "color-3",
        question: "制服や白Tに合わせたい差し色は？",
        helper: "自分らしく見える色を選びます。",
        options: [
          { label: "ミントや明るい黄色", description: "元気で軽い印象", scores: { イエベ春: 2 } },
          { label: "ラベンダーや水色", description: "やわらかい透明感", scores: { ブルベ夏: 2 } },
          { label: "カーキやマスタード", description: "こなれた深み", scores: { イエベ秋: 2 } },
          { label: "ロイヤルブルーや黒", description: "シャープで強い印象", scores: { ブルベ冬: 2 } }
        ]
      }
    ]
  },
  {
    slug: "face",
    title: "顔タイプ・雰囲気診断",
    shortTitle: "雰囲気",
    description: "顔立ちと雰囲気から、似合うテイストやメイクの方向性を見つけます。",
    duration: "約4分",
    icon: "Smile",
    resultTypes: ["きれいめ", "カジュアル", "フェミニン", "クール", "ナチュラル", "ストリート"],
    questions: [
      {
        id: "face-1",
        question: "第一印象で言われやすいのは？",
        helper: "友達や家族から言われる言葉で選びます。",
        options: [
          { label: "上品・落ち着いている", description: "整った印象", scores: { きれいめ: 2 } },
          { label: "親しみやすい・元気", description: "ラフで話しかけやすい", scores: { カジュアル: 2 } },
          { label: "やさしい・可愛い", description: "甘さが似合う", scores: { フェミニン: 2 } },
          { label: "かっこいい・大人っぽい", description: "直線的で凛とした印象", scores: { クール: 2 } }
        ]
      },
      {
        id: "face-2",
        question: "写真を撮るときにしっくりくる雰囲気は？",
        helper: "SNSアイコンにしたくなる方向性を選んでください。",
        options: [
          { label: "白背景できちんと", description: "清潔感を出したい", scores: { きれいめ: 2 } },
          { label: "友達と自然な笑顔", description: "飾らない雰囲気", scores: { ナチュラル: 2 } },
          { label: "色や小物で可愛く", description: "やわらかい世界観", scores: { フェミニン: 2 } },
          { label: "少し攻めた構図", description: "個性を出したい", scores: { ストリート: 2 } }
        ]
      },
      {
        id: "face-3",
        question: "挑戦してみたいメイクは？",
        helper: "普段より少し背伸びしたい方向でOKです。",
        options: [
          { label: "透明感ベースと細めライン", description: "整った抜け感", scores: { きれいめ: 2 } },
          { label: "血色チークと軽めリップ", description: "親しみやすく健康的", scores: { カジュアル: 2 } },
          { label: "涙袋とふんわり眉", description: "甘くやわらかい", scores: { フェミニン: 2 } },
          { label: "濃いめラインと陰影", description: "強さと個性", scores: { クール: 1, ストリート: 1 } }
        ]
      }
    ]
  },
  {
    slug: "fashion",
    title: "ファッション系統診断",
    shortTitle: "系統",
    description: "好きな雰囲気と生活シーンから、続けやすいファッション軸を提案します。",
    duration: "約5分",
    icon: "Shirt",
    resultTypes: ["きれいめカジュアル", "ガーリー", "韓国風", "ストリート", "モード", "ナチュラル", "大人っぽ", "古着ミックス"],
    questions: [
      {
        id: "fashion-1",
        question: "週末のおでかけ服で近いのは？",
        helper: "一番テンションが上がる組み合わせを選んでください。",
        options: [
          { label: "ジャケットとデニム", description: "抜け感のあるきちんと感", scores: { きれいめカジュアル: 2 } },
          { label: "ミニ丈やリボン小物", description: "甘さと華やかさ", scores: { ガーリー: 2 } },
          { label: "短丈トップスとワイドパンツ", description: "今っぽいバランス", scores: { 韓国風: 2 } },
          { label: "スウェットとスニーカー", description: "ラフで個性的", scores: { ストリート: 2 } }
        ]
      },
      {
        id: "fashion-2",
        question: "憧れるショップや世界観は？",
        helper: "実際によく買うかより、好きなムードで選びます。",
        options: [
          { label: "モノトーンで洗練", description: "削ぎ落とした雰囲気", scores: { モード: 2 } },
          { label: "リネンや淡色", description: "自然体でやさしい", scores: { ナチュラル: 2 } },
          { label: "シンプルで大人", description: "清潔感と余裕", scores: { 大人っぽ: 2 } },
          { label: "一点ものやレトロ", description: "人とかぶらない", scores: { 古着ミックス: 2 } }
        ]
      },
      {
        id: "fashion-3",
        question: "服選びで一番大事にしたいことは？",
        helper: "毎日続けやすい価値観を選んでください。",
        options: [
          { label: "学校にも遊びにも使える", description: "着回しと好印象", scores: { きれいめカジュアル: 2, 大人っぽ: 1 } },
          { label: "写真映えする可愛さ", description: "甘さやトレンド感", scores: { ガーリー: 1, 韓国風: 2 } },
          { label: "自分らしい存在感", description: "個性とカルチャー", scores: { ストリート: 1, モード: 1, 古着ミックス: 2 } },
          { label: "ラクで肌なじみがいい", description: "自然体で落ち着く", scores: { ナチュラル: 2 } }
        ]
      }
    ]
  }
];

export const resultDetails: Record<
  string,
  {
    description: string;
    clothes: string;
    colors: string;
    hair: string;
    makeup: string;
    fashion: string;
    avoid: string;
    shopping: string;
  }
> = {
  ストレート: {
    description: "立体感とすっきりしたラインが映えやすいタイプ。引き算のきれいめが得意です。",
    clothes: "ジャストサイズのシャツ、Iラインスカート、センタープレスパンツ",
    colors: "白、ネイビー、深めベージュなど上質に見える色",
    hair: "まとまりのあるストレート、顔まわりをすっきり見せるレイヤー",
    makeup: "ツヤを一点に置いた清潔感メイク",
    fashion: "きれいめカジュアル、大人っぽ、モード",
    avoid: "厚すぎる重ね着や装飾過多で上半身が詰まって見えること",
    shopping: "首元の開き、素材のハリ、腰位置がきれいに見えるか"
  },
  ウェーブ: {
    description: "やわらかさと軽やかな重心アップが似合いやすいタイプ。可憐な足し算が得意です。",
    clothes: "短め丈トップス、フレアスカート、薄手ニット、シアー素材",
    colors: "淡いピンク、ラベンダー、ミルキーな色",
    hair: "ふんわり巻き、顔まわりの柔らかいカール",
    makeup: "血色チークと丸みを感じるアイメイク",
    fashion: "ガーリー、韓国風、きれいめカジュアル",
    avoid: "重い素材や下重心のシルエットだけでまとめること",
    shopping: "ウエスト位置、袖や襟のディテール、素材の軽さ"
  },
  ナチュラル: {
    description: "フレーム感とラフな余白が魅力になるタイプ。こなれた抜け感が得意です。",
    clothes: "オーバーシャツ、ワイドパンツ、デニム、リネン、ざっくりニット",
    colors: "エクリュ、カーキ、グレージュなど自然な色",
    hair: "無造作なレイヤー、ラフなまとめ髪",
    makeup: "作り込みすぎない陰影と自然な眉",
    fashion: "ナチュラル、古着ミックス、ストリート",
    avoid: "小さすぎる柄や体に張りつく素材だけでまとめること",
    shopping: "肩や袖のゆとり、素材の表情、ラフに着ても洒落るか"
  }
};

export const defaultResultDetail = {
  description: "あなたの雰囲気を活かしながら、無理なくおしゃれを楽しめるタイプです。",
  clothes: "得意なテイストを一つ決め、ベーシックアイテムに足していくのがおすすめです。",
  colors: "顔まわりに得意色を置くと、印象が明るくまとまりやすくなります。",
  hair: "服の雰囲気と髪の重さを合わせると、全体の完成度が上がります。",
  makeup: "色を盛りすぎず、肌・眉・リップのどこか一つを主役にしましょう。",
  fashion: "診断タイプに近いスタイリストと相談すると、買い足しがしやすくなります。",
  avoid: "苦手と決めつけず、素材・色・丈のどれかを調整して取り入れましょう。",
  shopping: "試着時は正面だけでなく横顔、後ろ姿、手持ち服との相性も確認しましょう。"
};

export function getDiagnosis(slug: string) {
  return diagnosisDefinitions.find((item) => item.slug === slug);
}

export function calculateDiagnosisResult(definition: DiagnosisDefinition, answers: number[]) {
  const scores = Object.fromEntries(definition.resultTypes.map((type) => [type, 0]));
  answers.forEach((optionIndex, questionIndex) => {
    const option = definition.questions[questionIndex]?.options[optionIndex];
    if (!option) return;
    Object.entries(option.scores).forEach(([type, score]) => {
      scores[type] = (scores[type] ?? 0) + score;
    });
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0]?.[1] ?? 0;
  const tied = sorted.filter(([, score]) => score === topScore).map(([type]) => type);
  return tied[0] ?? definition.resultTypes[0];
}

export function mergeResult(slug: DiagnosisSlug, type: string): DiagnosisResult {
  if (slug === "bone") return { bone_type: type };
  if (slug === "color") return { color_type: type };
  if (slug === "face") return { face_type: type };
  return { fashion_type: type };
}

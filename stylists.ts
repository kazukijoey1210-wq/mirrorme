import type { DiagnosisResult, Stylist } from "@/types";

export const stylists: Stylist[] = [
  {
    id: "mio-k",
    displayName: "Mio K.",
    bio: "韓国風の透明感メイクと、学生でも取り入れやすい淡色コーデが得意です。手持ち服を活かした垢抜け提案をします。",
    schoolOrBackground: "美容専門学校 メイクアップ専攻",
    specialties: ["韓国風", "透明感メイク", "ブルベ夏", "垢抜け"],
    supportedBoneTypes: ["ウェーブ", "ストレート"],
    supportedColorTypes: ["ブルベ夏", "イエベ春"],
    supportedFaceTypes: ["フェミニン", "きれいめ", "ナチュラル"],
    supportedFashionTypes: ["韓国風", "ガーリー", "きれいめカジュアル"],
    area: "東京 / オンライン",
    onlineAvailable: true,
    priceMin: 1500,
    priceMax: 3500,
    rating: 4.9,
    reviewCount: 42,
    isPublished: true,
    available: true,
    avatarTone: "from-pink-200 via-violet-200 to-rose-100",
    portfolio: [
      { imageTone: "from-pink-100 to-violet-100", caption: "透明感スクールメイク" },
      { imageTone: "from-rose-100 to-stone-100", caption: "淡色カフェコーデ" },
      { imageTone: "from-violet-100 to-white", caption: "ブルベ夏リップ比較" }
    ],
    menus: [
      { id: "mio-quick", title: "30分 垢抜け相談", description: "メイクと服の方向性を短時間で整理", price: 1500, durationMinutes: 30, online: true, offline: false },
      { id: "mio-full", title: "診断結果つきトータル提案", description: "髪・服・メイクの買い足しリストまで作成", price: 3500, durationMinutes: 60, online: true, offline: true }
    ],
    reviews: [
      { user: "大学1年 Aさん", rating: 5, comment: "手持ちコスメでできる提案が多くてすぐ真似できました。" },
      { user: "高校3年 Mさん", rating: 5, comment: "初めてでも話しやすく、学校メイクの範囲で可愛くなれました。" }
    ],
    notes: "未成年の方は保護者の同意を得たうえで対面相談を予約してください。"
  },
  {
    id: "ren-vintage",
    displayName: "Ren",
    bio: "古着ミックスとメンズライクな着回しが得意。予算内で個性を出す買い物ルートも一緒に考えます。",
    schoolOrBackground: "服飾大学 スタイリングゼミ",
    specialties: ["古着ミックス", "ストリート", "メンズライク"],
    supportedBoneTypes: ["ナチュラル"],
    supportedColorTypes: ["イエベ秋", "ブルベ冬"],
    supportedFaceTypes: ["ストリート", "クール", "カジュアル"],
    supportedFashionTypes: ["古着ミックス", "ストリート", "モード"],
    area: "大阪 / 京都 / オンライン",
    onlineAvailable: true,
    priceMin: 1200,
    priceMax: 4000,
    rating: 4.7,
    reviewCount: 35,
    isPublished: true,
    available: true,
    avatarTone: "from-stone-200 via-amber-100 to-slate-200",
    portfolio: [
      { imageTone: "from-stone-200 to-amber-100", caption: "古着屋巡りコーデ" },
      { imageTone: "from-slate-200 to-stone-100", caption: "オーバーサイズ比較" },
      { imageTone: "from-neutral-200 to-orange-100", caption: "一点主役の色合わせ" }
    ],
    menus: [
      { id: "ren-online", title: "古着ミックス入門", description: "手持ち服に一点足すなら何かを提案", price: 1200, durationMinutes: 30, online: true, offline: false },
      { id: "ren-shopping", title: "買い物同行リクエスト", description: "エリアと予算から店舗候補を整理", price: 4000, durationMinutes: 90, online: false, offline: true }
    ],
    reviews: [
      { user: "大学2年 Sさん", rating: 5, comment: "派手すぎない古着の取り入れ方がわかりました。" },
      { user: "高校2年 Kさん", rating: 4, comment: "予算低めでも具体的に組んでくれて助かりました。" }
    ],
    notes: "買い物同行は公共施設または商業施設内で実施します。"
  },
  {
    id: "hina-wave",
    displayName: "Hina",
    bio: "骨格ウェーブ向けのガーリーコーデが専門。甘すぎないバランスで、学校帰りにも着やすい提案をします。",
    schoolOrBackground: "服飾専門学校 ファッションビジネス科",
    specialties: ["ガーリー", "骨格ウェーブ", "淡色"],
    supportedBoneTypes: ["ウェーブ"],
    supportedColorTypes: ["イエベ春", "ブルベ夏"],
    supportedFaceTypes: ["フェミニン", "きれいめ"],
    supportedFashionTypes: ["ガーリー", "韓国風", "きれいめカジュアル"],
    area: "福岡 / オンライン",
    onlineAvailable: true,
    priceMin: 1800,
    priceMax: 3600,
    rating: 4.8,
    reviewCount: 28,
    isPublished: true,
    available: true,
    avatarTone: "from-rose-100 via-pink-200 to-orange-100",
    portfolio: [
      { imageTone: "from-rose-100 to-pink-50", caption: "短丈トップス比較" },
      { imageTone: "from-pink-100 to-amber-50", caption: "デート風ガーリー" },
      { imageTone: "from-violet-100 to-rose-50", caption: "淡色アクセ選び" }
    ],
    menus: [
      { id: "hina-balance", title: "ウェーブ向けバランス診断", description: "丈・素材・小物を一緒に整理", price: 1800, durationMinutes: 45, online: true, offline: false },
      { id: "hina-look", title: "1週間コーデ作成", description: "学校と休日で使える7コーデを提案", price: 3600, durationMinutes: 60, online: true, offline: false }
    ],
    reviews: [
      { user: "大学1年 Yさん", rating: 5, comment: "似合う丈がわかって服選びが楽になりました。" },
      { user: "高校1年 Nさん", rating: 5, comment: "可愛いけど子どもっぽくない提案が嬉しかったです。" }
    ],
    notes: "体型への否定的な表現は使わず、似合う方向性を一緒に探します。"
  },
  {
    id: "sora-clean",
    displayName: "Sora",
    bio: "メンズ・ユニセックスのきれいめカジュアルが得意。清潔感、面接、初対面で好印象な服を作ります。",
    schoolOrBackground: "大学ファッションサークル スタイリング担当",
    specialties: ["メンズきれいめ", "清潔感", "就活"],
    supportedBoneTypes: ["ストレート", "ナチュラル"],
    supportedColorTypes: ["イエベ春", "ブルベ夏", "ブルベ冬"],
    supportedFaceTypes: ["きれいめ", "ナチュラル", "クール"],
    supportedFashionTypes: ["きれいめカジュアル", "大人っぽ", "モード"],
    area: "名古屋 / オンライン",
    onlineAvailable: true,
    priceMin: 1000,
    priceMax: 3000,
    rating: 4.6,
    reviewCount: 19,
    isPublished: true,
    available: true,
    avatarTone: "from-slate-100 via-blue-100 to-stone-100",
    portfolio: [
      { imageTone: "from-blue-100 to-stone-50", caption: "白シャツ着回し" },
      { imageTone: "from-slate-100 to-zinc-100", caption: "面接用清潔感コーデ" },
      { imageTone: "from-indigo-100 to-white", caption: "初デートの色選び" }
    ],
    menus: [
      { id: "sora-clean", title: "清潔感アップ相談", description: "髪・眉・服の優先順位を整理", price: 1000, durationMinutes: 30, online: true, offline: false },
      { id: "sora-interview", title: "面接・発表用コーデ", description: "TPOに合わせた失敗しにくい服装提案", price: 3000, durationMinutes: 60, online: true, offline: true }
    ],
    reviews: [
      { user: "大学3年 Rさん", rating: 5, comment: "買うものが明確で、無駄遣いせず済みました。" },
      { user: "高校3年 Tさん", rating: 4, comment: "面接の日の服装に自信が持てました。" }
    ],
    notes: "対面相談では個人宅や密室ではなく、人目のある場所を指定します。"
  },
  {
    id: "yui-color",
    displayName: "Yui",
    bio: "ブルベ夏向けのカラー提案が得意。リップ、髪色、制服や私服に合う差し色をわかりやすく提案します。",
    schoolOrBackground: "カラーコーディネート検定 学習中",
    specialties: ["ブルベ夏", "カラー提案", "透明感"],
    supportedBoneTypes: ["ウェーブ", "ストレート", "ナチュラル"],
    supportedColorTypes: ["ブルベ夏"],
    supportedFaceTypes: ["きれいめ", "フェミニン", "ナチュラル"],
    supportedFashionTypes: ["きれいめカジュアル", "韓国風", "ナチュラル"],
    area: "オンライン",
    onlineAvailable: true,
    priceMin: 900,
    priceMax: 2500,
    rating: 4.9,
    reviewCount: 51,
    isPublished: true,
    available: true,
    avatarTone: "from-sky-100 via-violet-100 to-pink-100",
    portfolio: [
      { imageTone: "from-sky-100 to-violet-100", caption: "ブルベ夏パレット" },
      { imageTone: "from-violet-100 to-white", caption: "リップ色比較" },
      { imageTone: "from-cyan-50 to-pink-100", caption: "透明感ヘアカラー" }
    ],
    menus: [
      { id: "yui-color", title: "似合う色ミニ相談", description: "写真なしでも使える色選びの軸を提案", price: 900, durationMinutes: 20, online: true, offline: false },
      { id: "yui-cosme", title: "コスメ買い足し相談", description: "予算別にリップ・チーク・アイシャドウを整理", price: 2500, durationMinutes: 45, online: true, offline: false }
    ],
    reviews: [
      { user: "大学2年 Eさん", rating: 5, comment: "苦手だと思っていた色の使い方も教えてもらえました。" },
      { user: "高校2年 Iさん", rating: 5, comment: "ドラッグストアで選びやすくなりました。" }
    ],
    notes: "写真診断ではなく、自己申告と好みをもとにした参考提案です。"
  },
  {
    id: "kai-street",
    displayName: "Kai",
    bio: "ストリート系とスニーカー起点のコーデが得意。学校で浮きすぎず個性を出すバランスを作ります。",
    schoolOrBackground: "服飾学生 / スナップ撮影チーム所属",
    specialties: ["ストリート", "スニーカー", "Y2K"],
    supportedBoneTypes: ["ナチュラル", "ストレート"],
    supportedColorTypes: ["ブルベ冬", "イエベ秋"],
    supportedFaceTypes: ["ストリート", "カジュアル", "クール"],
    supportedFashionTypes: ["ストリート", "古着ミックス", "モード"],
    area: "東京 / 神奈川 / オンライン",
    onlineAvailable: true,
    priceMin: 1300,
    priceMax: 4200,
    rating: 4.5,
    reviewCount: 23,
    isPublished: true,
    available: false,
    avatarTone: "from-zinc-200 via-rose-100 to-violet-100",
    portfolio: [
      { imageTone: "from-zinc-200 to-violet-100", caption: "スニーカー起点" },
      { imageTone: "from-neutral-200 to-rose-100", caption: "Y2K小物合わせ" },
      { imageTone: "from-slate-200 to-fuchsia-100", caption: "ライブ参戦コーデ" }
    ],
    menus: [
      { id: "kai-sneaker", title: "スニーカー着回し", description: "手持ちの一足から3コーデ提案", price: 1300, durationMinutes: 30, online: true, offline: false },
      { id: "kai-snap", title: "スナップ風スタイリング", description: "写真映えする全身バランスを提案", price: 4200, durationMinutes: 75, online: false, offline: true }
    ],
    reviews: [
      { user: "大学1年 Dさん", rating: 5, comment: "派手すぎないストリートにできて友達に褒められました。" },
      { user: "高校2年 Oさん", rating: 4, comment: "手持ちのスニーカーが主役になりました。" }
    ],
    notes: "現在リクエスト多数のため、返信まで2日ほどかかる場合があります。"
  },
  {
    id: "nana-career",
    displayName: "Nana",
    bio: "就活・面接・発表会向けの清潔感コーデが得意。予算を抑えた第一印象づくりをサポートします。",
    schoolOrBackground: "大学キャリア支援ボランティア",
    specialties: ["就活", "面接", "清潔感", "大人っぽ"],
    supportedBoneTypes: ["ストレート", "ウェーブ", "ナチュラル"],
    supportedColorTypes: ["イエベ春", "ブルベ夏", "イエベ秋", "ブルベ冬"],
    supportedFaceTypes: ["きれいめ", "ナチュラル"],
    supportedFashionTypes: ["大人っぽ", "きれいめカジュアル"],
    area: "オンライン",
    onlineAvailable: true,
    priceMin: 1000,
    priceMax: 2800,
    rating: 4.8,
    reviewCount: 31,
    isPublished: true,
    available: true,
    avatarTone: "from-stone-100 via-rose-50 to-violet-100",
    portfolio: [
      { imageTone: "from-stone-100 to-white", caption: "面接ブラウス比較" },
      { imageTone: "from-zinc-100 to-rose-50", caption: "証明写真前の整え方" },
      { imageTone: "from-violet-50 to-stone-100", caption: "発表会コーデ" }
    ],
    menus: [
      { id: "nana-interview", title: "面接前チェック", description: "服・髪・メイクの不安を整理", price: 1000, durationMinutes: 25, online: true, offline: false },
      { id: "nana-career", title: "清潔感トータル提案", description: "第一印象を整える買い足しリスト作成", price: 2800, durationMinutes: 50, online: true, offline: false }
    ],
    reviews: [
      { user: "大学3年 Lさん", rating: 5, comment: "堅すぎず学生らしい面接服がわかりました。" },
      { user: "高校3年 Cさん", rating: 5, comment: "発表会前に相談して安心できました。" }
    ],
    notes: "企業指定の服装ルールがある場合は、予約時に共有してください。"
  },
  {
    id: "riko-hairmake",
    displayName: "Riko",
    bio: "垢抜けヘアメイクと前髪・眉の整え方が得意。校則やバイト先の雰囲気に合わせて提案します。",
    schoolOrBackground: "美容学生 / サロンアシスタント経験あり",
    specialties: ["垢抜け", "ヘアメイク", "眉", "前髪"],
    supportedBoneTypes: ["ストレート", "ウェーブ", "ナチュラル"],
    supportedColorTypes: ["イエベ春", "ブルベ夏", "イエベ秋", "ブルベ冬"],
    supportedFaceTypes: ["フェミニン", "カジュアル", "ナチュラル", "クール"],
    supportedFashionTypes: ["韓国風", "ガーリー", "大人っぽ", "ナチュラル"],
    area: "札幌 / オンライン",
    onlineAvailable: true,
    priceMin: 1500,
    priceMax: 3200,
    rating: 4.9,
    reviewCount: 46,
    isPublished: true,
    available: true,
    avatarTone: "from-orange-100 via-pink-100 to-violet-100",
    portfolio: [
      { imageTone: "from-orange-100 to-pink-100", caption: "前髪バランス" },
      { imageTone: "from-pink-100 to-white", caption: "眉メイク比較" },
      { imageTone: "from-violet-100 to-rose-100", caption: "校則内メイク" }
    ],
    menus: [
      { id: "riko-brow", title: "眉・前髪ミニ相談", description: "顔まわりの垢抜けポイントを提案", price: 1500, durationMinutes: 30, online: true, offline: false },
      { id: "riko-total", title: "ヘアメイクトータル", description: "髪型・メイク・服の雰囲気をまとめる", price: 3200, durationMinutes: 60, online: true, offline: true }
    ],
    reviews: [
      { user: "高校1年 Pさん", rating: 5, comment: "前髪の巻き方だけで印象が変わって感動しました。" },
      { user: "大学1年 Bさん", rating: 5, comment: "眉を変えたらメイク全体がまとまりました。" }
    ],
    notes: "医療的・専門的な肌診断ではなく、日常メイクの参考提案です。"
  }
];

export function getStylist(id: string) {
  return stylists.find((stylist) => stylist.id === id);
}

export function calculateMatchScore(stylist: Stylist, result: DiagnosisResult) {
  let score = 0;
  if (result.bone_type && stylist.supportedBoneTypes.includes(result.bone_type)) score += 2;
  if (result.color_type && stylist.supportedColorTypes.includes(result.color_type)) score += 2;
  if (result.face_type && stylist.supportedFaceTypes.includes(result.face_type)) score += 2;
  if (
    result.fashion_type &&
    (stylist.supportedFashionTypes.includes(result.fashion_type) ||
      stylist.specialties.some((specialty) => result.fashion_type?.includes(specialty) || specialty.includes(result.fashion_type ?? "")))
  ) {
    score += 3;
  }
  if (stylist.onlineAvailable) score += 1;
  if (stylist.rating >= 4.8) score += 1;
  return score;
}

export function getMatchedStylists(result: DiagnosisResult) {
  return [...stylists]
    .filter((stylist) => stylist.isPublished)
    .map((stylist) => ({ stylist, score: calculateMatchScore(stylist, result) }))
    .sort((a, b) => b.score - a.score || b.stylist.rating - a.stylist.rating);
}

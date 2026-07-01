export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "MIRRORME",
  description:
    "高校生・大学生向けのおしゃれ診断と学生スタイリストマッチングサービス",
  nav: [
    { href: "/", label: "ホーム" },
    { href: "/diagnosis", label: "診断" },
    { href: "/stylists", label: "探す" },
    { href: "/mypage", label: "マイページ" }
  ],
  legal: [
    { href: "/terms", label: "利用規約" },
    { href: "/privacy", label: "プライバシーポリシー" },
    { href: "/safety", label: "安全に使うために" },
    { href: "/contact", label: "お問い合わせ" }
  ]
};

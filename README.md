# MIRRORME

高校生・大学生向けの「おしゃれ診断 × 学生スタイリストマッチング」Webアプリです。骨格診断、パーソナルカラー診断、顔タイプ・雰囲気診断、ファッション系統診断の結果から、相性の良い学生スタイリストを探して予約リクエストできます。

## 技術構成

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui風のローカルUIコンポーネント
- Supabase Auth / Database / Storage
- React Hook Form
- Zod
- Lucide React Icons
- Framer Motion
- ESLint / Prettier

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local` に Supabase の値を設定してください。

```bash
NEXT_PUBLIC_SITE_NAME=MIRRORME
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Supabase

1. Supabaseプロジェクトを作成します。
2. Authenticationでメールログインを有効化します。
3. Googleログインを使う場合は、SupabaseのAuth Provider設定でGoogleを有効化します。
4. SQL Editorで `supabase/schema.sql` を実行します。
5. Storage bucket `stylist-assets` が作成されます。
6. Authentication > URL Configuration で、ローカルと本番URLをRedirect URLに追加します。

Redirect URL例:

```text
http://localhost:3000/auth/callback
https://your-project.vercel.app/auth/callback
```

主なテーブル:

- `profiles`
- `diagnosis_results`
- `stylists`
- `stylist_menus`
- `portfolios`
- `bookings`
- `reviews`
- `favorites`
- `reports`

RLSは、本人、対象スタイリスト、管理者が必要な範囲だけ閲覧・更新できる方針で設定しています。管理者判定は初期版では `profiles.role = 'admin'` です。

## 認証とrole

Supabase Authでメールアドレス・パスワード登録、ログイン、ログアウトを実装しています。
Googleログインも `/auth/callback` でセッション交換できる構成です。Supabase側でGoogle Providerを有効化してください。

roleは `profiles.role` で管理します。

- `customer`: 相談したい人
- `stylist`: スタイリストとして活動したい人
- `admin`: 管理者

新規登録時に `customer` または `stylist` を選択できます。登録後は `profiles` にプロフィールを作成し、マイページへ遷移します。

## マイページ

`/mypage` はログイン必須です。未ログインの場合は `/login?next=/mypage` に遷移します。

- customer: 診断結果、お気に入り、予約履歴、おすすめスタイリスト、診断・検索導線
- stylist: プロフィール完成度、掲載ページプレビュー、予約リクエスト、公開設定導線
- admin: ユーザー数、スタイリスト数、予約数、通報数、管理者ページ導線

## スタイリスト登録

`/mypage/stylist-profile` でスタイリストプロフィールを作成・編集できます。
初期版ではプロフィール画像はURL入力です。将来的にSupabase Storageアップロードへ差し替えやすいよう、保存処理は専用コンポーネントに分けています。

保存先は `stylists` テーブルです。`user_id` をキーにinsert/updateします。

## ローカル起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

Windowsで見た目が崩れた場合は、古い開発サーバーとNext.jsキャッシュがずれている可能性があります。
そのときは `start-mirrorme.cmd` をダブルクリックすると、古いNode.jsを止めて `.next` を削除し、開発サーバーを起動し直します。

## ビルドと検証

```bash
npm run lint
npm run build
```

## デプロイ

Vercelに接続し、環境変数を設定してデプロイします。SupabaseのAuth Redirect URLには本番ドメインとローカルURLを登録してください。

## 実装済み

- トップページ
- ログイン / 新規登録
- 診断トップ
- 1問ずつ進む診断ページ
- 診断結果ページ
- 診断結果に応じたスタイリスト相性スコア
- スタイリスト一覧 / 詳細
- スタイリスト登録・編集フォーム
- 予約リクエストフォーム
- 相談者 / スタイリスト向けマイページ
- 管理者ページ
- 通報・公開管理のUI
- 利用規約、プライバシーポリシー、安全ページ、お問い合わせ
- ローディング、空状態、エラー状態、スケルトンUI

## 今後追加したい機能

- 決済機能
- 自由チャット
- 本人確認
- カレンダー連携
- AIによる写真診断
- クーポン機能
- ポイント機能
- 店舗掲載機能
- SNS投稿連携

## 注意事項

この診断はファッションを楽しむための参考情報です。専門的・医学的な診断ではありません。高校生も利用する可能性があるため、個人情報の入力を最小限にし、自由チャットや決済は初期版では実装していません。

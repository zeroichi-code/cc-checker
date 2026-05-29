# progress.md

## 2026-05-29（セッション4）

### 実施済み事項
- マスコット透明背景PNG作成（Pillow で黒を透明化）→ ライト/ダーク両対応
- ライトモードのカードタイトル文字色を黒に統一
- 残量リングの見出し文字サイズを 16px に調整
- README を配布向けに全面改訂（機能一覧・必要環境・インストール手順）
- 配布方針決定：GitHub + README（git clone で使えるシンプルな方式）
- npm publish（`npx cc-checker`）も将来的に検討

### 現在のステータス
- v1.2 完成。全機能動作確認済み。
- main は origin より 7コミット先行（**未push**）
- README 整備済み、push 待ち

### 次回のタスク
- `git push origin main` で GitHub に公開
- リポジトリ README にスクリーンショット画像を追加
- npm publish 対応（`npx cc-checker` で起動できるように）

## 2026-05-29（セッション3）

### 実施済み事項
- ダーク/ライトテーマ切替機能を追加（☀️/🌙ボタン）
- Tailwind `darkMode: 'class'` 採用、全コンポーネントを両テーマ対応に更新
- テーマ設定は localStorage に永続化（FOUC防止スクリプト付き）

### 現在のステータス
- v1.2 完成。ダーク/ライト切替・Pro/Max切替・スマホ対応すべて動作確認済み。
- main は origin より4コミット先行（未push）。

### 次回のタスク
- GitHub へ push（必要なら）
- 残量警告ブラウザ通知（v2）の検討

## 2026-05-29（セッション2）

### 実施済み事項
- Pro / Max 5x / Max 20x プラン切替トグル実装（過去実績ベースの上限自動推定、localStorage永続化）
- メトリクスカードタイトルを白に統一
- 過去1週間グラフの色をオレンジに変更
- タイトルを「Token Usage」に変更 + Clawde マスコット画像を表示（public/mascot.png）
- 残量リング・テキストのレイアウト調整（pl-8/pl-4）
- `next dev --hostname 0.0.0.0` 追加（同一Wi-Fiのスマホからもアクセス可能）
- スマホ（192.168.3.12:3000）での表示確認済み

### 現在のステータス
- v1.1 完成。PC・スマホで動作確認済み。
- main は origin より3コミット先行（未push）。

### 次回のタスク
- GitHub へ push（必要なら）
- 残量警告通知（v2）の検討

## 2026-05-29

### 実施済み事項
- UI を Apple Fitness「概要」タブ風に全面リデザイン（黒背景・角丸ダークカード）
  - `CircularGauge`: 純正風リング（緑/黄/赤のグラデーション、閾値色）に刷新
  - `MetricCard` + `MiniBars` 新規作成（使用量/コスト/Burn rate/推定残り時間の4カード、ミニ棒グラフ付き）
  - `WeeklyView` 新規作成（過去1週間を7列で表示、今日を強調）
  - `Header`: 大きな「概要」タイトル + 日付 + 丸い更新ボタン
- 残量リングの「残り時間」を「推定残り時間」に改称（projection ベースの推定値であることを明示）
- 廃止: `DailyChart` / `StatusGrid` / `SessionTable`
- ネオン調デザインは git tag `design-neon`（commit b5f0097）で保存済み
- commit c4add8a 「Apple Fitness 概要風UIに全面リデザイン」

### 現在のステータス
- Apple 風 UI v1 完成。ローカルで表示確認済み（残量84%・過去1週間7列表示OK）。
- main は origin より2コミット先行（未push）。

### 次回のタスク
- 必要なら GitHub へ push（`git push`）
- 細部の色・余白の微調整
- 残量警告通知（v2）の検討

## 2026-05-27

### 実施済み事項
- Next.js 14 (App Router) + TypeScript + Tailwind + recharts + SWR で初期構築
- ccusage CLI ラッパー `lib/ccusage.ts` 実装（15秒キャッシュ・Windows `shell: true` 対応）
- API ルート 3本: `/api/blocks`, `/api/daily`, `/api/session`
- ダッシュボード UI 構築
  - `CircularGauge`: 残量に応じて 緑/黄/赤、30%未満でパルス
  - `StatusGrid`: リセットまで / 使用量 / Burn rate / 本日のコスト（USD/JPY・前日比）
  - `DailyChart`: 直近14日 AreaChart
  - `SessionTable`: TOP10 トークン順
  - `Header`: タイトル・最終更新時刻・🔄更新ボタン
- `起動する.bat` 作成（初回 npm install 自動 + ブラウザ自動起動）
- ローカル動作確認: `/` 200、`/api/blocks` 200、アクティブブロック取得 OK
- GitHub リポジトリ https://github.com/zeroichi-code/cc-checker に push

### 現在のステータス
- v0.1 完成。ブラウザでダッシュボードが表示できる状態。
- Next.js 14.2.34（パッチ版）使用。

### 次回のタスク
- 実際に `起動する.bat` から起動した見た目の最終チェック・UI 微調整
- 残量警告通知（30%切ったらブラウザ通知など）の検討（v2）
- recharts v3 への移行検討（現状 v2 で deprecate 警告あり）

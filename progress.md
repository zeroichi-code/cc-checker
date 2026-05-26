# progress.md

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

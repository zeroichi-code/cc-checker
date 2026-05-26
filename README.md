# Claude Code 残量チェッカー

Claude Code の 5時間ブロック残量・日次コスト・セッション消費をブラウザのダッシュボードで可視化する Windows 専用ローカルアプリ。

## 使い方

1. Node.js 18 以上をインストール
2. プロジェクトルートの **`起動する.bat`** をダブルクリック
3. 自動でブラウザが http://localhost:3000 を開く

初回起動時のみ `npm install` と `npx ccusage@latest` のダウンロードで数分かかります。

## 機能

- 円形メーター（残量に応じて色変化: 緑 → 黄 → 赤）
- 5時間ブロックのリセットまでの残時間
- 現在の使用量（入力 / 出力 内訳）
- Burn rate（tokens/min）と上限到達予測
- 本日のコスト（USD / JPY、前日比）
- 直近14日のトークン消費チャート
- セッション別 TOP 10
- 30秒ごと自動更新 + 手動「更新」ボタン

## データソース

[ccusage](https://github.com/ryoppippi/ccusage) CLI をラップして `~/.claude/projects/` 配下の JSONL を解析しています。

## 技術スタック

Next.js 14 (App Router) / TypeScript / Tailwind CSS / recharts / SWR

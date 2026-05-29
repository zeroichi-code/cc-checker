# Token Usage 🦀

Claude Code のトークン残量・コスト・使用状況をブラウザでリアルタイム監視するダッシュボード。

![ダークモード](https://img.shields.io/badge/theme-dark%20%2F%20light-black)
![Windows](https://img.shields.io/badge/platform-Windows-blue)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)

---

## スクリーンショット

| ダークモード | ライトモード |
|---|---|
| 黒背景・Apple Fitness 風 | 白背景・クリーン |

---

## 機能

- 🟢 **残量リング** — 5時間ブロックの消費量を円形メーターで表示（緑→黄→赤）
- ⏱ **推定残り時間** — 現在のブロックがリセットされるまでの残り時間
- 📈 **使用量 / コスト** — 今日のトークン数・USD/JPY コスト（直近14日グラフ付き）
- 🔥 **Burn rate** — 現在の消費ペース（tokens/min）
- 📅 **過去1週間** — 日別トークン量の棒グラフ
- 🌙 **ダーク / ライト切替** — ☀️🌙ボタンで即時切替、設定を記憶
- 📱 **スマホ対応** — 同一 Wi-Fi で `http://[PCのIP]:3000` にアクセス可能
- 🔄 **30秒自動更新** + 手動更新ボタン
- 📊 **Pro / Max 5x / Max 20x** プラン切替（過去実績ベースで上限を自動推定）

---

## 必要な環境

- **Windows**（Mac / Linux 非対応）
- **Node.js 18 以上** → [ダウンロード](https://nodejs.org/)
- **Claude Code を使っていること**（`~/.claude/` にログが溜まっている状態）

---

## インストールと起動

```bash
git clone https://github.com/zeroichi-code/cc-checker.git
cd cc-checker
```

あとは **`起動する.bat` をダブルクリック** するだけ。

- 初回のみ `npm install` が自動で走ります（1〜2分）
- ブラウザが自動で `http://localhost:3000` を開きます
- 2回目以降は数秒で起動します

---

## データソース

[ccusage](https://github.com/ryoppippi/ccusage) CLI が `~/.claude/projects/` 配下の JSONL を解析します。  
**特別な設定・API キーは不要です。** Claude Code を使っていれば自動でデータが表示されます。

---

## 技術スタック

| | |
|---|---|
| フレームワーク | Next.js 14 (App Router) + TypeScript |
| スタイリング | Tailwind CSS |
| データ取得 | SWR（30秒自動更新） |
| データソース | ccusage CLI（`npx ccusage@latest`） |

---

## ライセンス

MIT

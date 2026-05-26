@echo off
chcp 65001 > nul
cd /d %~dp0

echo ============================================
echo   Claude Code 残量チェッカー
echo ============================================
echo.

if not exist node_modules (
  echo [初回セットアップ] 依存パッケージをインストールします...
  echo 数分かかります。完了までお待ちください。
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo [エラー] npm install に失敗しました。
    pause
    exit /b 1
  )
)

echo ブラウザを起動します: http://localhost:3000
start "" http://localhost:3000

echo.
echo 開発サーバを起動中... 終了するにはこのウィンドウを閉じてください。
echo.
call npm run dev

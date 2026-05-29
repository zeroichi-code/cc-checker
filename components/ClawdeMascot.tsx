"use client";

type Props = {
  size?: number;
};

// Clawde ピクセルアート SVG
// viewBox: 11 wide × 9 tall のピクセルグリッド
// ピクセル配置:
//   . . B B B B B B B . .   row 0
//   . . B B B B B B B . .   row 1
//   A A B B o B o B B A A   row 2 (目・腕)
//   A A B B B B B B B A A   row 3 (腕)
//   . . B B B B B B B . .   row 4
//   . . . . B B B . . . .   row 5 (足の間は空白)  ← 実際は左右2本
//   . . . B . . . B . . .   row 5-6
//   . . . B . . . B . . .   row 6-7

export default function ClawdeMascot({ size = 48 }: Props) {
  const c = "#C96644";   // サーモンオレンジ
  const dark = "#111111"; // 目

  return (
    <svg
      width={size}
      height={Math.round(size * 8 / 11)}
      viewBox="0 0 11 8"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 胴体 (x=2〜8, y=0〜4, 7×5) */}
      <rect x="2" y="0" width="7" height="5" fill={c} />
      {/* 左腕 (x=0〜1, y=2〜3) */}
      <rect x="0" y="2" width="2" height="2" fill={c} />
      {/* 右腕 (x=9〜10, y=2〜3) */}
      <rect x="9" y="2" width="2" height="2" fill={c} />
      {/* 左目 */}
      <rect x="3.5" y="1.5" width="1" height="1" fill={dark} />
      {/* 右目 */}
      <rect x="6.5" y="1.5" width="1" height="1" fill={dark} />
      {/* 左脚 */}
      <rect x="3.5" y="5" width="1" height="2" fill={c} />
      {/* 右脚 */}
      <rect x="6.5" y="5" width="1" height="2" fill={c} />
    </svg>
  );
}

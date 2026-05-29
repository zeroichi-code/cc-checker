export type Plan = "pro" | "max5" | "max20";

// Anthropic 公式はトークン数非公開。
// サードパーティ計測: Pro ~44k tokens/5hr (Claude.ai チャット基準)
// Max 5x ($100/月) = Pro × 5、Max 20x ($200/月) = Pro × 20。
// Claude Code は別枠でクレジットベースのため厳密な値は不明。
// ここでは「過去ブロックの最大消費量(baseline)」に係数を掛けた推定上限を使う。
export const PLAN_FACTOR: Record<Plan, number> = {
  pro: 1,
  max5: 5,
  max20: 20,
};

export const PLAN_LABEL: Record<Plan, string> = {
  pro: "Pro",
  max5: "Max 5x",
  max20: "Max 20x",
};

export const PLAN_STORAGE_KEY = "cc-plan";

export function isPlan(v: unknown): v is Plan {
  return v === "pro" || v === "max5" || v === "max20";
}

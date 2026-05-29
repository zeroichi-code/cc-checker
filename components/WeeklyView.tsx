"use client";

export type WeekDay = {
  day: string; // 曜日 (月,火…)
  date: string; // M/D
  tokens: number;
  cost: number;
  isToday: boolean;
};

type Props = {
  week: WeekDay[];
  color?: string;
};

const fmtTokens = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n > 0 ? `${Math.round(n / 1000)}k` : "0";

export default function WeeklyView({ week, color = "#ff9f0a" }: Props) {
  const max = Math.max(1, ...week.map((d) => d.tokens));
  const total = week.reduce((s, d) => s + d.tokens, 0);

  return (
    <div className="rounded-2xl bg-[#1c1c1e] p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-semibold text-white">過去1週間</h3>
          <p className="text-xs text-[#8e8e93] mt-0.5">
            合計 {fmtTokens(total)} tk
          </p>
        </div>
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#2c2c2e] text-[#8e8e93] text-[11px]">
          ›
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {week.map((d, i) => {
          const h = Math.max(4, (d.tokens / max) * 100);
          return (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[10px] text-[#8e8e93] tabular-nums mb-1 h-3">
                {d.tokens > 0 ? fmtTokens(d.tokens) : ""}
              </span>
              <div className="flex items-end h-20 w-full justify-center">
                <div
                  className="w-[60%] rounded-md"
                  style={{
                    height: `${h}%`,
                    background: color,
                    opacity: d.isToday ? 1 : 0.45,
                  }}
                />
              </div>
              <span
                className={`text-[11px] mt-1 ${
                  d.isToday ? "text-white font-semibold" : "text-[#8e8e93]"
                }`}
              >
                {d.day}
              </span>
              <span className="text-[9px] text-[#636366] tabular-nums">
                {d.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

type Props = {
  // grid[dayOfWeek][hour] dayOfWeek: 0=月 ... 6=日
  grid: number[][];
};

const DAYS = ["月", "火", "水", "木", "金", "土", "日"];
const HOUR_LABELS: Record<number, string> = {
  0: "12am", 4: "4am", 8: "8am", 12: "12pm", 16: "4pm", 20: "8pm",
};

export default function HeatmapChart({ grid }: Props) {
  const max = Math.max(1, ...grid.flatMap((d) => d));

  const cellColor = (val: number) => {
    if (val === 0) return "bg-[#2c2c2e] dark:bg-[#2c2c2e] bg-[#e5e5ea]";
    const intensity = val / max;
    if (intensity < 0.25) return "bg-[#1e4d7b] dark:bg-[#1e4d7b] bg-[#bdd7f5]";
    if (intensity < 0.5)  return "bg-[#2563a8] dark:bg-[#2563a8] bg-[#7fb9ee]";
    if (intensity < 0.75) return "bg-[#3b82d4] dark:bg-[#3b82d4] bg-[#3b82d4]";
    return "bg-[#60aff0] dark:bg-[#60aff0] bg-[#1a6bbf]";
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] p-4 shadow-sm dark:shadow-none">
      <div className="mb-3">
        <h3 className="text-[15px] font-semibold text-black dark:text-white">アクティブな時間</h3>
        <p className="text-xs text-[#6c6c70] dark:text-[#8e8e93] mt-0.5">過去28日間</p>
      </div>

      <div className="flex gap-1">
        {/* 時刻ラベル（左） */}
        <div className="flex flex-col justify-between py-0.5 pr-1" style={{ minWidth: 32 }}>
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="text-[9px] text-[#6c6c70] dark:text-[#8e8e93] leading-none" style={{ height: 10 }}>
              {HOUR_LABELS[h] ?? ""}
            </div>
          ))}
        </div>

        {/* グリッド */}
        <div className="flex gap-1 flex-1">
          {grid.map((hours, dow) => (
            <div key={dow} className="flex flex-col gap-0.5 flex-1">
              {hours.map((val, h) => (
                <div
                  key={h}
                  title={`${DAYS[dow]}曜 ${h}時: ${Math.round(val).toLocaleString()} tk`}
                  className={`rounded-[2px] w-full ${cellColor(val)}`}
                  style={{ height: 10 }}
                />
              ))}
              <div className="text-[10px] text-[#6c6c70] dark:text-[#8e8e93] text-center mt-1">
                {DAYS[dow]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 凡例 */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[9px] text-[#8e8e93]">少ない</span>
        <div className="flex gap-0.5">
          {["bg-[#2c2c2e] dark:bg-[#2c2c2e]", "bg-[#1e4d7b]", "bg-[#2563a8]", "bg-[#3b82d4]", "bg-[#60aff0]"].map((c, i) => (
            <div key={i} className={`w-4 h-2 rounded-[2px] ${c}`} />
          ))}
        </div>
        <span className="text-[9px] text-[#8e8e93]">多い</span>
      </div>
    </div>
  );
}

"use client";

import MiniBars from "./MiniBars";

type Props = {
  title: string;
  subLabel?: string;
  value: string;
  unit?: string;
  color: string;
  bars?: { values: number[]; labels?: string[] };
};

export default function MetricCard({
  title,
  subLabel = "今日",
  value,
  unit,
  color,
  bars,
}: Props) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] p-4 shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between">
        <h3 className="text-[15px] font-semibold text-white">
          {title}
        </h3>
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#e5e5ea] dark:bg-[#2c2c2e] text-[#6c6c70] dark:text-[#8e8e93] text-[11px]">
          ›
        </span>
      </div>
      <p className="text-xs text-[#8e8e93] mt-1">{subLabel}</p>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className="text-3xl font-bold tabular-nums text-black dark:text-white">{value}</span>
        {unit && <span className="text-sm font-medium text-[#8e8e93]">{unit}</span>}
      </div>
      {bars && <MiniBars values={bars.values} labels={bars.labels} color={color} />}
    </div>
  );
}

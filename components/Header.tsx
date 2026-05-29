"use client";

import ThemeToggle from "./ThemeToggle";

type Props = {
  isLoading: boolean;
  onRefresh: () => void;
};

function todayLabel() {
  const d = new Date();
  const week = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getMonth() + 1}月${d.getDate()}日 ${week}曜日`;
}

export default function Header({ isLoading, onRefresh }: Props) {
  return (
    <header className="flex items-start justify-between px-1 mb-4">
      <div>
        <h1 className="text-[34px] leading-tight font-bold tracking-tight text-black dark:text-white flex items-center gap-3">
          Token Usage
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mascot.png" alt="Clawde" width={96} height={96} style={{ imageRendering: "pixelated" }} />
        </h1>
        <p className="text-sm text-[#6c6c70] dark:text-[#8e8e93] mt-0.5">{todayLabel()}</p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <ThemeToggle />
        <button
          onClick={onRefresh}
          disabled={isLoading}
          aria-label="更新"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5e5ea] dark:bg-[#2c2c2e] text-[#0a84ff] shadow disabled:opacity-50 active:scale-95 transition"
        >
          <span className={isLoading ? "animate-spin" : ""}>⟳</span>
        </button>
      </div>
    </header>
  );
}

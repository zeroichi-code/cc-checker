"use client";

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
        <h1 className="text-[34px] leading-tight font-bold tracking-tight text-white">
          概要
        </h1>
        <p className="text-sm text-[#8e8e93] mt-0.5">{todayLabel()}</p>
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        aria-label="更新"
        className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#2c2c2e] text-[#0a84ff] shadow disabled:opacity-50 active:scale-95 transition"
      >
        <span className={isLoading ? "animate-spin" : ""}>⟳</span>
      </button>
    </header>
  );
}

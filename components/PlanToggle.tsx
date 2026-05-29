"use client";

import { PLAN_LABEL, type Plan } from "@/lib/plan";

type Props = {
  plan: Plan;
  onChange: (p: Plan) => void;
};

const ITEMS: Plan[] = ["pro", "max5", "max20"];

export default function PlanToggle({ plan, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full bg-[#1c1c1e] p-1">
      {ITEMS.map((key) => {
        const active = key === plan;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
              active ? "bg-[#2c2c2e] text-white" : "text-[#8e8e93]"
            }`}
          >
            {PLAN_LABEL[key]}
          </button>
        );
      })}
    </div>
  );
}

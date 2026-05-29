"use client";

type Props = {
  values: number[];
  color: string;
  labels?: string[];
};

export default function MiniBars({ values, color, labels }: Props) {
  const max = Math.max(1, ...values);
  return (
    <div className="mt-3">
      <div className="flex items-end gap-[3px] h-16">
        {values.map((v, i) => {
          const h = Math.max(3, (v / max) * 100);
          return (
            <div
              key={i}
              className="flex-1 rounded-[2px]"
              style={{
                height: `${h}%`,
                background: color,
                opacity: i === values.length - 1 ? 1 : 0.5,
              }}
              title={labels?.[i]}
            />
          );
        })}
      </div>
      {labels && (
        <div className="flex justify-between mt-1 text-[9px] text-[#636366]">
          <span>{labels[0]}</span>
          <span>{labels[Math.floor(labels.length / 2)]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
}

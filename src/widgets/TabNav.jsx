import React from "react";

export default function TabNav({ tabs, active, onChange }) {
  return (
    <div className="border-b">
      <nav className="flex gap-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={
              "px-4 py-2 text-sm rounded-t-lg border " +
              (active === t.key
                ? "bg-white border-b-white font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200")
            }
            aria-current={active === t.key ? "page" : undefined}
          >
            <span className="mr-1">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

import React from "react";

export default function SmallStat({ label, value }) {
  return (
    <div className="flex flex-col p-3 rounded-2xl bg-gray-100">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}

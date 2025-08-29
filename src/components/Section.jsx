import React from "react";

export default function Section({ title, children }) {
  return (
    <div className="shadow-sm border rounded-2xl">
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

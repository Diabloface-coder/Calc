export function heightToMeters(h, unit) {
  const v = Number(h);
  if (!v || v <= 0) return NaN;
  if (unit === "cm") return v / 100;
  if (unit === "in") return (v * 2.54) / 100;
  return NaN;
}

export function toKg(w, unit) {
  const v = Number(w);
  if (!v || v <= 0) return NaN;
  return unit === "kg" ? v : v * 0.45359237;
}

export function toMgDl(value, unit) {
  const v = Number(value);
  if (!v || v <= 0) return NaN;
  return unit === "mgdl" ? v : v / 88.4; // µmol/L → mg/dL
}

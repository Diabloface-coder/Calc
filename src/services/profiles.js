const PREFIX = "medcalc_";

export function listProfiles() {
  try {
    return Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
  } catch {
    return [];
  }
}

export function saveProfile(name, dataObj) {
  const clean = (name || "").trim();
  const key = clean ? (clean.startsWith(PREFIX) ? clean : PREFIX + clean) : PREFIX + new Date().toISOString();
  localStorage.setItem(key, JSON.stringify(dataObj));
  return key;
}

export function loadProfile(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

import { heightToMeters, toKg, toMgDl } from "./units";

// BMI
export function calcBMI(height, heightUnit, weight, weightUnit) {
  const hM = heightToMeters(height, heightUnit);
  const wKg = toKg(weight, weightUnit);
  if (!hM || !wKg) return NaN;
  return wKg / (hM * hM);
}

export function bmiClassRu(bmi) {
  if (!Number.isFinite(bmi)) return "—";
  if (bmi < 18.5) return "Недостаточная масса";
  if (bmi < 25) return "Норма";
  if (bmi < 30) return "Избыточная масса";
  if (bmi < 35) return "Ожирение I";
  if (bmi < 40) return "Ожирение II";
  return "Ожирение III";
}

// eGFR
function egfrCkdEpiCrea(age, sex, scrMgDl) {
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const minScrK = Math.min(scrMgDl / kappa, 1);
  const maxScrK = Math.max(scrMgDl / kappa, 1);
  const sexFactor = sex === "female" ? 1.012 : 1.0;
  return (
    142 *
    Math.pow(minScrK, alpha) *
    Math.pow(maxScrK, -1.2) *
    Math.pow(0.9938, age) *
    sexFactor
  );
}

function egfrCkdEpiCys(age, sex, cys) {
  const k = 0.8;
  const a = -0.499;
  const minV = Math.min(cys / k, 1);
  const maxV = Math.max(cys / k, 1);
  let val = 133 * Math.pow(minV, a) * Math.pow(maxV, -1.328) * Math.pow(0.996, age);
  if (sex === "female") val *= 0.932;
  return val;
}

function egfrMdrd(age, sex, scrMgDl) {
  let val = 186 * Math.pow(scrMgDl, -1.154) * Math.pow(age, -0.203);
  if (sex === "female") val *= 0.742;
  return val;
}

function crClCockcroft(age, sex, scrMgDl, weight, weightUnit) {
  const W = toKg(weight, weightUnit);
  let crcl = ((140 - age) * W) / (72 * scrMgDl);
  if (sex === "female") crcl *= 0.85;
  return crcl;
}

export function calcEgfr({
                           age,
                           sex,
                           scr,
                           scrUnit,
                           cysC,
                           method, // "ckd-epi-crea" | "ckd-epi-cys" | "mrd" | "cockcroft"
                           weight,
                           weightUnit,
                         }) {
  const A = Number(age);
  const Scr_mgdl = toMgDl(scr, scrUnit);
  const cys = Number(cysC);
  
  if (!A) return NaN;
  
  if (method === "ckd-epi-crea") {
    if (!Scr_mgdl) return NaN;
    return egfrCkdEpiCrea(A, sex, Scr_mgdl);
  }
  if (method === "ckd-epi-cys") {
    if (!cys) return NaN;
    return egfrCkdEpiCys(A, sex, cys);
  }
  if (method === "mrd") {
    if (!Scr_mgdl) return NaN;
    return egfrMdrd(A, sex, Scr_mgdl);
  }
  if (method === "cockcroft") {
    if (!Scr_mgdl) return NaN;
    return crClCockcroft(A, sex, Scr_mgdl, weight, weightUnit);
  }
  return NaN;
}

export function egfrStageRu(gfr) {
  if (!Number.isFinite(gfr)) return "—";
  if (gfr >= 90) return "G1 ≥90 (норма или высокая)";
  if (gfr >= 60) return "G2 60–89 (слегка снижена)";
  if (gfr >= 45) return "G3a 45–59 (умеренно снижена)";
  if (gfr >= 30) return "G3b 30–44 (умеренно тяжело)";
  if (gfr >= 15) return "G4 15–29 (тяжело снижена)";
  return "G5 <15 (почечная недостаточность)";
}

// CHA2DS2-VASc
export function calcCha2ds2Vasc({ hf, htn, dm, strokeTia, vascular, age, sex }) {
  let s = 0;
  if (hf) s += 1;
  if (htn) s += 1;
  if (dm) s += 1;
  if (strokeTia) s += 2;
  if (vascular) s += 1;
  if (age >= 75) s += 2;
  else if (age >= 65) s += 1;
  if (sex === "female") s += 1;
  return s;
}

// HAS-BLED
export function calcHasBled({
                              hbHtn,
                              abnRenal,
                              abnLiver,
                              hbStroke,
                              bleed,
                              labileInr,
                              elderly,
                              drugs,
                              alcohol,
                            }) {
  let s = 0;
  if (hbHtn) s += 1;
  s += (abnRenal ? 1 : 0) + (abnLiver ? 1 : 0);
  if (hbStroke) s += 1;
  if (bleed) s += 1;
  if (labileInr) s += 1;
  if (elderly) s += 1;
  s += (drugs ? 1 : 0) + (alcohol ? 1 : 0);
  return s;
}

export const EHRA_DESC_RU = {
  I: "Нет симптомов",
  II: "Легкие симптомы не нарушают повседневную активность",
  III: "Выраженные симптомы нарушают повседневную активность",
  IV: "Инвалидизирующие симптомы",
};

import React, {useMemo, useState} from 'react'
import Section from '../components/Section.jsx'
import SmallStat from '../components/SmallStat.jsx'
import {calcEgfr, egfrStageRu} from '../utils/calculators.js'

export default function SKF(props) {
  const {
    age,
    sex,
    weight,

  } = props;
  
  const [scr, setScr] = useState(90);
  const [scrUnit, setScrUnit] = useState("umol"); // "umol" | "mgdl"
  const [cysC, setCysC] = useState(0.9);
  
  const [egfrMethod, setEgfrMethod] = useState("ckd-epi-crea"); // "ckd-epi-crea" | "ckd-epi-cys" | "mrd" | "cockcroft"
  
  const egfr = useMemo(
    () =>
      calcEgfr({
        age,
        sex,
        scr,
        scrUnit,
        cysC,
        method: egfrMethod,
        weight,
        weightUnit: 'kg'
      }),
    [age, sex, scr, scrUnit, cysC, egfrMethod, weight]
  );
  const egfrStage = useMemo(() => egfrStageRu(egfr), [egfr]);
  
  return (
    <Section title="СКФ">
      <div className="grid md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm">Креатинин</label>
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-2 w-full"
              type="number"
              min={0}
              step="any"
              value={scr}
              onChange={(e) => setScr(Number(e.target.value))}
            />
            <select
              className="border rounded px-2 py-2"
              value={scrUnit}
              onChange={(e) => setScrUnit(e.target.value)}
            >
              <option value="umol">µmol/L</option>
              <option value="mgdl">mg/dL</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Цистатин C мг л</label>
            <input
              className="border rounded px-2 py-2 w-full"
              type="number"
              min={0}
              step="any"
              value={cysC}
              onChange={(e) => setCysC(Number(e.target.value))}
            />
          </div>
          
          <div className="mt-2">
            <label className="text-sm">Метод расчёта</label>
            <select
              className="border rounded px-2 py-2"
              value={egfrMethod}
              onChange={(e) => setEgfrMethod(e.target.value)}
            >
              <option value="ckd-epi-crea">CKD EPI креатинин</option>
              <option value="ckd-epi-cys">CKD EPI цистатин C</option>
              <option value="mrd">MDRD 4 переменные</option>
              <option value="cockcroft">Cockcroft Gault CrCl</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:col-span-2">
          <SmallStat
            label="СКФ мл мин 1.73м²"
            value={Number.isFinite(egfr) ? Math.round(egfr) : "—"}
          />
          <SmallStat label="Стадия" value={egfrStage} />
        </div>
      </div>
    </Section>
  );
}

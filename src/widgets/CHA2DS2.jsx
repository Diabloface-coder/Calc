import React, {useMemo, useState} from 'react'
import Section from '../components/Section.jsx'
import SmallStat from '../components/SmallStat.jsx'
import {calcCha2ds2Vasc} from '../utils/calculators.js'

export default function CHA2DS2(props) {
  const {
    age,
    sex,
  } = props;
  
  // CHA2DS2-VASc
  const [hf, setHf] = useState(false);
  const [htn, setHtn] = useState(false);
  const [dm, setDm] = useState(false);
  const [strokeTia, setStrokeTia] = useState(false);
  const [vascular, setVascular] = useState(false);
  
  const cha2ds2vasc = useMemo(
    () => calcCha2ds2Vasc({ hf, htn, dm, strokeTia, vascular, age, sex }),
    [hf, htn, dm, strokeTia, vascular, age, sex]
  );
  
  return (
    <Section title="CHA2DS2 VASc">
      <div className="grid md:grid-cols-3 gap-4">
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input type="checkbox" checked={hf} onChange={(e) => setHf(e.target.checked)} />
          <span>Сердечная недостаточность или снижена ФВ ЛЖ</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input type="checkbox" checked={htn} onChange={(e) => setHtn(e.target.checked)} />
          <span>Артериальная гипертензия</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input type="checkbox" checked={dm} onChange={(e) => setDm(e.target.checked)} />
          <span>Сахарный диабет</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={strokeTia}
            onChange={(e) => setStrokeTia(e.target.checked)}
          />
          <span>Инсульт ТИА эмболия в анамнезе</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={vascular}
            onChange={(e) => setVascular(e.target.checked)}
          />
          <span>Сосудистые заболевания ИМ ПАБ</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <SmallStat label="Баллы" value={cha2ds2vasc} />
          <SmallStat label="Пол" value={sex === "female" ? "+1" : "+0"} />
        </div>
      </div>
    </Section>
  );
}

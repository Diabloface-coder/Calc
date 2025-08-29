import React, {useMemo, useState} from 'react'
import Section from '../components/Section.jsx'
import SmallStat from '../components/SmallStat.jsx'
import {calcHasBled} from '../utils/calculators.js'


export default function HAS_BLED(props) {
  const {
    age,
  } = props;
  
  // HAS-BLED
  const [hbHtn, setHbHtn] = useState(false);
  const [abnRenal, setAbnRenal] = useState(false);
  const [abnLiver, setAbnLiver] = useState(false);
  const [hbStroke, setHbStroke] = useState(false);
  const [bleed, setBleed] = useState(false);
  const [labileInr, setLabileInr] = useState(false);
  const [elderly, setElderly] = useState(age > 65);
  const [drugs, setDrugs] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  
  const hasbled = useMemo(
    () =>
      calcHasBled({
        hbHtn,
        abnRenal,
        abnLiver,
        hbStroke,
        bleed,
        labileInr,
        elderly,
        drugs,
        alcohol,
      }),
    [hbHtn, abnRenal, abnLiver, hbStroke, bleed, labileInr, elderly, drugs, alcohol]
  );
  return (
    <Section title="HAS BLED">
      <div className="grid md:grid-cols-3 gap-4">
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hbHtn}
            onChange={(e) => setHbHtn(e.target.checked)}
          />
          <span>Гипертензия систолическое выше 160</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={abnRenal}
            onChange={(e) => setAbnRenal(e.target.checked)}
          />
          <span>Почечная дисфункция</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={abnLiver}
            onChange={(e) => setAbnLiver(e.target.checked)}
          />
          <span>Печёночная дисфункция</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hbStroke}
            onChange={(e) => setHbStroke(e.target.checked)}
          />
          <span>Инсульт в анамнезе</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input type="checkbox" checked={bleed} onChange={(e) => setBleed(e.target.checked)} />
          <span>Кровотечения или предрасположенность</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={labileInr}
            onChange={(e) => setLabileInr(e.target.checked)}
          />
          <span>Лабильный МНО если на варфарине</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={elderly}
            onChange={(e) => setElderly(e.target.checked)}
          />
          <span>Старше 65 лет</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input type="checkbox" checked={drugs} onChange={(e) => setDrugs(e.target.checked)} />
          <span>Препараты антиагреганты НПВС</span>
        </label>
        <label className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={alcohol}
            onChange={(e) => setAlcohol(e.target.checked)}
          />
          <span>Алкоголь злоупотребление</span>
        </label>
        <div className="grid grid-cols-2 gap-3 md:col-span-3">
          <SmallStat label="Баллы" value={hasbled} />
          <SmallStat
            label="Интерпретация"
            value={hasbled >= 3 ? "Высокий риск 3 и более" : "Низкий или умеренный ниже 3"}
          />
        </div>
      </div>
    </Section>
  );
}

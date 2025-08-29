import React, {useMemo} from 'react'
import Section from '../components/Section.jsx'
import SmallStat from '../components/SmallStat.jsx'
import {bmiClassRu, calcBMI} from '../utils/calculators.js'

export default function Massa(props) {
  const {
    age,
    sex,
    height,
    weight,
    setAge,
    setSex,
    setHeight,
    setWeight,
    setElderly
  } = props;

  // вычисления
  const bmi = useMemo(
    () => calcBMI(height, 'cm' , weight, 'kg'),
    [height, weight]
  );
  const bmiClass = useMemo(() => bmiClassRu(bmi), [bmi]);
  
  return (
    <div className="border rounded-2xl">
      <div className="p-5 grid md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm">Возраст лет</label>
          <input
            className="border rounded px-2 py-2 w-full"
            type="number"
            min={0}
            value={age}
            onChange={(e) => {
              const v = Number(e.target.value);
              setAge(v);
              setElderly(v > 65);
            }}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Пол</label>
          <select
            className="border rounded px-2 py-2 w-full"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Рост</label>
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-2 w-full"
              type="number"
              min={0}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Масса</label>
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-2 w-full"
              type="number"
              min={0}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      
      <Section title="ИМТ">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="grid grid-cols-2 gap-3">
            <SmallStat label="ИМТ" value={Number.isFinite(bmi) ? bmi.toFixed(1) : "—"} />
            <SmallStat label="Класс" value={bmiClass} />
          </div>
        </div>
      </Section>
    </div>
  );
}

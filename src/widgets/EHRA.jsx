import React, { useState} from 'react'
import Section from '../components/Section.jsx'
import SmallStat from '../components/SmallStat.jsx'
import { EHRA_DESC_RU} from '../utils/calculators.js'

export default function EHRA() {
  // EHRA
  const [ehra, setEhra] = useState("I"); // "I" | "II" | "III" | "IV"
  
  return (
    <Section title="EHRA">
      <div className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          {["I", "II", "III", "IV"].map((cls) => (
            <label key={cls} className="p-3 rounded-2xl border cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  checked={ehra === cls}
                  onChange={() => setEhra(cls)}
                />
                <span>{cls}</span>
              </div>
              <div className="text-sm text-gray-600">{EHRA_DESC_RU[cls]}</div>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SmallStat label="Класс EHRA" value={ehra} />
          <SmallStat label="Описание" value={EHRA_DESC_RU[ehra]} />
        </div>
      </div>
    </Section>
  );
}

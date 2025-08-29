import React, {  useState } from "react";
import CHA2DS2 from '../widgets/CHA2DS2.jsx'
import EHRA from '../widgets/EHRA.jsx'
import HAS_BLED from '../widgets/HAS_BLED.jsx'
import Massa from '../widgets/Massa.jsx'
import SKF from '../widgets/SKF.jsx'

export default function Calculator() {
  // базовые данные
  const [age, setAge] = useState(70);
  const [sex, setSex] = useState("male"); // "male" | "female"
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(80);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">
          Медкалькулятор ИМТ СКФ CHA2DS2 VASc HAS BLED EHRA
        </h1>
      </div>
      
      <Massa
        age={age}
        sex={sex}
        height={height}
        weight={weight}
        setAge={setAge}
        setSex={setSex}
        setHeight={setHeight}
        setWeight={setWeight}
      />
      
      <SKF
        age={age}
        sex={sex}
        weight={weight}
      />

      <CHA2DS2
        age={age}
        sex={sex}
      />
      
      <HAS_BLED
        age={age}
      />
      
      <EHRA/>
      
    </div>
  );
}

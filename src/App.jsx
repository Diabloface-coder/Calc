import React, { useEffect, useMemo, useState } from "react";
import Calculator from "./pages/Calculator.jsx";
import About from "./pages/About.jsx";
import TabNav from './widgets/TabNav.jsx'

const TABS = [
  { key: "calc", label: "Калькулятор", icon: "🧮", component: Calculator },
  { key: "about", label: "О приложении", icon: "ℹ️", component: About },
];

function getInitialTab() {
  const hash = window.location.hash.replace("#", "");
  return TABS.some((t) => t.key === hash) ? hash : "calc";
}

export default function App() {
  const [active, setActive] = useState(getInitialTab);
  
  useEffect(() => {
    const onHashChange = () => {
      const key = window.location.hash.slice(1);
      if (TABS.some((t) => t.key === key)) setActive(key);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  
  useEffect(() => {
    window.location.hash = active;
  }, [active]);
  
  const ActivePage = useMemo(
    () => TABS.find((t) => t.key === active).component,
    [active]
  );
  
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <TabNav tabs={TABS} active={active} onChange={setActive} />
      <div className="mt-6">
        <ActivePage />
      </div>
    </div>
  );
}

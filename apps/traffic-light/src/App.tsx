import { useEffect, useState } from "react";
import { Pole } from "./components/Pole";
import { TrafficLight } from "./components/TrafficLight/TrafficLight";
import "./index.css";

const PHASES = [
  { name: "RED", duration: 3000 },
  { name: "GREEN", duration: 6000 },
  { name: "GREEN_BLINK", duration: 3000 },
  { name: "RED2", duration: 3000 },
];

function App() {
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const phase = PHASES[phaseIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASES.length);
    }, phase.duration);

    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <video
          src={`${import.meta.env.BASE_URL}/traffic-light.MOV`}
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        className="grain"
        style={{
          flex: 1,
          position: "relative",
          width: "50%",
          height: "100%",
          left: "auto",
          top: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            position: "relative",
          }}
        >
          <Pole />
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              transform: "translateX(15%)",
            }}
          >
            <TrafficLight phase={phase.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

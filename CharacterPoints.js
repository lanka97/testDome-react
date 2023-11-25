import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function CharacterAttributes({ totalPoints }) {
  const [remaining, setRemaining] = useState(totalPoints);
  const [health, setHealth] = useState(0);
  const [stamina, setStamina] = useState(0);
  const [speed, setSpeed] = useState(0);

  const onAttributeChange = (type, value) => {
    switch (type) {
      case "health":
        if (totalPoints === 1 && stamina == 0 && speed == 0 && value == 1) {
          setHealth(value);
        }
        if (
          value <= Math.floor(totalPoints * 0.7) &&
          value + stamina + speed <= Math.floor(totalPoints)
        ) {
          setHealth(value);
        }
        break;
      case "stamina":
        if (totalPoints === 1 && health == 0 && speed == 0 && value == 1) {
          setStamina(value);
        }
        if (
          value <= Math.floor(totalPoints * 0.7) &&
          health + value + speed <= Math.floor(totalPoints)
        ) {
          setStamina(value);
        }
        break;
      case "speed":
        if (totalPoints === 1 && health == 0 && stamina == 0 && value == 1) {
          setSpeed(value);
        }
        if (
          value <= Math.floor(totalPoints * 0.7) &&
          health + stamina + value <= Math.floor(totalPoints)
        ) {
          setSpeed(value);
        }

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setRemaining(totalPoints - (health + stamina + speed));
  }, [health, stamina, speed]);

  return (
    <div>
      Character stats: <span id="points">{remaining}</span> points left.
      <div>
        <input
          type="range"
          id="health"
          min="0"
          max={totalPoints}
          value={health}
          step="1"
          onChange={(e) =>
            onAttributeChange("health", parseInt(e.target.value, 10))
          }
        />
        Health
      </div>
      <div>
        <input
          type="range"
          id="stamina"
          min="0"
          max={totalPoints}
          value={stamina}
          step="1"
          onChange={(e) =>
            onAttributeChange("stamina", parseInt(e.target.value, 10))
          }
        />
        Stamina
      </div>
      <div>
        <input
          type="range"
          id="speed"
          min="0"
          max={totalPoints}
          value={speed}
          step="1"
          onChange={(e) =>
            onAttributeChange("speed", parseInt(e.target.value, 10))
          }
        />
        Speed
      </div>
    </div>
  );
}

document.body.innerHTML = "<div id='root'></div>";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CharacterAttributes totalPoints={1} />);

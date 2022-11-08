import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
// import AnimationBox from "../component/AnimationBox";
import CarShow from "./component/CarShow";
import CarSelector from "./component/CarSelector";
import { useState } from "react";
import { cars } from "./constants";

function App() {
  const [SelectedCar, setSelectedCar] = useState({
    name: "Lamborgini ",
    scale: [1, 1, 1],
    value: "latestlowlamb",
  });
  const [SelectedCarvalue, setSelectedCarvalue] = useState("latestlowlamb");

  const handlechange = (e) => {
    for (const car of cars) {
      if (car.value === e.target.value) {
        setSelectedCar(car);
        setSelectedCarvalue(car.value);
      }
    }
  };
  return (
    <div className="App">
      <div className="appcontainer">
        {/* canvs is the container for our scene so make sure all 3d work should be done inside this canvas */}
        <Canvas shadows>
          <CarShow selectedCar={SelectedCar} />
        </Canvas>
      </div>
      <CarSelector
        SelectedCarvalue={SelectedCarvalue}
        handleChange={handlechange}
      />
    </div>
  );
}

export default App;

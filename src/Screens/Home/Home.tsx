import { useState } from "react";
import "./Home.css";
import CustomLabel from "../../Components/CustomLabel/CustomLabel";

function App() {
  const [count, setCount] = useState<number>(0);

    const addCount = () => {
      setCount((count) => count + 1);
    };
    
  return (
    <div className="App">
      <CustomLabel info={"Contador = " + count} />
      <button onClick={() => addCount()}> Add Info</button>
    </div>
  );
}

export default App;

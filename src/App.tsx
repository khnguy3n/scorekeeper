import { createSignal } from "solid-js";
import "./App.css";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
        </div>
      </section>
    </>
  );
}

export default App;

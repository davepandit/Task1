import { useState } from "react";
import PokemonList from "./pages/PokemonList";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PokemonList />
    </>
  );
}

export default App;

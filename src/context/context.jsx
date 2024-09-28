import { createContext } from "react";
import { useState } from "react";

export const context = createContext(null);

export const ContextProvider = (props) => {
  //an array to store the selected pokemons
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [count, setCount] = useState(0); //this is to choose how many pokemons to choose for the battle
  return (
    <context.Provider
      value={{ selectedPokemons, setSelectedPokemons, count, setCount }}
    >
      {props.children}
    </context.Provider>
  );
};

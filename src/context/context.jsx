import { createContext } from "react";
import { useState } from "react";

export const context = createContext(null);

export const ContextProvider = (props) => {
  //an array to store the selected pokemons
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  return (
    <context.Provider value={{ selectedPokemons, setSelectedPokemons }}>
      {props.children}
    </context.Provider>
  );
};

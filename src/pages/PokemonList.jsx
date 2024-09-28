import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PokCard from "../components/PokCard";

const PokemonList = () => {
  //make request using axios
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=15"
        );
        const pokemons = response.data.results;

        // Fetch details for each Pokémon
        const pokemonDetailsPromises = pokemons.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const pokemonDetailsResponses = await Promise.all(
          pokemonDetailsPromises
        );
        const detailedPokemons = pokemonDetailsResponses.map((res) => res.data);

        setPokemons(detailedPokemons);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    <div>Loading......</div>;
  }
  if (error) {
    <div>{error}</div>;
  }
  return (
    <>
      <div className="flex justify-center mt-3">
        <span className=" font-bold text-xl bg-yellow-200 p-1">
          Pokemon List
        </span>
      </div>
      <div className="grid grid-cols-3 max-w-[1600px] w-auto gap-y-11 pl-11 pr-11 mt-9 mb-9">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name}>
            <PokCard
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              pokemon={pokemon}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PokemonList;

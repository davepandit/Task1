import React, { useState, useEffect } from "react";
import axios from "axios";
import PokCard from "../components/PokCard";

const PokemonList = () => {
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

        // Fetch details for each Pokémon including species for additional details
        const pokemonDetailsPromises = pokemons.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const speciesResponse = await axios.get(
            pokemonResponse.data.species.url
          );
          return {
            ...pokemonResponse.data,
            color: speciesResponse.data.color.name,
            shape: speciesResponse.data.shape.name,
            eggGroups: speciesResponse.data.egg_groups
              .map((group) => group.name)
              .join(", "), // Joining egg groups into a string
            location_area: speciesResponse.data.habitat?.name || "N/A", // Assuming you want the habitat
          };
        });

        const detailedPokemons = await Promise.all(pokemonDetailsPromises);
        setPokemons(detailedPokemons);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <div>Loading......</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex justify-center mt-3">
        <span className="font-bold text-xl bg-yellow-200 p-1">
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

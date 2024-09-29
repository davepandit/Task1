import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { context } from "../context/context";
import { useContext } from "react";
import Battle from "./Battle";

export default function PokCard({ image, name, pokemon }) {
  //set the context
  const pokemons = useContext(context);
  //this pokemon can be used to access the state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //battle modal
  const [battleModal, setBattleModal] = useState(false);

  //state to check whether the pokemon has been selected or not
  const [pokemonChosen, setPokemonChosen] = useState(false);

  // Play the cry sound
  const playSound = () => {
    const audio = new Audio(`https://pokemoncries.com/cries/${pokemon.id}.mp3`);
    audio.play();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const insertPokemonsIntoArray = (pokemon) => {
    //first change the background color
    setPokemonChosen((prev) => !prev);
    //here need to keep some check if the user selects the same pokemon again then remove from the list

    const exists = pokemons.selectedPokemons.some(
      (existingPokemon) => existingPokemon.name === pokemon.name
    );
    if (!exists) {
      pokemons.setSelectedPokemons((prev) => [...prev, pokemon]);
      pokemons.setCount((prev) => prev + 1);
    } else {
      const updatedPokemons = pokemons.setSelectedPokemons.filter(
        (pokemon) => existingPokemon.name !== pokemon.name
      );
      pokemons.setCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    console.log(`Selected Pokemons:${pokemons.selectedPokemons}`);
  }, [pokemons]);

  useEffect(() => {
    if (pokemons.count == 2) {
      //set the state of the modal to open
      setBattleModal(true);
    }
  }, [pokemons]);

  const closeBattleModal = () => {
    setBattleModal(false); // This will close the modal first
  };

  // Clear selectedPokemons when the modal closes
  useEffect(() => {
    if (!battleModal) {
      pokemons.setSelectedPokemons([]);
      console.log("Selected Pokémon cleared");
    }
  }, [battleModal]);

  return (
    <>
      <Card
        sx={{
          width: 345,
          backgroundColor: pokemonChosen ? "#f2f5b5" : "white",
        }}
      >
        <CardMedia component="img" alt={name} height="120" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={playSound}>
            Cry Sound
          </Button>
          <Button size="small" onClick={openModal}>
            See More
          </Button>
          <Button size="small" onClick={() => insertPokemonsIntoArray(pokemon)}>
            Select
          </Button>
        </CardActions>
      </Card>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className="text-center text-2xl font-bold">{pokemon.name}</h2>
        <p className="font-semibold text-lg">
          Height: {pokemon.height} decimeters
        </p>
        <p className="font-semibold text-lg">
          Weight: {pokemon.weight} hectograms
        </p>
        <p className="font-semibold text-lg">Color: {pokemon.color}</p>
        <p className="font-semibold text-lg">Shape: {pokemon.shape}</p>
        <p className="font-semibold text-lg">
          Location: {pokemon.location_area}
        </p>
        <p className="font-semibold text-lg">Egg Groups: {pokemon.eggGroups}</p>

        <p className="font-semibold text-lg">Base Stats:</p>
        <ul className="list-disc ml-5">
          <li>
            HP:{" "}
            {pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat}
          </li>
          <li>
            Attack:{" "}
            {
              pokemon.stats.find((stat) => stat.stat.name === "attack")
                .base_stat
            }
          </li>
          <li>
            Defense:{" "}
            {
              pokemon.stats.find((stat) => stat.stat.name === "defense")
                .base_stat
            }
          </li>
          <li>
            Speed:{" "}
            {pokemon.stats.find((stat) => stat.stat.name === "speed").base_stat}
          </li>
        </ul>

        <p className="font-semibold text-lg">Abilities:</p>
        <ul className="list-disc ml-5">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>

        <p className="font-semibold text-lg">Moves:</p>
        <ul className="list-disc ml-5">
          {pokemon.moves.slice(0, 5).map((move) => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>

        <button
          onClick={closeModal}
          className="bg-blue-200 rounded-2xl px-4 py-1 hover:opacity-55 duration-300 ease-in-out"
        >
          Close
        </button>
      </Modal>

      {/* battle modal  */}
      {pokemons.selectedPokemons.length == 2 ? (
        <Modal isOpen={battleModal} onRequestClose={closeBattleModal}>
          <h2 className="text-center text-2xl font-bold">Battle Time!</h2>
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              {pokemons?.selectedPokemons?.map((selectedPok, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Typography variant="h6">{selectedPok.name}</Typography>
                  <Typography variant="h6">{selectedPok.eggGroups}</Typography>
                  <CardMedia
                    component="img"
                    alt={selectedPok}
                    height="120"
                    image={selectedPok.sprites.front_default} // Adjust the image source as necessary
                  />
                </div>
              ))}
            </div>
            {/* damage calculation aomponent can come here  */}
            <Battle
              pokemon1Data={pokemons.selectedPokemons[0]}
              pokemon2Data={pokemons.selectedPokemons[1]}
            />
          </div>
          <button
            onClick={closeBattleModal}
            className="bg-blue-200 rounded-2xl px-4 py-1 hover:opacity-55 duration-300 ease-in-out mt-9"
          >
            Close
          </button>
        </Modal>
      ) : null}
    </>
  );
}

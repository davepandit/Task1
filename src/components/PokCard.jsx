import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "react-modal";
import { useState } from "react";

export default function PokCard({ image, name, pokemon }) {
  console.log(pokemon);
  //play the cry sound
  const playSound = () => {
    const audio = new Audio(`https://pokemoncries.com/cries/${pokemon.id}.mp3`);
    audio.play();
  };

  //modal state and all
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <Card sx={{ width: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="120"
          image={image}
        />
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
          {pokemon.moves.slice(0, 5).map(
            (
              move // Displaying only the first 5 moves
            ) => (
              <li key={move.move.name}>{move.move.name}</li>
            )
          )}
        </ul>

        <p className="font-semibold text-lg">
          Location: {pokemon.location_area ? pokemon.location_area.name : "N/A"}
        </p>
        {/* <p className="font-semibold text-lg">
          Egg Groups: {pokemon.egg_groups.map((group) => group.name).join(", ")}
        </p> */}

        <button
          onClick={closeModal}
          className="bg-blue-200 rounded-2xl px-4 py-1 hover:opacity-55 duration-300 ease-in-out"
        >
          Close
        </button>
      </Modal>
    </>
  );
}

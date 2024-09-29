import React, { useState, useEffect } from "react";

const Battle = ({ pokemon1Data, pokemon2Data }) => {
  const [pokemon1Move, setPokemon1Move] = useState(null);
  const [pokemon2Move, setPokemon2Move] = useState(null);
  const [battleResult, setBattleResult] = useState("");
  const [pokemon1MoveInfo, setPokemon1MoveInfo] = useState("");
  const [pokemon2MoveInfo, setPokemon2MoveInfo] = useState("");
  const [damageResults, setDamageResults] = useState({
    damage1: null,
    damage2: null,
  });
  const [winner, setWinner] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const fetchMoveDetails = async (moveUrl, setMoveData) => {
    try {
      const response = await fetch(moveUrl);
      const data = await response.json();
      setMoveData(data);
    } catch (error) {
      console.error("Error fetching move details:", error);
    }
  };

  const selectRandomMove = (pokemon, setMoveData, setMoveInfo) => {
    if (!pokemon || !pokemon.moves || pokemon.moves.length === 0) {
      console.error("Invalid Pokémon data or no moves available.");
      return;
    }

    const randomMove =
      pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)];
    console.log(`Selected move for ${pokemon.name}: ${randomMove.move.name}`);
    setMoveInfo(`${pokemon.name} selected ${randomMove.move.name}`);
    fetchMoveDetails(randomMove.move.url, setMoveData);
  };

  const calculateDamage = (attacker, defender, move) => {
    const level = 50;
    const attackStat = attacker.stats.find(
      (stat) => stat.stat.name === "attack"
    ).base_stat;
    const defenseStat = defender.stats.find(
      (stat) => stat.stat.name === "defense"
    ).base_stat;
    const power = move.power || 50;
    const typeEffectiveness = 2.0; // Simplified for now
    const accuracy = move.accuracy ? move.accuracy / 100 : 1.0;
    const speedFactor =
      attacker.stats.find((stat) => stat.stat.name === "speed").base_stat / 100;

    const damage =
      ((2 * level) / 5 + 2) *
      (attackStat / defenseStat) *
      power *
      typeEffectiveness *
      accuracy *
      speedFactor;
    return Math.round(damage);
  };

  const handleAttack1 = () => {
    if (pokemon1Data) {
      selectRandomMove(pokemon1Data, setPokemon1Move, setPokemon1MoveInfo);
    } else {
      console.error("Pokemon 1 data not available yet.");
    }
  };

  const handleAttack2 = () => {
    if (pokemon2Data) {
      selectRandomMove(pokemon2Data, setPokemon2Move, setPokemon2MoveInfo);
    } else {
      console.error("Pokemon 2 data not available yet.");
    }
  };

  const evaluateBattle = () => {
    if (pokemon1Move && pokemon2Move) {
      const damage1 = calculateDamage(pokemon1Data, pokemon2Data, pokemon1Move);
      const damage2 = calculateDamage(pokemon2Data, pokemon1Data, pokemon2Move);

      setDamageResults({ damage1, damage2 });

      // Determine the winner
      const winnerName =
        damage1 > damage2 ? pokemon1Data.name : pokemon2Data.name;
      setWinner(winnerName);

      setBattleResult(
        `${pokemon1Data.name} dealt ${damage1} damage to ${pokemon2Data.name}, and ${pokemon2Data.name} dealt ${damage2} damage to ${pokemon1Data.name}.`
      );

      // Show summary after a brief delay
      setShowSummary(true);
    }
  };

  // Automatically evaluate the battle when both moves are selected
  useEffect(() => {
    if (pokemon1Move && pokemon2Move) {
      evaluateBattle();
    }
  }, [pokemon1Move, pokemon2Move]);

  if (!pokemon1Data || !pokemon2Data) {
    return <p>Loading Pokémon data...</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          onClick={handleAttack1}
          className="bg-blue-200 rounded-2xl px-4 py-1 hover:opacity-55 duration-300 ease-in-out"
        >
          Attack 1
        </button>
        <button
          onClick={handleAttack2}
          className="bg-blue-200 rounded-2xl px-4 py-1 hover:opacity-55 duration-300 ease-in-out"
        >
          Attack 2
        </button>
      </div>

      <div className="mt-4">
        {pokemon1MoveInfo && (
          <p className="bg-yellow-100 p-2 rounded">{pokemon1MoveInfo}</p>
        )}
        {pokemon2MoveInfo && (
          <p className="bg-yellow-100 p-2 rounded">{pokemon2MoveInfo}</p>
        )}
      </div>

      {showSummary && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg shadow-md transition-opacity duration-500 ease-in-out opacity-100">
          <h2 className="text-xl font-bold">Battle Summary</h2>
          <p className="mt-2">{battleResult}</p>
          <h3 className="mt-4 font-bold text-lg">Winner: {winner}</h3>
          <h4 className="mt-2 text-sm">
            Moves Used:
            <br />
            {pokemon1Data.name}: {pokemon1Move.name}
            <br />
            {pokemon2Data.name}: {pokemon2Move.name}
          </h4>
          <h4 className="mt-2 text-sm">
            Damage Caused:
            <br />
            {pokemon1Data.name}: {damageResults.damage1}
            <br />
            {pokemon2Data.name}: {damageResults.damage2}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Battle;

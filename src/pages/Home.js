import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";

import styled from "styled-components";
import { motion } from "framer-motion";

import Game from "../components/Game";
import GameDetail from "../components/GameDetail";

const Home = () => {
  //get the current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  let { id } = useParams();

  useEffect(() => {
    id
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [id]);

  //fetch games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  const { popular, newGames, upcoming } = useSelector((state) => state.games);

  return (
    <div>
      <GameList>
        {pathId && <GameDetail />}
        <h2>Upcoming Games</h2>
        <Games>
          {upcoming.map((game) => (
            <Game
              key={game.id}
              image={game.background_image}
              name={game.name}
              released={game.released}
              id={game.id}
            />
          ))}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popular.map((game) => (
            <Game
              key={game.id}
              image={game.background_image}
              name={game.name}
              released={game.released}
              id={game.id}
            />
          ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames.map((game) => (
            <Game
              key={game.id}
              image={game.background_image}
              name={game.name}
              released={game.released}
              id={game.id}
            />
          ))}
        </Games>
      </GameList>
    </div>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home;

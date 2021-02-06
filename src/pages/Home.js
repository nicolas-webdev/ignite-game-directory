import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";

import styled from "styled-components";
import { fadeIn } from "../animations";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

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
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );

  return (
    <div>
      <GameList variants={fadeIn} initial="hidden" animate="show">
        <AnimateSharedLayout type="crossfade">
          <AnimatePresence>
            {pathId && <GameDetail pathId={pathId} />}
          </AnimatePresence>
          {searched?.length > 0 && (
            <div className="searched">
              <h2>Searched Games</h2>
              <Games>
                {searched.map((game) => (
                  <Game
                    key={game.id}
                    image={game.background_image}
                    name={game.name}
                    released={game.released}
                    id={game.id}
                  />
                ))}
              </Games>
            </div>
          )}
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
        </AnimateSharedLayout>
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

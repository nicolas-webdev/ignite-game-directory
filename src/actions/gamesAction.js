import axios from "axios";
import { popularGamesURL } from "../api";

//Action Creators

export const loadGames = () => async (dispatch) => {
  //fetch axios
  const popularData = await axios.get(popularGamesURL());
  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popular: popularData,
    },
  });
};

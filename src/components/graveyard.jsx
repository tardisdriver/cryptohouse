import React, { useEffect, useState } from "react";
// import * as s from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import styled from "styled-components";
import "../styles/player.css";

export const MainGraveyardContainer = styled.div`
  background-image: url("/config/images/lexiskullgraveyard1.png");
  background-size: contain;
  background-repeat: no-repeat;
  border: 4px solid grey;
  border-radius: 5px;
  margin: 10px 30px;
  width: 90vw;
  max-width: 1200px;
  height: 650px;
  position: relative;
  overflow: hidden;
`;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: purple;
  padding: 10px;
  font-weight: bold;
  font-size: 26px;
  color: var(--secondary-text);
  width: 300px;
  height: auto;
  cursor: pointer;

  :hover {
    background-color: #8835d4;
  }
`;

export default function Graveyard() {
  const dispatch = useDispatch();
  const [showPlayer, setShowPlayer] = useState(0);
  const blockchain = useSelector((state) => state.blockchain);

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <MainGraveyardContainer>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          dispatch(connect());
          getData();
        }}
      >
        CONNECT METAMASK
      </StyledButton>
      <div
        style={{
          color: "white",
          fontSize: "35px",
          position: "absolute",
          top: "290px",
          left: "0px",
          height: "300px",
          width: "190px",
          cursor: "pointer",
        }}
        onClick={() =>
          showPlayer === 0 ? setShowPlayer(true) : setShowPlayer(false)
        }
      ></div>
      <div
        id="player"
        style={{
          height: "100px",
          position: "absolute",
          bottom: "0",
          right: "-340px",
          width: "340px",
          backgroundImage: "url('/config/images/player-border.png')",
          transition: "5s",
        }}
        className={showPlayer ? "slide" : ""}
      >
        <iframe
          style={{ position: "absolute", bottom: "0", right: "20px" }}
          src="https://open.spotify.com/embed/playlist/1BPSgArvcY0nNkQY1Vax40"
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    </MainGraveyardContainer>
  );
}

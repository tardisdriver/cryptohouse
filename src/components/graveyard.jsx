import React, { useEffect, useState } from "react";
// import * as s from "../styles/globalStyles";
import styled from "styled-components";
// import ReactJkMusicPlayer from "react-jinke-music-player";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import "react-jinke-music-player/assets/index.css";

export const MainGraveyardContainer = styled.div`
  background-image: url("/config/images/graveyard-placeholder.jpeg");
  border: 4px solid grey;
  border-radius: 5px;
  margin: 10px 30px;
  width: 90vw;
  max-width: 1200px;
  height: 700px;
`;

// const audioList1

const AUTH_TOKEN =
  " BQAsuHGPn6IQNOE4fsRnvFnd971RqHoN9IJllyLzcWaNhDTKpooK4ByNdv-M5NUbIyKYPezoZg-UVzx3At6XijIBgzCgI4ZM8VA5PBGjAoLAeSrHEdpB0Crcm7BmPmt_hn14YTCtUA3qvZhXo9liTMgN7otPeFSUVsk";

// const options = {
//   audioLists: audioList1,
//   theme: "dark",
// };

export default function Graveyard() {
  const getOAuthToken = useCallback((callback) => callback(AUTH_TOKEN), []);
  return (
    <MainGraveyardContainer>
      <div
        style={{
          color: "white",
          fontSize: "35px",
          position: "absolute",
          top: "700px",
          left: "145px",
          border: "1px solid white",
          height: "370px",
          width: "190px",
        }}
      ></div>
      {/* <ReactJkMusicPlayer {...options} /> */}
      <div>
        {/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}
        <WebPlaybackSDK
          deviceName="My awesome Spotify app"
          getOAuthToken={getOAuthToken}
          volume={0.5}
        >
          {/* `TogglePlay` and `SongTitle` will be defined later. */}
          <TogglePlay />
          <SongTitle />
        </WebPlaybackSDK>
      </div>
    </MainGraveyardContainer>
  );
}

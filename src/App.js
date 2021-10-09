import React, { useState } from "react";
import { Link } from "react-scroll";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

import Main from "../src/components/main";

export const StyledLogo = styled.img`
  width: 350px;
  @media (min-width: 767px) {
    width: 600px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: #9f48ee;
  font-size: 18px;
  text-decoration: none;
`;

export const BodyTextContainer = styled.div`
  padding: 20px 70px;
  color: lightgrey;
  font-size: 22px;
  width: 100%;
  @media only screen and (min-width: 280px) and (max-width: 767px) {
    padding: 15px;
  }
`;

export const BodyText = styled.div`
  font-size: 18px;
  color: white;
  padding: 10px 0;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  background-image: url("/config/images/footerimage.png");
  background-size: cover;
`;

export const GiveawayButton = styled.a`
  padding: 10px 15px;
  color: white;
  background-color: #07ad31;
  border-radius: 4px;
  margin-right: auto;
  margin-left: auto;
  text-decoration: none;
  font-size: 26px;
  margin-top: 25px;
  margin-bottom: 15px;
`;

function App() {
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "black" }}
      >
        <StyledLogo alt={"logo"} src={"/config/images/lexiskullslogo.png"} />
        <s.SpacerSmall />
        <s.Container
          fd={"row"}
          jc={"center"}
          style={{ width: "100%", margin: "0 auto" }}
        >
          <a
            href="https://twitter.com/LexiSkulls"
            target="_blank"
            style={{ paddingRight: "40px" }}
          >
            <img src="/config/images/logo-twitter.png" />
          </a>
          <a
            href="https://discord.gg/yb6ycJBw3y"
            target="_blank"
            style={{ paddingRight: "40px" }}
          >
            <img src="/config/images/discord-icon.png" />
          </a>
          <a href="https://t.me/lexiskulls" target="_blank">
            <img src="/config/images/tg.png" />
          </a>
        </s.Container>
        <s.SpacerSmall />
        <div style={{ width: "100vw", maxWidth: "90vw", overflowX: "hidden" }}>
          <div id="fog-container">
            <div id="foglayer_01" className="fog">
              <div className="image01"></div>
              <div className="image02"></div>
            </div>
            <div id="foglayer_02" className="fog">
              <div className="image01"></div>
              <div className="image02"></div>
            </div>
            <div id="foglayer_03" className="fog">
              <div className="image01"></div>
              <div className="image02"></div>
            </div>
          </div>
        </div>
        <div id="floating-skulls">
          <img className="floating" height="80%" src="/config/images/1-1.png" />
          <img className="floating" height="80%" src="/config/images/1-2.png" />
          <img className="floating" height="80%" src="/config/images/1-3.png" />
          <img className="floating" height="80%" src="/config/images/1-4.png" />
        </div>
        <s.Container>
          <GiveawayButton
            className="e-widget no-button"
            href="https://gleam.io/Slk0P/lexiskulls-free-nft-giveaway-1"
            rel="nofollow"
            target="_blank"
          >
            Click Here For Lexiskulls Free NFT Giveaway #1!
          </GiveawayButton>
        </s.Container>
        <Router>
          <Route path="/" render={() => <Main />} />
        </Router>
        <s.SpacerXSmall />
        <BodyTextContainer>
          <img src="/config/images/Cryptologo.png" />
          <s.TextTitle
            id="about-ch"
            style={{ fontSize: "50px", color: "lightgrey" }}
          >
            About Crypto House
          </s.TextTitle>
          <div>
            Crypto House is Crypto Jesus and Tracy. They have a live stream all
            about crypto you can watch on the following platforms:
            <ul
              style={{
                margin: "15px 10px",
                paddingInlineStart: "40px",
                listStyle: "square",
              }}
            >
              <li>
                <StyledLink
                  src="https://youtube.com/c/CryptoJesus"
                  target="_blank"
                >
                  Youtube
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  src="https://www.twitch.tv/crypt0house"
                  target="_blank"
                >
                  Twitch
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  src="https://www.facebook.com/Crypt0House/videos/"
                  target="_blank"
                >
                  Facebook
                </StyledLink>
              </li>
              <li>
                <StyledLink src="https://dlive.tv/CryptoHouse" target="_blank">
                  DLive
                </StyledLink>
              </li>
            </ul>
            You can join them on the following social media outlets:
            <ul
              style={{
                margin: "15px 10px",
                paddingInlineStart: "40px",
                listStyle: "square",
              }}
            >
              <li>
                <StyledLink
                  src="https://www.facebook.com/Crypt0House"
                  target="_blank"
                >
                  Facebook
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  src="https://twitter.com/cryptohouse19"
                  target="_blank"
                >
                  Twitter
                </StyledLink>
              </li>
              <li>
                <StyledLink src="https://discord.gg/aecXF5pDRB" target="_blank">
                  Discord
                </StyledLink>
              </li>
            </ul>
          </div>
        </BodyTextContainer>
      </s.Container>
      <Footer>
        <div style={{ color: "white", marginBottom: "20px" }}>
          ©2021 Copyright CryptoHouse
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <StyledLink
            style={{ marginRight: "20px" }}
            src="https://docs.google.com/forms/d/1Q24NarEsigubhtSrjTrAd0eZohevDB8Ug79TezBStWs"
            target="_blank"
          >
            Report a Bug or Problem
          </StyledLink>
          <StyledLink
            src="https://docs.google.com/forms/d/1xUDuFQX1egISayYjqYUcXsM4R37cOxYo8uk6SZPeECA"
            target="_blank"
          >
            Contact the Team
          </StyledLink>
        </div>
      </Footer>
    </s.Screen>
  );
}

export default App;

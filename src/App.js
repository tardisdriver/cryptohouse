import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import "./styles/fog.css";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: purple;
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 150px;
  cursor: pointer;

  :hover {
    background-color: #8835d4;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 40%;
  border: none;
  background-color: #3c006e;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  padding: 24px;
  @media (min-width: 767px) {
    flex-direction: row;
  }
  @media only screen and (min-width: 280px) and (max-width: 767px) {
    margin-top: 100px;
    padding: 10px;
  }
`;

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

export const NavMenu = styled.ul`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 50px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  list-style: none;
  @media only screen and (min-width: 280px) and (max-width: 767px) {
    flex-direction: column;
    margin-top: 5px;
  }
`;

export const NavMenuItem = styled.li`
  color: white;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.75s;
  :hover {
    color: purple;
  }
  @media only screen and (min-width: 280px) and (max-width: 767px) {
    padding-bottom: 20px;
  }
`;

export const ExternalLink = styled.a`
  text-decoration: none;
  transition: color 0.5s;
  :visited {
    color: white;
  }
  :link {
    color: white;
  }
  :hover {
    color: purple;
  }
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

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [navOpen, setNavOpen] = useState(false);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(
    `Choose your amount and click buy to mint your NFT.`
  );
  const [mintAmount, setMintAmount] = useState(1);
  const [progressWidth, setProgressWidth] = useState(`0px`);
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

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    if (blockchain.balance < totalCostWei)
      setFeedback("Insufficient Balance in your wallet!");
    else
      setFeedback(`Minting your ${CONFIG.NFT_NAME}...Please give us a minute`);
    setClaimingNft(true);
    console.log(blockchain.smartContract.methods);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Ah $%#*, something went wrong... please try again.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        calculateProgress();
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const calculateProgress = () => {
    let progress = data.totalSupply / CONFIG.totalSupply;
    let newProgressWidth = `${progress * 298}px`;
    setProgressWidth(newProgressWidth);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    console.log(progressWidth);
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, [blockchain.account]);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

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
          <a href="https://discord.gg/yb6ycJBw3y" target="_blank">
            <img src="/config/images/discord-icon.png" />
          </a>
        </s.Container>
        <s.SpacerSmall />
        <div style={{ width: "100vw", maxWidth: "90vw", overflowX: "hidden" }}>
          <div id="fog-container">
            <div id="foglayer_01" class="fog">
              <div class="image01"></div>
              <div class="image02"></div>
            </div>
            <div id="foglayer_02" class="fog">
              <div class="image01"></div>
              <div class="image02"></div>
            </div>
            <div id="foglayer_03" class="fog">
              <div class="image01"></div>
              <div class="image02"></div>
            </div>
          </div>
        </div>
        <div id="floating-skulls">
          <img class="floating" height="80%" src="/config/images/1-1.png" />
          <img class="floating" height="80%" src="/config/images/1-2.png" />
          <img class="floating" height="80%" src="/config/images/1-3.png" />
          <img class="floating" height="80%" src="/config/images/1-4.png" />
        </div>
        <NavMenu>
          <NavMenuItem>
            <Link to="about" spy={true} smooth={true}>
              About Lexiskulls
            </Link>
          </NavMenuItem>
          <NavMenuItem>
            <Link to="about-ch" spy={true} smooth={true}>
              About CryptoHouse
            </Link>
          </NavMenuItem>
          <NavMenuItem>
            <ExternalLink href="https://google.com" target="_blank">
              View On Opensea
            </ExternalLink>
          </NavMenuItem>
          <li style={{ color: "#4c4c4c", fontSize: "22px" }}>
            Enter the gRAVEyard (coming soon!)
          </li>
        </NavMenu>
        <ResponsiveWrapper flex={1} test>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "black",
              padding: 24,
              borderRadius: 24,
              border: "8px solid purple",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL} (excluding gas fees, see * below).
                </s.TextTitle>
                <s.SpacerXSmall />
                <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                  View Contract
                </StyledLink>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerLarge />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT WALLET
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        <img src="/config/images/minus.png" />
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          fontSize: "28px",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        <img src="/config/images/plus.png" />
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <s.TextSubTitle>
                        {blockchain.account
                          ? `Wallet Balance: ${
                              Math.round(blockchain.humanReadableBal * 1000) /
                              1000
                            } ${CONFIG.NETWORK.SYMBOL}`
                          : ""}
                      </s.TextSubTitle>
                    </s.TextDescription>
                    <s.SpacerXSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "Minting..." : "BUY"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
            <s.TextSubTitle
              style={{
                textAlign: "center",
                fontSize: 28,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              Progress: {data.totalSupply} / {CONFIG.MAX_SUPPLY} Minted!
            </s.TextSubTitle>
            <s.SpacerXSmall />
            <div
              style={{
                width: "300px",
                height: "40px",
                border: "1px solid white",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <img width={progressWidth} src={"/config/images/slime.gif"} />
            </div>
            <s.SpacerMedium />
            <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "grey",
                }}
              >
                Please make sure you are connected to the right network (
                {CONFIG.NETWORK.NAME}) and the correct address. Please note:
                Once you make the purchase, you cannot undo this action.
              </s.TextDescription>
              <s.SpacerSmall />
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "grey",
                }}
              >
                * We have set the gas limit to {CONFIG.GAS_LIMIT} for the
                contract to successfully mint your NFT. We recommend that you
                don't lower the gas limit.
              </s.TextDescription>
            </s.Container>
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerXSmall />
        <BodyTextContainer>
          <s.TextTitle
            id="about"
            style={{ fontSize: "50px", color: "lightgrey" }}
          >
            About Lexiskulls
          </s.TextTitle>
          <BodyText>lex·i·con - A wordbook or dictionary</BodyText>
          <BodyText>skull - the inside-your-head meat helmet</BodyText>
          <BodyText>
            <span style={{ fontStyle: "italic" }}>Lexiskulls</span> are a
            collection of 10,000 cute, deranged, misguided skulls that love
            words even if the language parts of their brains rotted a long time
            ago. Each skull is randomly generated from a bank of:
            <ul
              style={{
                margin: "15px 10px 5px 10px",
                paddingInlineStart: "40px",
                listStyle: "square",
              }}
            >
              <li>
                12 backgrounds, including 2 rare, one super rare, and one ultra
                rare
              </li>
              <li>
                32 skulls, including 11 rare, 3 super rare, and one ultra rare
              </li>
              <li>
                26 eyes, including 11 rare, 4 super rare, and one ultra-rare
              </li>
              <li>
                15 hats, including 6 rare, 2 super rare, and one ultra-rare
              </li>
              <li>
                9 moustaches, 7 of which are rare, one super rare, and one
                ultra-rare
              </li>
              <li>
                And then there's the wordbank... a monster collection of 420
                words (nice), including 96 rare, 45 super rare and 1 ultra rare
              </li>
            </ul>
          </BodyText>
          <BodyText>
            <h3 style={{ marginBottom: "5px" }}>Everyone Dies Equally</h3>
            <BodyText>
              Lexiskulls will be fairly priced all at 25 MATIC. No tiers, no
              curves, no weirdness. Just fair.
            </BodyText>
            <BodyText>
              100 Lexiskulls will be reserved for team, giveaways, and contests.
              The most rare of the rare, a 100% ultra-rare skull, will be given
              as a prize in a competition launching soon. In order to get access
              to the hunt, you'll need a skull in your wallet to gain access to
              The gRAVEyard. What is The gRAVEyard you ask?
            </BodyText>
          </BodyText>
          <BodyText>
            <h3 style={{ marginBottom: "5px" }}>The gRAVEyard</h3>
            <BodyText>
              The gRAVEyard is a members-only area accessible only by holding at
              least one Lexiskull in your wallet. The gRAVEyard is a place to
              let your skull relax and let whatever is left of their hair down.
              It also grants you safe passage to members-only benefits as they
              release, and early access to the next spin-off project,
              Swearyskulls.
            </BodyText>
          </BodyText>
        </BodyTextContainer>
        <s.SpacerLarge />
        <BodyTextContainer>
          <s.TextTitle
            id="about-ch"
            style={{ fontSize: "50px", color: "lightgrey" }}
          >
            About Cryptohouse
          </s.TextTitle>
          <p>
            CryptoHouse is Crypto Jesus and Tracy. They have a live stream all
            about crypto you can watch on the following platforms:
            <ul
              style={{
                margin: "15px 10px 5px 10px",
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
                margin: "15px 10px 5px 10px",
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
          </p>
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

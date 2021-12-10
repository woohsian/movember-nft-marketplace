import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { timeConverter } from "../../helpers";

const priceIncrease = (
  currentPrice,
  dispatch,
  donors,
  setDonors,
  base = 100
) => {
  const newPrice =
    parseFloat(currentPrice) + parseInt(Math.random() * base, 10);
  setDonors(donors + parseInt(Math.random() * 3, 10));
  dispatch(newPrice);
};

export const NFTCard = ({ card, canBid }) => {
  const [priceToShow, setPriceToShow] = useState(card.price);
  const [donors, setDonors] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      priceIncrease(priceToShow, setPriceToShow, donors, setDonors, card.base);
    }, parseInt(Math.random() * 1000, 10));

    return () => clearInterval(intervalId); //
  }, [priceToShow]);

  return (
    <CardComp>
      <ImgComp style={{ backgroundImage: `url("${card.imageURL}")` }}></ImgComp>
      <Content>
        <Title>{card.title}</Title>
        {canBid && (
          <>
            <div>Posted: {timeConverter(card.postedTime)}</div>
            <div>Donors: {donors}</div>
            <br />
            <div>Funds Raised: ${priceToShow}</div>
            <br />
            <ButtonShare variant="contained">Share</ButtonShare>
            <br />
            <br />
            <ButtonBid variant="contained">Donate</ButtonBid>
          </>
        )}
        {!canBid && (
          <>
            <Category>{card.category}</Category>
            <div>Total Donation: ${card.price}</div>
          </>
        )}
      </Content>
    </CardComp>
  );
};

const CardComp = styled.div`
  width: 250px;
  padding: 25px;
`;

const Title = styled.h3`
  width: 100%;
`;

const Content = styled.div`
  text-align: center;
`;

const ImgComp = styled.div`
  background-color: #333;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

const ButtonBid = styled(Button)`
  background-color: #333 !important;
  margin: 0 25px !important;
`;

const ButtonShare = styled(Button)`
  background-color: #00f !important;
  margin: 0 25px !important;
`;

const Category = styled.h3`
  text-transform: uppercase;
`;

export default NFTCard;

import styled from "styled-components";
import Button from "@mui/material/Button";
import { timeConverter } from "../../helpers";

export const NFTCard = ({ card, canBid }) => {
  return (
    <CardComp>
      <ImgComp style={{ backgroundImage: `url("${card.imageURL}")` }}></ImgComp>
      <Content>
        <Title>{card.title}</Title>
        {canBid && (
          <>
            <div>Posted: {timeConverter(card.postedTime)}</div>
            <div>Bids: {card.bid || 0}</div>
            <br />
            <div>Current Bid: ${card.price}</div>
            <br />
            <ButtonShare variant="contained">Share</ButtonShare>
            <ButtonBid variant="contained">Bid</ButtonBid>
          </>
        )}
        {!canBid && (
          <>
            <Category>{card.category}</Category>
            <div>Winning Bid: ${card.price}</div>
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

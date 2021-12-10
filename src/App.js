import Header from "./components/Header/Header";
import NFTCard from "./components/NFTCard/NFTCard";
import styled from "styled-components";
import { cards, cardsWinners } from "./mockData";
import Pagination from "@mui/material/Pagination";

function App() {
  return (
    <AppComp>
      <Header></Header>
      <CardsSection>
        {cards.map((card) => {
          return <NFTCard card={card} canBid={true} />;
        })}
      </CardsSection>
      <PaginationComp count={10} color="primary" />
      <hr />
      <CardsSectionTitle>Last Month's Winners</CardsSectionTitle>
      <CardsSection>
        {cardsWinners.map((card) => {
          return <NFTCard card={card} cantBid={false} />;
        })}
      </CardsSection>
    </AppComp>
  );
}

const AppComp = styled.main``;

const PaginationComp = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

const CardsSectionTitle = styled.h2`
  text-align: center;
`;

const CardsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default App;

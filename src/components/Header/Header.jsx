import styled from "styled-components";
import Button from "@mui/material/Button";

export const Header = () => {
  return (
    <HeaderComp>
      <NavComp>
        <h1>Mo NFT Marketplace</h1>
        <RightNav>
          <AnchorLink href="#">About</AnchorLink>
          <AnchorLink href="#">Support</AnchorLink>
          <ButtonDonate variant="contained">Connect Wallet</ButtonDonate>
        </RightNav>
      </NavComp>
      <hr />
    </HeaderComp>
  );
};

const HeaderComp = styled.header`
  width: 100%;
`;
const NavComp = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 25px;
`;
const RightNav = styled.div`
  align-items: center;
  padding: 0 25px;
`;

const ButtonDonate = styled(Button)`
  background-color: #333 !important;
  margin: 0 25px !important;
`;

const AnchorLink = styled.a`
  padding: 0 25px;
  text-decoration: none;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export default Header;

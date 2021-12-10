import styled from "styled-components";
import Button from "@mui/material/Button";

export const Header = () => {
  return (
    <HeaderComp>
      <NavComp>
        <h1>Marketplace</h1>
        <RightNav>
          <AnchorLink href="#">About</AnchorLink>
          <AnchorLink href="#">Support</AnchorLink>
          <ButtonDonate>Donate</ButtonDonate>
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
`;
const RightNav = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonDonate = styled(Button)``;

const AnchorLink = styled.a`
  padding: 0 25px;
  text-decoration: none;
`;

export default Header;

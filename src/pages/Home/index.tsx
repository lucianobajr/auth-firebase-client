import React from "react";

import { Container, Header, HeaderContent, Profile } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { FiPower } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Header>
        <HeaderContent>
          {/*<img src={logo} alt="GoBarber logo" />*/}

          <Profile>
            {user?.avatar && <img src={user.avatar} alt={user.name} />}
            <div>
              <span>Bem-vindo</span>
              <Link to="/profile">{user?.name}</Link>
            </div>
          </Profile>

          <button type="button" onClick={() => handleSignOut()}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Home;

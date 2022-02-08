import React from "react";

import annimationHome from "../../assets/72342-welcome.json";
import { Container, Header, HeaderContent, Profile } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { FiPower } from "react-icons/fi";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";

const Home: React.FC = () => {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  }

  const optionsMain = {
    loop: true,
    autoplay: true,
    animationData: annimationHome,
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
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
      <Lottie width={"40%"} height={"40%"} options={optionsMain} />
    </Container>
  );
};

export default Home;

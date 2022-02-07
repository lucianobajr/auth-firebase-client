import React, { useCallback, useState } from "react";

import annimation from "../../assets/94439-abstract.json";
import google from "../../assets/google.svg";
import Lottie from "react-lottie";
import {
  Container,
  CreateRoom,
  Separator,
  MainContent,
  GoogleButton,
} from "./styles";

import { Form } from "@unform/web";
import { useRef } from "react";
import { FormHandles } from "@unform/core";
import Input from "../../components/Input";
import { FiLock, FiMail } from "react-icons/fi";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { Spinner } from "react-activity";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const { signInWithGoogle, signInWithFirebase } = useAuth();

  const options = {
    loop: true,
    autoplay: true,
    animationData: annimation,
  };

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setIsLoadingFirebase(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um email!")
            .required("Email obrigatório"),
          password: Yup.string().required("Senha Obrigatória"),
        });

        await schema.validate(data, { abortEarly: false });

        await signInWithFirebase(data.email, data.password);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);

          formRef.current?.setErrors(erros);

          return;
        }
      } finally {
        setIsLoadingFirebase(false);
      }
    },
    [signInWithFirebase]
  );

  async function handleGoogleSignIn() {
    setIsLoadingGoogle(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingGoogle(false);
    }
  }

  return (
    <Container>
      <aside>
        <Lottie width={"65%"} height={"65%"} options={options} />
      </aside>
      <main>
        <MainContent>
          <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
            <h1>Faça seu login</h1>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <CreateRoom type="submit">
              {isLoadingFirebase ? <Spinner color="#FFF" /> : "Entrar"}
            </CreateRoom>
            <Link to="/signUp">Não tenho uma conta</Link>
          </Form>
          <Separator>ou faça login com google</Separator>
          <GoogleButton onClick={handleGoogleSignIn}>
            {isLoadingGoogle ? (
              <Spinner color="rgba(178,105,250,1)" />
            ) : (
              <img src={google} alt="" width={40} />
            )}
          </GoogleButton>
        </MainContent>
      </main>
    </Container>
  );
};

export default SignIn;

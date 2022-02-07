import React, { useCallback } from "react";

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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: annimation,
  };

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um email!")
          .required("Email obrigatório"),
        password: Yup.string().required("Senha Obrigatória"),
      });

      await schema.validate(data, { abortEarly: false });

      console.log({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = getValidationErrors(error);

        formRef.current?.setErrors(erros);

        return;
      }
    }
  }, []);

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
            <CreateRoom type="submit">Entrar</CreateRoom>

            <Separator>ou faça login com google</Separator>
          </Form>
          <GoogleButton>
            <img src={google} alt="" width={40} />
          </GoogleButton>
        </MainContent>
      </main>
    </Container>
  );
};

export default SignIn;

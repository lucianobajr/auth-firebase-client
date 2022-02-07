import React, { useCallback } from "react";

import annimation from "../../assets/94439-abstract.json";
import Lottie from "react-lottie";
import { Container, CreateRoom, MainContent } from "./styles";

import { Form } from "@unform/web";
import { useRef } from "react";
import { FormHandles } from "@unform/core";
import Input from "../../components/Input";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import { api } from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

import { Spinner } from "react-activity";

interface SignInFormData {
  username: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    loop: true,
    autoplay: true,
    animationData: annimation,
  };

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required("Nome é Obrigatória"),
          email: Yup.string()
            .email("Digite um email!")
            .required("Email obrigatório"),
          password: Yup.string().required("Senha Obrigatória"),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post("/user", data);

        history.push("/");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);

          formRef.current?.setErrors(erros);

          return;
        }
      } finally {
        setIsLoading(false);
      }
    },
    [history]
  );

  return (
    <Container>
      <aside>
        <MainContent>
          <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
            <h1>Fazer Cadastro</h1>
            <Input
              name="username"
              icon={FiUser}
              type="text"
              placeholder="Nome"
            />
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
              {isLoading ? (
                <Spinner color="rgba(178,105,250,1)" />
              ) : (
                "Cadastrar"
              )}
            </CreateRoom>
            <Link to="/">Já tenho uma conta!</Link>
          </Form>
        </MainContent>
      </aside>
      <main>
        <Lottie width={"65%"} height={"65%"} options={options} />
      </main>
    </Container>
  );
};

export default SignIn;

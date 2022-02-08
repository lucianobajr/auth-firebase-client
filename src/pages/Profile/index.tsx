import React, { useCallback, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Container, Content, AvatarInput, Button } from "./styles";
import { FiMail, FiUser, FiCamera, FiArrowLeft, FiPhone } from "react-icons/fi";
import { FormHandles } from "@unform/core";

import { Link, useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Input from "../../components/Input";

import getValidationErrors from "../../utils/getValidationErrors";
import { api } from "../../services/api";
import { useState } from "react";

import { Spinner } from "react-activity";
import { toast } from "react-toastify";

interface SignUpFormData {
  username: string;
  email: string;
  phone: string;
}

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          phone: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        const { username, email, phone } = data;

        const formData = Object.assign({
          username,
          email,
          phoneNumber: phone,
        });

        await api.put(`/user/${user?.id}`, formData);

        updateUser({
          name: username,
          email: email,
          phone: phone,
        });

        toast("Logado com sucesso!", { type: "success" });

        setTimeout(() => {
          history.goBack();
        }, 5000);
      } catch (error) {
        console.log(error);

        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);

          formRef.current?.setErrors(erros);

          return;
        }
        toast(String(error), { type: "error" });
      } finally {
        setIsLoading(false);
      }
    },
    [history, user, updateUser]
  );

  console.log(user?.authType);

  return (
    <Container>
      <header>
        <div>
          <Link to="/home">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            username: user?.name,
            email: user?.email,
            phone: user?.phone,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user?.avatar} alt={user?.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" name="" id="avatar" onChange={() => {}} />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="username" icon={FiUser} type="text" placeholder="Nome" />

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="phone"
            icon={FiPhone}
            type="text"
            placeholder="Telefone"
          />
          <Button
            type="submit"
            dontTouch={user?.authType === "google" ? true : false}
            disabled={user?.authType === "google" ? true : false}
          >
            {isLoading ? <Spinner /> : "Confirmar mudanças"}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;

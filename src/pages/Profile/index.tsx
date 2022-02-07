import React, { useCallback, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Container, Content, AvatarInput, Button } from "./styles";
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from "react-icons/fi";
import { FormHandles } from "@unform/core";

import { Link, useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Input from "../../components/Input";

import getValidationErrors from "../../utils/getValidationErrors";
import { api } from "../../services/api";

interface SignUpFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (old_password: any) => {
              if (old_password) {
                return true;
              }
            },
            then: Yup.string().required("Campo obrigatório!"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (old_password: any) => {
                if (old_password) {
                  return true;
                }
              },
              then: Yup.string().required("Campo obrigatório!"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password"), null], "Confirmação incorreta!"),
        });

        await schema.validate(data, { abortEarly: false });

        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = Object.assign(
          {
            name,
            email,
          },
          old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}
        );

        const response = await api.put("/profile", formData);
        console.log(response.data);

        //updateUser(response.data);

        history.push("/");

        /*addToast({
          type: "success",
          title: "Perfil Atualizado!",
          description:
            "Suas informações do perfil foram atualizadas com sucesso!",
        });*/
      } catch (error) {
        console.log(error);

        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);

          formRef.current?.setErrors(erros);

          return;
        }

        /*addToast({
          type: "error",
          title: "Erro na Atualização",
          description: "Ocorreu um erro ao atualizar perfil, tente novamente!",
        });*/
      }
    },
    [history]
  );

  /*const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then((response) => {
          updateUser(response.data);

          addToast({
            type: "success",
            title: "Avatar atualizado!",
          });
        });
      }
    },
    [addToast, updateUser]
  );*/

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
          initialData={{ name: user?.name, email: user?.email }}
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

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
            containerStyle={{ marginTop: 24 }}
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar Senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;

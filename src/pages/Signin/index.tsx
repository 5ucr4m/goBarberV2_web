import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { useAuth, SignInCredentials } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import getValidationsErrors from '../../utils/getValidationsErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signin } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInCredentials) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Email deve ser válido'),
          password: Yup.string().required('A senha deve ser preenchida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;
        await signin({ email, password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro na autenticação',
          description: 'Confira seus dados, Email e/ou senha inválidos',
          type: 'error',
        });
      }
    },
    [signin, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="goBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Login</h1>

          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha.</a>
        </Form>
        <Link to="signup">
          <FiLogIn />
          Criar conta.
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;

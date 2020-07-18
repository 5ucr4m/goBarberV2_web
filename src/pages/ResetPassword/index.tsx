/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { useToast } from '../../hooks/Toast';
import getValidationsErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { search } = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('A senha deve ser preenchida'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não são iguais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        api.post('/password/reset', {
          token,
          password,
          password_confirmation,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro ao resetar a senha',
          description: 'Algo deu errado ao resetar sua senha, tente novamente',
          type: 'error',
        });
      }
    },
    [addToast, history, search],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="goBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Nova senha"
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            type="password"
            placeholder="Confirme sua senha"
          />
          <Button type="submit">Alterar Senha</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;

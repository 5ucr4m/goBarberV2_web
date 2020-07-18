import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { useToast } from '../../hooks/Toast';
import getValidationsErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      setLoading(true);
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Email deve ser válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email } = data;

        await api.post('/password/forgot', {
          email,
        });

        addToast({
          type: 'success',
          title: 'Recuperação de Senha',
          description: 'Enviamos um email de recuperação da sua senha',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro na recuperação de Senha',
          description: 'Ocorreu um erro ao tentar recuperar a senha.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="goBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar Senha</h1>

          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />

          <Button loading={loading} type="submit">
            Recuperar
          </Button>
        </Form>
        <Link to="/">
          <FiLogIn />
          Login.
        </Link>
      </Content>
      <Background />
    </Container>
  );
};
export default ForgotPassword;

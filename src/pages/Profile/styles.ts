import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    display: flex;
    height: 144px;
    background-color: #28262e;
    align-items: center;

    > div {
      padding: 0 40px;
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  place-content: center;

  width: 100%;

  margin: -176px auto 0;

  form {
    display: flex;
    flex-direction: column;
    margin: 80px 0 40px;
    width: 340px;
    text-align: center;
  }

  h1 {
    margin-bottom: 24px;
    font-size: 20px;
    text-align: left;
  }
`;

export const Space = styled.div`
  width: 100%;
  height: 24px;
`;

export const AvatarInpput = styled.div`
  width: 186px;
  margin: 0 auto;
  margin-bottom: 32px;
  position: relative;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    width: 48px;
    height: 48px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: #ff9000;
    border-radius: 50%;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s background-color;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;

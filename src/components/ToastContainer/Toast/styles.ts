import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'default' | 'success' | 'error';
  hasDescription?: boolean;
}

const type = {
  default: css`
    background: #ebe8ff;
    color: #3172b7;
    border-left: 4px solid #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
    border-left-color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
    border-left-color: #c53030;
  `,
};

export const ToastContainer = styled(animated.div)<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 2px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  opacity: 0.8;

  display: flex;

  background: #ebe8ff;
  color: #3172b7;
  border-left-width: 4px;
  border-left-style: solid;

  & + div {
    margin-top: 8px;
  }

  ${props => !!props.type && type[props.type || 'default']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;
    `}
`;

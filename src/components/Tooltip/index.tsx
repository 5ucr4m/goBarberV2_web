import React from 'react';

import { Container } from './styles';

interface TooltipPorps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipPorps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;

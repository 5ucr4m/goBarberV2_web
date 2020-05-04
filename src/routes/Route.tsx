import React from 'react';
import { Route as DomRouter, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RouterPropsPrivate extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouterPropsPrivate> = ({
  isPrivate = false,
  component: Component,
  ...props
}) => {
  const { user } = useAuth();
  return (
    <DomRouter
      {...props}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

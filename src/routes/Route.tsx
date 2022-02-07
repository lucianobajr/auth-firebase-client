import React from "react";
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

//privado/autenticado = true/true = OK
//privado/não autenticado = true/false = Redirecionar para login
//não privado/autenticado = false/true = Redirecionar para dashboard
//privado/autenticado = true/true = OK

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user?.id ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/home",
              state: { location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

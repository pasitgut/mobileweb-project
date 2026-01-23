import { Redirect, Route } from "react-router";
import { useAuth } from "./AuthContext";

interface Props {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;

import { useUser } from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. load authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2. if there is no authenticated user, redirect to the login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;

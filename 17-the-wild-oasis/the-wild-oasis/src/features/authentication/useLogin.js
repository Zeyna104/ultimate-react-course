import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Logged in successfully");
      console.log(user);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  return { login, isLoggingIn };
};

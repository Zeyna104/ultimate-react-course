import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isSigningUp } = useSignup();
  const { register, reset, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  const onSubmit = ({ fullName, email, password }) => {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, () => console.log(errors))}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isSigningUp}
          type="text"
          id="fullName"
          {...register("fullName", { required: "Full name is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSigningUp}
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSigningUp}
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "At least 8 characters required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSigningUp}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Confirm the password",
            validate: (value) =>
              value === getValues().password || "Passwords don't match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}{" "}
        <Button
          variation="secondary"
          type="reset"
          disabled={isSigningUp}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>
          {isSigningUp ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

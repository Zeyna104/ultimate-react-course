import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components";

const LoadingCircle = styled.span`
  width: 14px;
  height: 14px;
  color: var(--color-blue-100);
  animation: rotate 1s linear forwards;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingButton = () => {
  return (
    <LoadingCircle>
      <AiOutlineLoading3Quarters />
    </LoadingCircle>
  );
};

export default LoadingButton;

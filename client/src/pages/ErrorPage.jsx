import { ErrorComponent } from "../components";

export const ErrorPage = ({ code }) => {
  return <ErrorComponent code={code} />;
};

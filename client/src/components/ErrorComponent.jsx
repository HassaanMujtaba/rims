export const ErrorComponent = ({ code }) => {
  return (
    <>
      <div className="error">{code} ERROR</div>
      <div className="errorSubtitle">
        {code === "404" && "Page Not Found"}
        {code === "500" && "Internal Server Error"}
      </div>
    </>
  );
};

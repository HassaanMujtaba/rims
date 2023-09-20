import { Button } from "react-bootstrap";

export const Heading = ({ heading, buttons}) => {
  return (
    <div className="headingMain">
      <span className="heading-main">{heading}</span>{" "}
      <div className="d-flex">
        {buttons !== undefined && buttons.map((button, index) => (
          <Button key={index} className="my-custom-btn" onClick={button.action}>
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

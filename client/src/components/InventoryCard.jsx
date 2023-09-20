import { Card } from "react-bootstrap";

export const InventoryCard = ({ imageSrc, title, details, setShow }) => {
  return (
    <Card onClick={setShow ? () => setShow(true) : () => console.log("Inventory Card")} className="navCard h-100 mb-3">
      <Card.Body style={{ position: "relative", height: 470 }}>
        <div className="cardImage">
          <img src={imageSrc || require("../assets/user.png")} alt={title} />
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="title mb-3">{title}</div>
        <div className="details">
          {details &&
            details.length > 0 &&
            details.map((item, index) => {
              return typeof item === "object" ? (
                <div
                  key={`${item.heading}-${index}`}
                  className="d-flex justify-content-start align-items-center mb-3"
                >
                  <span className="text-primary-heading">{item.heading}</span>
                  <span className="text-primary-custom">{item.paragraph}</span>
                </div>
              ) : (
                <div
                  key={`${item}-${index}`}
                  className="d-flex justify-content-start align-items-center mb-3"
                >
                  <span className="text-secondary">{item}</span>
                </div>
              );
            })}
        </div>
      </Card.Footer>
    </Card>
  );
};

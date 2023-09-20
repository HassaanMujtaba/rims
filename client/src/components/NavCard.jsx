import { Button, Card } from "react-bootstrap";

export const NavCard = ({
  imageSrc,
  title,
  details,
  status,
  onClick,
  id,
  buttons,
  editable,
  statusCheck,
  edit,
}) => {
  return (
    <Card className="navCard h-100 mb-3">
      <Card.Header style={{ position: "relative", height: 460 }}>
        <div
          className="cardImage"
          style={{
            backgroundImage: `url(${
              imageSrc || require("../assets/user.png")
            })`,
          }}
        >
          {/* <img src={imageSrc || require("../assets/user.png")} alt={title} /> */}
        </div>
      </Card.Header>
      <Card.Body>
        <div className="title mb-3">{title}</div>
        <div className="details">
          {details &&
            details.length > 0 &&
            details.map((item, index) => {
              return typeof item === "object" ? (
                <div
                  key={`${item.heading}-${index}`}
                  className="d-flex justify-content-start align-items-start mb-3"
                  style={{ flexDirection: "column" }}
                >
                  <span className="text-primary-heading">{item.heading}</span>
                  <span className="text-primary-custom">
                    {typeof item?.paragraph === "object"
                      ? "Fetching..."
                      : item?.paragraph}
                  </span>
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
      </Card.Body>
      {buttons && (
        <Card.Footer>
          {statusCheck && (
            <>
              {status ? (
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={() => onClick(id, "DISABLE")}
                >
                  Disable
                </Button>
              ) : (
                <Button
                  className="me-2"
                  variant="success"
                  onClick={() => onClick(id, "ENABLE")}
                >
                  Enable
                </Button>
              )}
            </>
          )}
          {editable && (
            <Button className="me-2" onClick={() => edit(id)}>
              Edit
            </Button>
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

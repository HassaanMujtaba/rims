import Container from "react-bootstrap/esm/Container";
import { Row } from "react-bootstrap";

export const TotalNumbersContainer = ({ children }) => {
  return (
    <Container className="px-5 mb-3" fluid>
      <Row className="px-4">{children}</Row>
    </Container>
  );
};

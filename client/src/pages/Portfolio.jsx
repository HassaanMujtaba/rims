import {
  TotalClients,
  TotalProducts,
  TotalVendors,
  Heading,
  Footer,
  TopContainer,
} from "../components";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { NewOrdersTable } from "../components/NewOrdersTable";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

export const Portfolio = () => {
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        fill: true,
        backgroundColor: "rgb(255,255,255)",
        borderColor: "gray",
        lineTension: 0.4,
      },
    ],
  };

  return (
    <>
      <TopContainer>
        <div className="topHeading">
          <span>Abdul Raheem</span>
          <div>
            <FiEdit />
            <AiOutlineDelete style={{color: 'red'}} />
          </div>
        </div>
        <div className="profilePicture">
          <Image src={require("../assets/1.gif")} alt="Abdul Raheem" />
        </div>
        <div className="stats">
          <div className="statsContainer">
            <TotalClients />
            <TotalVendors />
            <TotalProducts />
          </div>
        </div>
      </TopContainer>
      <Heading heading={"Statistics"} />
      <Container fluid>
        <div className="d-flex align-items-start justify-content-between">
          <div className="dashboardCard1">
            <h2 className="mb-3">Yearly Sales</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
          <div className="dashboardCard2">
            <h2 className="mb-3">Recent Orders</h2>
            <NewOrdersTable />
          </div>
        </div>
      </Container>

      <Footer />

      <Modal
        className="modal-custom modal-xl"
        show={showVendorModal}
        onHide={() => setShowVendorModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-form">
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control placeholder="Enter Fullname" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Enter Address" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>CNIC</Form.Label>
                  <Form.Control placeholder="Enter CNIC number" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control placeholder="Enter Email" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control placeholder="Enter phone number" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="my-custom-btn mb-3"
            onClick={() => setShowVendorModal(false)}
          >
            Cancel
          </Button>
          <Button className="my-custom-btn-inverse mb-3">Add</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="modal-custom modal-xl"
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-form">
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Title</Form.Label>
                  <Form.Control placeholder="Enter title" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Vendor</Form.Label>
                  <Form.Select>
                    <option value="">Select vendor</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Actual Price</Form.Label>
                  <Form.Control placeholder="Enter actual price" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control placeholder="Enter selling price" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Display Picture</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="my-custom-btn mb-3"
            onClick={() => setShowProductModal(false)}
          >
            Cancel
          </Button>
          <Button className="my-custom-btn-inverse mb-3">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Offcanvas,
  Modal,
  Toast,
  Carousel,
  ToastContainer,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlinePlusCircle,
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const updatedata = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setData(res?.data);
  };
  useEffect(() => {
    updatedata();
  }, []);
  const addToCart = (e) => {
    e.preventDefault();
    if (parseInt(e.target[1].value) < 1) {
      setToastMsg("Negative quantity not allowed");
      setToast(true);
      return;
    }
    if (e.target[1].value > 0) {
      setCart([
        ...cart,
        { pid: e.target[0].value, quantity: parseInt(e.target[1].value) },
      ]);
    }
  };

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const chars = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    " ",
  ];
  const isValidName = (val) => {
    const splitted = val.split("");
    if (chars.includes(splitted[splitted.length - 1])) return val;
    splitted.pop();
    return splitted.join("");
  };
  const isValidPhone = (val) => {
    const splitted = val.toString().split("");
    if (!isNaN(splitted[splitted.length - 1]) && splitted.length < 12)
      return val;
    splitted.pop();
    return splitted.join("");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [disabled, setDisabled] = useState(false);
  const getProductImage = (id) => {
    return `http://localhost:5000/files/${
      data.filter((i) => i._id == id)[0].display_picture
    }`;
  };
  const getProductTitle = (id) => {
    return data.filter((i) => i._id == id)[0].title;
  };
  const getProductPrice = (id) => {
    return data.filter((i) => i._id == id)[0].selling_price;
  };
  const deleteCart = (index) => {
    const temp = cart;
    temp.splice(index, 1);
    setCart([...temp]);
  };
  const [form, setForm] = useState({
    client_name: "",
    client_phone: "",
    client_address: "",
  });
  const placeOrder = async (e) => {
    setDisabled(true);
    e.preventDefault();
    if (form.client_phone.toString().split("").length !== 11) {
      setToastMsg("Invalid Phone Number");
      setToast(true);
      setDisabled(false);
      return;
    }
    if (cart.length < 1) {
      setToastMsg("Cart is empty");
      setToast(true);
      handleCloseModal();
      setDisabled(false);
      return;
    }
    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify({
        client_name: form.client_name,
        client_phone: form.client_phone,
        client_address: form.client_address,
        items: cart,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (res?.status === 200) {
      setCart([]);
      setForm({
        client_name: "",
        client_phone: "",
        client_address: "",
      });
      handleCloseModal();
      alert(res?.message);
      window.location.reload();
    }
    setToastMsg(res?.message);
    setToast(true);
    setDisabled(false);
  };
  return (
    <>
      <Navbar style={{ background: "#EFEFEF" }}>
        <Container>
          <Navbar.Brand href="#home" className="text-success">
            <b>Rankoli</b>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button className="me-3 btn-success" onClick={handleShow}>
                <AiOutlineShoppingCart />
                <sup>{cart.length}</sup>
              </Button>
              {/* <Button onClick={handleShowModal}>Checkout</Button> */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Carousel style={{ height: "calc(100vh - 69.6px)" }}>
        <Carousel.Item style={{ height: "calc(100vh - 69.6px)" }}>
          <img
            className="d-block w-100"
            src="https://c4.wallpaperflare.com/wallpaper/603/372/58/stylish-design-bathroom-wallpaper-preview.jpg"
            alt="First slide"
          />
          <Carousel.Caption style={{ background: "rgba(0,0,0,0.6)" }}>
            <h3>RANKOLI</h3>
            <p>Glow Your Home</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "calc(100vh - 69.6px)" }}>
          <img
            className="d-block w-100"
            src="https://c4.wallpaperflare.com/wallpaper/571/297/160/architecture-design-interior-room-wallpaper-preview.jpg"
            alt="Second slide"
          />

          <Carousel.Caption style={{ background: "rgba(0,0,0,0.6)" }}>
            <h3>RANKOLI</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div
        style={{
          background: "#F8F9FA",
          padding: "2rem 1rem",
        }}
        className="mb-5"
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h1>ALL PRODUCTS</h1>
          <p>We deal only in quality products</p>
        </Container>
      </div>

      <Container className="mb-4">
        <Row>
          {data &&
            data.map((i, index) =>
              i.quantity > 0 && i?.status ? (
                <Col lg={4} md={6} sm={12} key={index} className="mb-3">
                  <Form onSubmit={addToCart}>
                    <Card>
                      <Card.Body>
                        <div
                          className="dp"
                          style={{
                            backgroundImage: `url('http://localhost:5000/files/${i.display_picture}')`,
                          }}
                          alt={i.title}
                        ></div>
                        <div className="info">
                          <span
                            className="title"
                            style={{ textTransform: "capitalize" }}
                          >
                            {i.title}
                          </span>
                          <span className="price">
                            <b>Price:</b> {i.selling_price} PKR
                          </span>
                          <span className="price">
                            {i.quantity} <b>In Stock</b>
                          </span>
                          <input type="hidden" name="pid" value={i._id} />
                          <Form.Group style={{ width: "150px" }}>
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup>
                              {/* <Button
                              type='submit'
                              className='d-flex align-items-center'
                              style={{ columnGap: 10 }}
                              variant='success'
                            >
                              <AiOutlineArrowDown fontSize={20} />
                            </Button> */}
                              <Form.Control
                                className="qty"
                                type="number"
                                min={1}
                                max={i.quantity}
                                name="quantity"
                                placeholder="Quantity"
                              />
                              {/* <Button
                              type='submit'
                              className='d-flex align-items-center'
                              style={{ columnGap: 10 }}
                              variant='success'
                            >
                              <AiOutlineArrowUp fontSize={20} />
                            </Button> */}
                            </InputGroup>
                          </Form.Group>
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          type="submit"
                          className="d-flex align-items-center"
                          style={{ columnGap: 10 }}
                          variant="success"
                        >
                          <AiOutlinePlusCircle fontSize={20} /> Add to cart
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Form>
                </Col>
              ) : null
            )}
        </Row>
      </Container>
      <Container
        style={{ background: "#222", color: "#fff" }}
        className="p-3"
        fluid
      >
        <Container className="d-flex align-items-center justify-content-between">
          <span>Copyright &copy; Rankoli</span>
          <div
            className="d-flex align-items-center justify-content-end"
            style={{ columnGap: 10 }}
          >
            <AiFillFacebook />
            <AiFillInstagram />
            <AiFillTwitterCircle />
          </div>
        </Container>
      </Container>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart && cart.length > 0 ? (
            cart.map((i, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <div className="cart-card">
                    <img src={getProductImage(i.pid)} alt={i.pid} />
                    <div style={{ width: "100%" }}>
                      <span className="title-cart">
                        {getProductTitle(i.pid)}
                      </span>
                      <Row>
                        <Col xs={6}>
                          <span className="price-cart">
                            Price {getProductPrice(i.pid)}
                          </span>
                        </Col>
                        <Col xs={6}>
                          <span className="price-cart">
                            Quantity {i.quantity}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => deleteCart(index)} variant="danger">
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            ))
          ) : (
            <span>No items in cart</span>
          )}
        </Offcanvas.Body>
        <div
          className="offcanvas-footer"
          style={{ padding: "12px 1rem", background: "#EFEFEF" }}
        >
          <Button variant="success" onClick={handleShowModal}>
            Checkout
          </Button>
        </div>
      </Offcanvas>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Form onSubmit={placeOrder}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={form.client_name}
                onChange={(e) =>
                  setForm({ ...form, client_name: isValidName(e.target.value) })
                }
                placeholder="Enter Fullname"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={form.client_phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    client_phone: isValidPhone(e.target.value),
                  })
                }
                placeholder="Enter Phone Number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={form.client_address}
                onChange={(e) =>
                  setForm({ ...form, client_address: e.target.value })
                }
                placeholder="Enter Address"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" type="submit" disabled={disabled}>
              Place Order
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer
        position="bottom-start"
        className="p-3"
        style={{ zIndex: 999999 }}
      >
        <Toast
          onClose={() => setToast(false)}
          show={toast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">System</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;

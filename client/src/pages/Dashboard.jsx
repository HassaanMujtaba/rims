import { FaUsers } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { BsBoxes } from "react-icons/bs";
import { BiHomeAlt2 } from "react-icons/bi";
import {
  TotalClients,
  TotalProducts,
  TotalVendors,
  ClientActions,
  ProductActions,
  VendorActions,
  Heading,
  Footer,
  TopContainer,
  FiltersContainer,
} from "../components";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { TbLayoutDashboard } from "react-icons/tb";
import { useRef } from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { NewOrdersTable } from "../components/NewOrdersTable";
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
export const isValidName = (val) => {
  const splitted = val.split("");
  if (chars.includes(splitted[splitted.length - 1])) return val;
  splitted.pop();
  return splitted.join("");
};
export const isValidNumber = (val) => {
  const splitted = val.toString().split("");
  if (!isNaN(splitted[splitted.length - 1]) && splitted.length < 12) return val;
  splitted.pop();
  return splitted.join("");
};
export const Dashboard = ({
  addUser,
  clients,
  setAddUser,
  showProductModal,
  setShowProductModal,
  vendorsList,
  setVendorsList,
  updateVendorList,
}) => {
  const history = useNavigate();
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");
  const [productsList, setProductsList] = useState([]);
  const [addVendorForm, setAddVendorForm] = useState({
    name: "",
    cnic: "",
    profile_picture: "",
    address: "",
    email: "",
    phone_number: "",
  });
  const updateProductList = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setProductsList(res?.data);
  };
  const [addProductForm, setAddProductForm] = useState({
    title: "",
    vendor: "",
    actual_price: "",
    selling_price: "",
    display_picture: "",
    quantity: "",
  });

  const handleAddVendor = async (e) => {
    e.preventDefault();
    if (addVendorForm?.cnic.toString().split("").length !== 13) {
      setError("Invalid CNIC");
      return;
    }
    if (addVendorForm?.phone_number.toString().split("").length !== 11) {
      setError("Invalid Phone Numeber");
      return;
    }
    const formData = new FormData();
    formData.append("file", addVendorForm.profile_picture);
    const imageUpload = await fetch("http://localhost:5000/files", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    formData.append("profile_picture", imageUpload?.data?._id);
    formData.append("name", addVendorForm?.name);
    formData.append("email", addVendorForm?.email);
    formData.append("cnic", addVendorForm?.cnic);
    formData.append("address", addVendorForm?.address);
    formData.append("phone_number", addVendorForm?.phone_number);
    console.log(JSON.stringify(addVendorForm));
    const res = await fetch("http://localhost:5000/vendors", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(res?.message);
    updateVendorList();
    setShowVendorModal(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", addProductForm.display_picture);
    const imageUpload = await fetch("http://localhost:5000/files", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    formData.append("display_picture", imageUpload?.data?._id);
    formData.append("title", addProductForm?.title);
    formData.append("vendor", addProductForm?.vendor);
    formData.append("actual_price", addProductForm?.actual_price);
    formData.append("selling_price", addProductForm?.selling_price);
    formData.append("quantity", addProductForm?.quantity);
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(res?.message);
    setShowProductModal(false);
    updateProductList();
  };

  const filters = [
    {
      action: () => {
        history("?view=dashboard&tab=home");
        setCurrentTab("home");
      },
      icon: <BiHomeAlt2 />,
      title: "home",
    },
    {
      action: () => {
        history("?view=dashboard&tab=clients");
        setCurrentTab("clients");
      },
      icon: <FaUsers />,
      title: "clients",
    },
    {
      action: () => {
        history("?view=dashboard&tab=vendors");
        setCurrentTab("vendors");
      },
      icon: <GiShop />,
      title: "vendors",
    },
    {
      action: () => {
        history("?view=dashboard&tab=products");
        setCurrentTab("products");
      },
      icon: <BsBoxes />,
      title: "products",
    },
  ];

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const updateOrders = async () => {
    const res = await fetch("http://localhost:5000/orders").then((res) =>
      res.json()
    );
    setOrders(res?.data);
  };
  useEffect(() => {
    updateOrders();
  }, []);
  const filterRef = useRef();
  let oldScroll = 0;
  let scrollY = 0;

  const showSecondaryNav = () => {
    window.onscroll = (e) => {
      scrollY = window.pageYOffset;
      if (filterRef.current)
        filterRef.current.style.top = oldScroll > scrollY ? "80px" : "0";
      oldScroll = scrollY;
    };
  };

  useEffect(() => {
    if (filterRef && filterRef.current.style) {
      showSecondaryNav();
    }
  });

  function sortMonths(months) {
    const monthOrder = [
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
    ];

    months.sort((a, b) => {
      const indexA = monthOrder.indexOf(a);
      const indexB = monthOrder.indexOf(b);
      return indexA - indexB;
    });

    return months;
  }

  const months = [
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
  ];

  useEffect(() => {
    updateVendorList();
    updateProductList();
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((res) => {
        const orders = res?.data;
        const dates = [];
        const orderTotal = [];
        let total = 0;
        orders.map((order) => {
          const curr = new Date(order.date);
          const today = new Date();
          order.items.map((item) => {
            return (total += parseInt(item?.quantity));
          });
          if (today.getFullYear() === curr.getFullYear()) {
            if (!dates.includes(curr.getMonth())) {
              dates.push(months[curr.getMonth()]);
            }
            if (months[curr.getMonth()] !== dates[dates.length - 2]) {
              console.log(total);
              orderTotal.push(total);
              total = 0;
            }
          }
          return "";
        });
        orderTotal[orderTotal.length - 1] += total;
        const uniqueDates = new Set([...dates]);
        const datasets = chartData.datasets;
        datasets[0].data = orderTotal;
        setChartData({
          ...chartData,
          labels: sortMonths([...uniqueDates]),
          datasets: [...datasets],
        });
      });
  }, []);

  useEffect(() => {
    const { tab } = queryString.parse(window.location.search);
    if (tab) setCurrentTab(tab);
    // eslint-disable-next-line
  }, [window.location]);

  const [chartData, setChartData] = useState({
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
  });
  const handleAddUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch("http://localhost:5000/users/", {
      method: "POST",
      body: formData,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res?.message);
        setAddUser(false);
      });
  };

  return (
    <>
      <TopContainer>
        <div className="topHeading">Dashboard</div>
        <div className="profilePicture">
          <TbLayoutDashboard />
        </div>
        <div className="stats">
          <div className="statsContainer">
            <TotalClients data={clients.length} />
            <TotalVendors data={vendorsList} />
            <TotalProducts data={productsList} />
          </div>
        </div>
      </TopContainer>
      <FiltersContainer refer={filterRef}>
        {filters.map((filter, index) => (
          <Button
            key={index}
            className={`my-custom-btn${
              currentTab !== filter.title ? "-inverse" : ""
            }`}
            onClick={filter.action}
            style={{ textTransform: "capitalize" }}
          >
            {filter.icon} {filter.title}
          </Button>
        ))}
      </FiltersContainer>
      {currentTab === "home" && (
        <>
          <Heading heading={"Statistics"} />
          <Container fluid>
            <div className="d-flex align-items-start justify-content-between">
              <div className="dashboardCard1">
                <h2 className="mb-3">Yearly Sales</h2>
                <Line data={chartData} options={{ responsive: true }} />
              </div>
              <div className="dashboardCard2">
                <h2 className="mb-3">New Orders</h2>
                <NewOrdersTable
                  data={orders.filter((i) => i.status === "new")}
                />
              </div>
            </div>
          </Container>
        </>
      )}
      {currentTab === "clients" && (
        <>
          <Heading heading={"Explore Clients"} />
          <ClientActions clients={clients} />
        </>
      )}
      {currentTab === "vendors" && (
        <>
          <Heading
            heading={"Explore Vendors"}
            buttons={[
              { title: "Add Vendor", action: () => setShowVendorModal(true) },
            ]}
          />
          <VendorActions
            updateVendorList={updateVendorList}
            data={vendorsList}
          />
        </>
      )}
      {currentTab === "products" && (
        <>
          <Heading
            heading={"Explore Products"}
            buttons={[
              { title: "Add Product", action: () => setShowProductModal(true) },
            ]}
          />
          <ProductActions arr={productsList} />
        </>
      )}
      {currentTab === "home" && <Footer />}

      <Modal
        className="modal-custom modal-xl"
        show={showVendorModal}
        onHide={() => setShowVendorModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>
        <Form className="custom-form" onSubmit={handleAddVendor}>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter Fullname"
                    value={addVendorForm?.name}
                    onChange={(e) =>
                      setAddVendorForm({
                        ...addVendorForm,
                        name: isValidName(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder="Enter Address"
                    value={addVendorForm?.address}
                    onChange={(e) =>
                      setAddVendorForm({
                        ...addVendorForm,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setAddVendorForm({
                        ...addVendorForm,
                        profile_picture: e.target.files[0],
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>CNIC</Form.Label>
                  <Form.Control
                    placeholder="Enter CNIC number"
                    value={addVendorForm?.cnic}
                    type="number"
                    onChange={(e) =>
                      setAddVendorForm({
                        ...addVendorForm,
                        cnic: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Enter Email"
                    type="email"
                    value={addVendorForm?.email}
                    onChange={(e) =>
                      setAddVendorForm({
                        ...addVendorForm,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    placeholder="Enter phone number"
                    value={addVendorForm?.phone_number}
                    onChange={(e) =>
                      setAddVendorForm({
                        ...addVendorForm,
                        phone_number: isValidNumber(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>{error && <p className="text-danger">{error}</p>}</Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="my-custom-btn mb-3"
              onClick={() => {
                setShowVendorModal(false);
                setAddVendorForm({
                  name: "",
                  cnic: "",
                  profile_picture: "",
                  address: "",
                  email: "",
                  phone_number: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="my-custom-btn-inverse mb-3">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        className="modal-custom modal-xl"
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form className="custom-form" onSubmit={handleAddProduct}>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder="Enter title"
                    value={addProductForm?.title}
                    onChange={(e) =>
                      setAddProductForm({
                        ...addProductForm,
                        title: isValidName(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
                <p className="text-muted">
                  Note: This name may be visible to ecommerce site
                </p>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Vendor</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setAddProductForm({
                        ...addProductForm,
                        vendor: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select vendor</option>
                    {vendorsList.map((vendor, index) => (
                      <option key={index} value={vendor?._id}>
                        {vendor?.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <p
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowVendorModal(true)}
                >
                  Add New Vendor
                </p>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Actual Price</Form.Label>
                  <Form.Control
                    placeholder="Enter actual price"
                    value={addProductForm?.actual_price}
                    type="number"
                    onChange={(e) =>
                      setAddProductForm({
                        ...addProductForm,
                        actual_price: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control
                    placeholder="Enter selling price"
                    value={addProductForm?.selling_price}
                    type="number"
                    onChange={(e) =>
                      setAddProductForm({
                        ...addProductForm,
                        selling_price: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Display Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setAddProductForm({
                        ...addProductForm,
                        display_picture: e.target.files[0],
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    placeholder="Enter quantity"
                    value={addProductForm?.quantity}
                    onChange={(e) =>
                      setAddProductForm({
                        ...addProductForm,
                        quantity: e.target.value,
                      })
                    }
                    type="number"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="my-custom-btn mb-3"
              onClick={() => {
                setShowProductModal(false);
                setAddProductForm({
                  title: "",
                  vendor: "",
                  actual_price: "",
                  selling_price: "",
                  display_picture: "",
                  quantity: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="my-custom-btn-inverse mb-3">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        className="modal-custom modal-xl"
        show={addUser}
        onHide={() => setAddUser(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Form className="custom-form" onSubmit={handleAddUser}>
          <Modal.Body>
            <Row>
              <Col sm={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    placeholder="Enter Username"
                    name="username"
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="Enter Password"
                    name="password1"
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    placeholder="Confirm Password"
                    name="password2"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="my-custom-btn mb-3"
              onClick={() => {
                setShowProductModal(false);
                setAddProductForm({
                  title: "",
                  vendor: "",
                  actual_price: "",
                  selling_price: "",
                  display_picture: "",
                  quantity: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="my-custom-btn-inverse mb-3">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

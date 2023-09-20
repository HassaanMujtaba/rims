import {
  Heading,
  TotalNewOrders,
  TotalPendingOrders,
  TotalDispatchedOrders,
  TopContainer,
  FiltersContainer,
} from "../components";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { BsBoxes } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { NewOrders } from "../components/NewOrders";

export const Orders = () => {
  const history = useNavigate();
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("new");
  const [orders, setOrders] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [myId, setMyId] = useState(null);
  const [status, setStatus] = useState(null);
  const handleStatus = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/orders/${myId}/${status}`, {
      method: "PUT",
    });
    updateOrders();
    setShowViewOrderModal(false);
  };
  const updateProducts = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setProducts(res?.data);
  };
  const updateOrders = async () => {
    const res = await fetch("http://localhost:5000/orders").then((res) =>
      res.json()
    );
    setOrders(res?.data);
  };
  useEffect(() => {
    updateOrders();
    updateProducts();
  }, []);
  const getNameProduct = (id) => {
    const res = products.filter((p) => p._id == id);
    return res[0]?.title;
  };
  const getPriceProduct = (id) => {
    const res = products.filter((p) => p._id == id);
    return res[0]?.selling_price;
  };
  const filters = [
    {
      action: () => {
        history("?view=orders&tab=new");
        setCurrentTab("new");
      },
      title: "new",
    },
    {
      action: () => {
        history("?view=orders&tab=processing");
        setCurrentTab("processing");
      },
      title: "processing",
    },
    {
      action: () => {
        history("?view=orders&tab=dispatched");
        setCurrentTab("dispatched");
      },
      title: "dispatched",
    },
    {
      action: () => {
        history("?view=orders&tab=delivered");
        setCurrentTab("delivered");
      },
      title: "delivered",
    },
    {
      action: () => {
        history("?view=orders&tab=delivered");
        setCurrentTab("myself");
      },
      title: "myself",
    },
  ];
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

  useEffect(() => {
    const { tab } = queryString.parse(window.location.search);
    if (tab) setCurrentTab(tab);
    // eslint-disable-next-line
  }, [window.location]);
  return (
    <>
      <TopContainer>
        <div className="topHeading">Orders</div>
        <div className="profilePicture">
          <BsBoxes />
        </div>
        <div className="stats">
          <div className="statsContainer">
            <TotalNewOrders
              data={orders.filter((i) => i.status === "new").length}
            />
            <TotalPendingOrders
              data={orders.filter((i) => i.status === "processing").length}
            />
            <TotalDispatchedOrders
              data={orders.filter((i) => i.status === "dispatched").length}
            />
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
            {filter.title}
          </Button>
        ))}
      </FiltersContainer>
      {currentTab === "new" && (
        <>
          <Heading heading={"New Orders"} />
          <NewOrders
            actionItem={setMyItems}
            actionId={setMyId}
            arr={orders.filter((i) => i.status === "new")}
            setShow={setShowViewOrderModal}
          />
        </>
      )}
      {currentTab === "processing" && (
        <>
          <Heading heading={"Processing Orders"} />
          <NewOrders
            actionItem={setMyItems}
            actionId={setMyId}
            arr={orders.filter((i) => i.status === "processing")}
            setShow={setShowViewOrderModal}
          />
        </>
      )}
      {currentTab === "dispatched" && (
        <>
          <Heading heading={"Dispatched Orders"} />
          <NewOrders
            actionItem={setMyItems}
            actionId={setMyId}
            arr={orders.filter((i) => i.status === "dispatched")}
            setShow={setShowViewOrderModal}
          />
        </>
      )}
      {currentTab === "delivered" && (
        <>
          <Heading heading={"Delivered Orders"} />
          <NewOrders
            actionItem={setMyItems}
            actionId={setMyId}
            arr={orders.filter((i) => i.status === "delivered")}
            setShow={setShowViewOrderModal}
          />
        </>
      )}

      <Modal
        className="modal-custom modal-xl"
        show={showViewOrderModal}
        onHide={() => setShowViewOrderModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qunatity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {myItems.map((i, index) => (
                <tr key={index}>
                  <td>{getNameProduct(i.pid)}</td>
                  <td>{i.quantity}</td>
                  <td>{getPriceProduct(i.pid) * i.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Form onSubmit={handleStatus}>
          <Modal.Footer>
            <Row>
              <Col xs={6}>
                <Form.Select
                  id="status"
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="new">New</option>
                  <option value="processing">Processing</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                </Form.Select>
              </Col>
              <Col xs={6}>
                <Button type="submit" className="my-custom-btn-inverse mb-3">
                  Update
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

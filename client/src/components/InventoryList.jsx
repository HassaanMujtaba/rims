import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { Loading } from "./Loading";
import { NavCard } from "./NavCard";
import { isValidName } from "../pages";

export const InventoryList = ({ arr, updateData }) => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const updateVendorList = async () => {
    const res = await fetch("http://localhost:5000/vendors").then((res) =>
      res.json()
    );
    setVendorList(res?.data);
  };
  const [uid, setUid] = useState(-1);
  const [addProductForm, setAddProductForm] = useState({
    title: "",
    vendor: "",
    actual_price: "",
    selling_price: "",
    quantity: "",
  });
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/products/${uid}`, {
      method: "PUT",
      body: JSON.stringify(addProductForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          alert(res?.message);
          updateData();
          setShowProductModal(false);
        }
      });
  };
  const editForm = (id) => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          setAddProductForm({
            title: res?.data?.title,
            vendor: res?.data?.vendor,
            actual_price: res?.data?.actual_price,
            selling_price: res?.data?.selling_price,
            quantity: res?.data?.quantity,
          });
          setShowProductModal(true);
          setUid(id);
        }
      });
  };
  const Card = ({
    title,
    Vendor,
    ActualPrice,
    SellingPrice,
    image,
    remaining,
    status,
    id,
    onClick,
  }) => {
    const [name, setName] = useState(null);
    const getVendorName = async (id) => {
      const res = await fetch(`http://localhost:5000/vendors/${id}`).then(
        (res) => res.json()
      );
      setName(res?.data?.name);
    };
    useEffect(() => {
      getVendorName(Vendor);
    }, [Vendor]);
    return (
      <Col className="mb-3" lg={3} md={6} sm={12}>
        <NavCard
          imageSrc={`http://localhost:5000/files/${image}`}
          title={title}
          details={[
            { heading: "Vendor", paragraph: name },
            { heading: "Actual Price", paragraph: ActualPrice },
            { heading: "Selling Price", paragraph: SellingPrice },
            { heading: "Remaining", paragraph: remaining },
          ]}
          buttons={true}
          status={status}
          id={id}
          onClick={onClick}
          editable={true}
          edit={editForm}
          statusCheck={true}
        />
      </Col>
    );
  };
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setTimeout(
      () => {
        fetchData(page);
      },
      page > 1 ? 1000 : 0
    );
    // eslint-disable-next-line
  }, [page]);
  const fetchData = (page) => {
    const newItems = arr.slice((page - 1) * 12, page * 12);
    if (page * 12 >= arr.length) {
      setHasMore(false);
    }
    setItems([...items, ...newItems]);
  };
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line
  }, [items]);
  useEffect(() => {
    updateVendorList();
  }, []);
  const changeProductStatus = (id, action) => {
    if (action === "ENABLE") {
      return fetch(`http://localhost:5000/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: true }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.status === 200) {
            updateData();
          }
        });
    }
    return fetch(`http://localhost:5000/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: false }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          updateData();
        }
      });
  };
  return (
    <>
      <Row className="p-3 px-5 m-0 mb-3">
        {arr &&
          arr.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              Vendor={item.vendor}
              ActualPrice={item.actual_price}
              SellingPrice={item.selling_price}
              image={item?.display_picture}
              remaining={parseInt(item?.quantity)}
              status={item?.status}
              id={item?._id}
              onClick={changeProductStatus}
            />
          ))}
      </Row>
      {hasMore && <Loading />}
      <Modal
        className="modal-custom modal-xl"
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form className="custom-form" onSubmit={handleUpdateProduct}>
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
                    {/* <option value={addProductForm?.vendor}>
                      {
                        vendorList.find(
                          (i) => i?._id === addProductForm?.vendor
                        )?.name
                      }
                    </option> */}
                    {vendorList &&
                      vendorList.map((vendor, index) => (
                        <option
                          selected={vendor?._id === addProductForm?.vendor}
                          key={index}
                          value={vendor?._id}
                        >
                          {vendor?.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
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
              {/* <Col sm={6}>
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
              </Col> */}
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
    </>
  );
};

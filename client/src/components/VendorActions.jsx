import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Loading } from "./Loading";
import { NavCard } from "./NavCard";
import { isValidName, isValidNumber } from "../pages";

export const VendorActions = ({ updateVendorList }) => {
  const [error, setError] = useState(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [uid, setUid] = useState(-1);
  const [addVendorForm, setAddVendorForm] = useState({
    name: "",
    cnic: "",
    address: "",
    email: "",
    phone_number: "",
  });
  const editForm = (id) => {
    fetch(`http://localhost:5000/vendors/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          setAddVendorForm({
            name: res?.data?.name,
            cnic: res?.data?.cnic,
            address: res?.data?.address,
            email: res?.data?.email,
            phone_number: res?.data?.phone_number,
          });
          setShowVendorModal(true);
          setUid(id);
        }
      });
  };

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
    formData.append("name", addVendorForm?.name);
    formData.append("email", addVendorForm?.email);
    formData.append("cnic", addVendorForm?.cnic);
    formData.append("address", addVendorForm?.address);
    formData.append("phone_number", addVendorForm?.phone_number);
    console.log(JSON.stringify(addVendorForm));
    const res = await fetch(`http://localhost:5000/vendors/${uid}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          alert(res?.message);
          setShowVendorModal(false);
          window.location.reload();
        }
      })
      .catch((res) => {
        alert(res?.message);
      });
  };
  const Card = ({ title, CNIC, Address, Email, image, id }) => {
    return (
      <Col className="mb-3" lg={3} md={6} sm={12}>
        <NavCard
          imageSrc={`http://localhost:5000/files/${image}`}
          title={title}
          details={[
            { heading: "CNIC", paragraph: CNIC },
            { heading: "Address", paragraph: Address },
            { heading: "Email", paragraph: Email },
          ]}
          buttons={true}
          editable={true}
          edit={editForm}
          id={id}
        />
      </Col>
    );
  };
  const updateItems = async () => {
    const res = await fetch("http://localhost:5000/vendors").then((res) =>
      res.json()
    );
    setArr(res?.data);
  };
  const [arr, setArr] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    updateItems();
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
  }, [items, arr]);
  return (
    <>
      <Row className="p-3 px-5 m-0 mb-3">
        {arr.map((item, index) => (
          <Card
            key={index}
            title={item.name}
            CNIC={item.cnic}
            Address={item.address}
            Email={item.email}
            image={item?.profile_picture}
            id={item?._id}
          />
        ))}
      </Row>
      {hasMore && <Loading />}
      <Modal
        className="modal-custom modal-xl"
        show={showVendorModal}
        onHide={() => setShowVendorModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Vendor</Modal.Title>
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
              UPDATE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

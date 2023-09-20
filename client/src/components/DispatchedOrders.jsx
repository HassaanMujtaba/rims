import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Loading } from "./Loading";
import { OrderCard } from "./OrderCard";

export const DispatchedOrders = ({ setShow }) => {
  const arr = new Array(101).fill(
    <Col lg={3} md={6} sm={12} className="mb-3">
      <OrderCard
        imageSrc={require("../assets/1.gif")}
        setShow={setShow}
        title="Abdul Raheem"
        details={[
          { heading: "Phone", paragraph: "03004871213" },
          { heading: "Address", paragraph: "Johar Town, Lahore" },
          { heading: "Email", paragraph: "arhexlabs@gmail.com" },
        ]}
      />
    </Col>
  );
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
  return (
    <>
      <Row className="p-3 px-5 m-0 mb-3">
        {items.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </Row>
      {hasMore && <Loading />}
    </>
  );
};

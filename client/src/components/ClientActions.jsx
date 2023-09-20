import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Loading } from "./Loading";
import { NavCard } from "./NavCard";

export const ClientActions = ({ clients }) => {
  const Card = ({ title, phone, address }) => (
    <Col lg={3} md={6} sm={12} className="mb-3">
      <NavCard
        title={title}
        details={[
          { heading: "Phone", paragraph: phone },
          { heading: "Address", paragraph: address },
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
    const newItems = clients.slice((page - 1) * 12, page * 12);
    if (page * 12 >= clients.length) {
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
        {clients.map((item, index) => (
          <Card
            key={index}
            phone={item.client_phone}
            title={item.client_name}
            address={item.client_address}
          />
        ))}
      </Row>
      {hasMore && <Loading />}
    </>
  );
};

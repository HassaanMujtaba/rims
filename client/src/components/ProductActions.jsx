import { Row, Col } from "react-bootstrap";
import { NavCard } from "./NavCard";
import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";

export const ProductActions = ({ arr }) => {
  const Card = ({ title, Vendor, ActualPrice, SellingPrice, image }) => {
    const [name, setName] = useState(null);
    const getVendorName = async (id) => {
      const res = await fetch(`http://localhost:5000/vendors/${id}`).then(
        (res) => res.json()
      );
      setName(res?.data?.name);
    };
    useEffect(() => {
      getVendorName(Vendor);
    }, []);
    return (
      <Col className="mb-3" lg={3} md={6} sm={12}>
        <NavCard
          imageSrc={`http://localhost:5000/files/${image}`}
          title={title}
          details={[
            { heading: "Vendor", paragraph: name },
            { heading: "Actual Price", paragraph: ActualPrice },
            { heading: "Selling Price", paragraph: SellingPrice },
          ]}
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
  }, [page, arr]);
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
        {arr.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            Vendor={item.vendor}
            ActualPrice={item.actual_price}
            SellingPrice={item.selling_price}
            image={item?.display_picture}
          />
        ))}
      </Row>
      {hasMore && <Loading />}
    </>
  );
};

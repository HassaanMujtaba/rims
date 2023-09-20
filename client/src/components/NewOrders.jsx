import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Loading } from './Loading';
import { OrderCard } from './OrderCard';

export const NewOrders = ({ arr, setShow, actionItem, actionId }) => {
  const Card = ({ id, client_name, client_phone, client_address, items }) => (
    <Col lg={3} md={6} sm={12} className='mb-3'>
      <OrderCard
        setShow={setShow}
        action={() => {
          actionItem(items);
          actionId(id);
        }}
        title={id}
        details={[
          { heading: 'Name', paragraph: client_name },
          { heading: 'Phone', paragraph: client_phone },
          { heading: 'Address', paragraph: client_address },
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
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line
  }, [items]);
  return (
    <>
      <Row className='p-3 px-5 m-0 mb-3'>
        {arr.map((item, index) => (
          <Card
            key={index}
            id={item?._id}
            client_name={item?.client_name}
            client_phone={item?.client_phone}
            client_address={item?.client_address}
            items={item?.items}
          />
        ))}
      </Row>
      {hasMore && <Loading />}
    </>
  );
};

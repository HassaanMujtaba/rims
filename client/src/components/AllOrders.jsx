import { Row } from "react-bootstrap";
import { OrderCard } from "./OrderCard";

export const AllOrders = ({ setShow }) => {
  return (
    <Row className="p-3 px-5 m-0 mb-3">
      <OrderCard
        setShow={setShow}
        title="Abdul Raheem"
        details={[
          { heading: "CNIC", paragraph: "3810361753177" },
          { heading: "Address", paragraph: "Johar Town, Lahore" },
          { heading: "Email", paragraph: "arhexlabs@gmail.com" },
          { heading: "Phone Number", paragraph: "+923004871213" },
        ]}
      />
      <OrderCard
        setShow={setShow}
        title="Abdul Raheem"
        details={[
          { heading: "CNIC", paragraph: "3810361753177" },
          { heading: "Address", paragraph: "Johar Town, Lahore" },
          { heading: "Email", paragraph: "arhexlabs@gmail.com" },
          { heading: "Phone Number", paragraph: "+923004871213" },
        ]}
      />
      <OrderCard
        setShow={setShow}
        title="Abdul Raheem"
        details={[
          { heading: "CNIC", paragraph: "3810361753177" },
          { heading: "Address", paragraph: "Johar Town, Lahore" },
          { heading: "Email", paragraph: "arhexlabs@gmail.com" },
          { heading: "Phone Number", paragraph: "+923004871213" },
        ]}
      />
      <OrderCard
        setShow={setShow}
        title="Abdul Raheem"
        details={[
          { heading: "CNIC", paragraph: "3810361753177" },
          { heading: "Address", paragraph: "Johar Town, Lahore" },
          { heading: "Email", paragraph: "arhexlabs@gmail.com" },
          { heading: "Phone Number", paragraph: "+923004871213" },
        ]}
      />
    </Row>
  );
};

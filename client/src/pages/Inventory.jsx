import { Heading, TopContainer, TotalProducts } from "../components";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { InventoryList } from "../components/InventoryList";
import { MdOutlineInventory2 } from "react-icons/md";
import { TotalProductsCost } from "../components/TotalProductsCost";

export const Inventory = ({ setShowProductModal, vendorList, updateVendorList }) => {
  const [data, setData] = useState([]);
  const updateData = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setData(res?.data);
    console.log(res?.data);
  };
  useEffect(() => {
    updateData();
  }, []);
  return (
    <>
      <TopContainer>
        <div className="topHeading">Inventory</div>
        <div className="profilePicture">
          <MdOutlineInventory2 />
        </div>
        <div className="stats">
          <div className="statsContainer">
            {/* <TotalProducts /> */}
            <TotalProductsCost data={data} />
          </div>
        </div>
      </TopContainer>

      <Heading heading={"Inventory List"} />
      <InventoryList
      updateVendorList={updateVendorList}
        vendorList={vendorList}
        setShowProductModal={setShowProductModal}
        arr={data}
        updateData={updateData}
      />
    </>
  );
};

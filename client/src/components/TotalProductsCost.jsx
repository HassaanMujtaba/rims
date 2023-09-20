import { useEffect, useState } from "react";

export const TotalProductsCost = ({ data }) => {
  const [price, setPrice] = useState(0);
  const calculateTotalCost = () => {
    let total = 0;
    data.map((i) => {
      total += parseFloat(i.actual_price) * i.quantity;
    });
    setPrice(total);
  };
  useEffect(() => {
    calculateTotalCost();
  }, [data]);

  return (
    <div className="numbersCard">
      <div>
        <span className="number">{price} PKR</span>
        <span className="heading">Total Cost</span>
      </div>
    </div>
  );
};

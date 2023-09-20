export const TotalNewOrders = ({data}) => {
  return (
    <div className="numbersCard">
      <div>
        <span className="number">{data}</span>
        <span className="heading">New Orders</span>
      </div>
    </div>
  );
};

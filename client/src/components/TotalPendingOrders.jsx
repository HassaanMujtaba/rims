export const TotalPendingOrders = ({data}) => {
  return (
    <div className="numbersCard">
      <div>
        <span className="number">{data}</span>
        <span className="heading">Pending</span>
      </div>
    </div>
  );
};

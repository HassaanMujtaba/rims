export const TotalDispatchedOrders = ({data}) => {
  return (
    <div className="numbersCard">
      <div>
        <span className="number">{data}</span>
        <span className="heading">Dispatched</span>
      </div>
    </div>
  );
};

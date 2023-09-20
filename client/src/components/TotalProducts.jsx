export const TotalProducts = ({data}) => {
  return (
    <div className="numbersCard">
      <div>
        <span className="number">{data.length}</span>
        <span className="heading">Products</span>
      </div>
    </div>
  );
};

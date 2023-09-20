export const TotalVendors = ({data}) => {
  return (
    <div className="numbersCard">
      <div>
        <span className="number">{data.length}</span>
        <span className="heading">Vendors</span>
      </div>
    </div>
  );
};

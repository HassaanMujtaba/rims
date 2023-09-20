export const TotalClients = ({data}) => {
  return (
    <div className="numbersCard">
      <div>
        <span className="number">{data}</span>
        <span className="heading">Clients</span>
      </div>
    </div>
  );
};

import { Table } from "react-bootstrap";

export const NewOrdersTable = ({ data }) => {
  return (
    <Table hover variant="dark" className="myTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((i, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{i.client_name}</th>
              <th>{i.client_phone}</th>
              <th>{i.client_address}</th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

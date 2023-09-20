import { FaUser } from "react-icons/fa";

export const UserNavbar = ({username}) => {
  return (
    <div title={username} className="UserNavbarContainer">
      <div className="UserNavbar">
        <FaUser />
        <span>Administrator</span>
      </div>
    </div>
  );
};

import { AiOutlineClose } from "react-icons/ai";

export const CloseButton = (props) => {
  return (
    <button onClick={() => props.close(false)} className="btn btn-secondary bg-dark d-flex align-items-center p-2">
      <AiOutlineClose/>
    </button>
  );
};

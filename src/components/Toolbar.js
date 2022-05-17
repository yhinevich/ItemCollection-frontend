import { Button } from "react-bootstrap";
import * as Icons from "../icons";

function Toolbar({ onBlockClick, disabled, onDeleteClick }) {
  return (
    <>
      <Button
          color="#ff5c5c"
        disabled={disabled}
        type="button"
        onClick={onBlockClick}
      >Ban</Button>
      <Button
        variant="secondary"
        disabled={disabled}
        type="button"
        onClick={onBlockClick}
      >Remove ban</Button>
      <Button
        variant="danger"
        disabled={disabled}
        type="button"
        onClick={onDeleteClick}
      >Delete</Button>
    </>
  );
}

export default Toolbar;

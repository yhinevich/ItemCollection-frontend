import { Button } from "react-bootstrap";

function UserBar({ onLogOut, user }) {
  return (
    <div className="user-bar-container d-flex justify-content-end">
        <h3> <span className="color-nav">{user}</span></h3>
      <Button onClick={onLogOut} type="button" className="ml-4 logout-btn">
        Log Out
      </Button>
    </div>
  );
}

export default UserBar;

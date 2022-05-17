import { Button } from "react-bootstrap";
import * as Icons from "../icons";

function ToolbarItems({ onAddClick }) {
    return (
        <>
            <Button
                color="#ff5c5c"
                type="button"
                onClick={onAddClick}
            >Add</Button>
        </>
    );
}

export default ToolbarItems;

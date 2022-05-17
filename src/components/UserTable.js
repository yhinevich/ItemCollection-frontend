import {Table} from "react-bootstrap";

function UserTable({handleChangeAll, handleChange, users}) {
    let counter = 1;
    return (
        <Table bordered bgcolor="white">
            <thead>
            <tr>
                <th>
                    <input id="select-all" type="checkbox" onChange={handleChangeAll}/>
                </th>
                <th>№</th>
                <th>Name</th>
                <th>mail</th>
                <th>Registration Date</th>
                <th>Was online</th>
                <th><center>Status</center></th>
                <th><center>Banned</center></th>
            </tr>
            </thead>
            <tbody>
            {users.map(({_id, name, email, signUpDate, lastVisit, isOnline, isBlocked}) => (
                <tr key={_id} className="render-table">
                    <td className="checkboxes-list">
                        <input
                            data-id={counter - 1}
                            id={_id}
                            type="checkbox"
                            onChange={handleChange}
                        />
                    </td>
                    <td>{counter++}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{signUpDate}</td>
                    <td>{lastVisit}</td>
                    <td className={`status-${isOnline ? `online` : `offline`}`}>
                        <center>{isOnline ? "Online" : "Offline"}</center>
                    </td>
                    <td className={`status-${isBlocked ? `blocked` : `not-blocked`}`}>
                        <center>{isBlocked ? "banned" : "active"}</center>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default UserTable;

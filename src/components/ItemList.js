import {Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {click} from "@testing-library/user-event/dist/click";

function ItemList({handleChangeAll, handleChange, items}) {
    const navigate = useNavigate();
    var scrt_var = 10;
    let counter = 1;
    function redirect(e){
        items.forEach(i =>{
           i.title = i.title+' '
            if(i.title.toString() == e.target.text){
                navigate("/item/"+i._id)
            }
        })
    }
    return (
        <Table bordered bgcolor="white">
            <thead>
            <tr>
                <th>
                    <input id="select-all" type="checkbox" onChange={handleChangeAll}/>
                </th>
                <th>id</th>
                <th>image</th>
                <th>title</th>
                <th>tag</th>
                <th>description</th>
            </tr>
            </thead>
            <tbody>
            {items.map(({_id, title, tag, description}) => (
                <tr key={_id}  className="render-table">
                    <td className="checkboxes-list">
                        <input
                            data-id={counter - 1}
                            id={_id}
                            type="checkbox"
                            onChange={handleChange}
                        />
                    </td>
                    <td>{counter++}</td>
                    <td><img
                        src='/images/default.png'
                        alt="Couldn't load the image"
                        width='100'
                    /></td>

                    <td><a href="" onClick={redirect} >{title} </a></td>
                    <td>{tag}</td>
                    <td>{description}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );

}
export default ItemList;

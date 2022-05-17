import {Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
let item_set=[]

function Collection({handleChangeAll, handleChange, items, collections}) {
    let counter = 1;
    const navigate = useNavigate();

    let docFrag = document.createDocumentFragment();


    collections.forEach(function(collection_name, i)
    {
        var collection = document.createElement('button');
        collection.className = "coll_btn"
        docFrag.appendChild(collection);
        collection.innerHTML = collection_name

        //This is the problem area:
        collection.onclick = function(){

            collection_chosen(i);
        }
    });
    document.body.append(docFrag);

    return (
            <Table bordered bgcolor="white">
            <thead>
            <tr>
                <th>
                    <input id="select-all" type="checkbox" onChange={handleChangeAll}/>
                </th>
                <th>id</th>
                <th>title</th>
                <th>tag</th>
                <th>description</th>
            </tr>
            </thead>
            <tbody>
            {items.map(({_id, title, tag, description}) => (
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
                    <td><a href="" onClick={redirect} >{title} </a></td>
                    <td>{tag}</td>
                    <td>{description}</td>
                </tr>
            ))}
            </tbody>
        </Table>

    );

    function redirect(e){
        items.forEach(i =>{
            i.title = i.title+' '
            if(i.title.toString() == e.target.text){
                navigate("/item/"+i._id)
            }
        })
    }

    function collection_chosen(int){
        navigate("/collection"+"#"+collections[int]);
        document.querySelectorAll(".coll_btn").forEach(function(c){
            c.parentNode.removeChild(c);
        });
    }
}

export default Collection;

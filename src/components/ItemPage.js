import {Image, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
let item_set=[]

function Collection({was_found, item, comments}) {
    let counter = 1;
    const navigate = useNavigate();


    let docFrag = document.createDocumentFragment();


    comments.forEach(function(comment, i)
    {
        var block = document.createElement('div');
        block.className = "comment_div"
        docFrag.appendChild(block);
        block.innerHTML = "<h4 class='comment_author'>"+comment.user_id+"</h4><h4 class='comment_context'>"+comment.context+"</h4>"
    });
    document.body.append(docFrag);

    return (
        <Table bordered bgcolor="white">
            <thead>
            <tr>

                <td width="200">image</td>
                <th>title</th>
                <th>tag</th>
                <th>description</th>
            </tr>
            </thead>
            <tbody>
                <tr key={item._id} className="render-table">
                    <td><img
                        src='/images/default.png'
                        alt="Couldn't load the image"
                        width='200'
                    /></td>
                    <td><a href="" onClick={redirect}>{item.title} </a></td>
                    <td>{item.tag}</td>
                    <td>{item.description}</td>
                </tr>

            </tbody>
        </Table>

    );

    function redirect(e){
        item.forEach(i =>{
            i.title = i.title+' '
            if(i.title.toString() == e.target.text){
                navigate("/item/"+i._id)
            }
        })
    }
}

export default Collection;

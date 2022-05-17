import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import userOperations from "../redux/user-redux/user-operations";
import authOperations from "../redux/auth-redux/auth-operations";
import itemOperations from "../redux/items-redux/item-operations";
import ToolbarItems from "../components/ToolbarItems";
import ItemList from "../components/ItemList";
import {Form} from "react-bootstrap";
import config from "../config.js";


function ItemView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let list=[];

    //let items_s = [{"_id":"6280318ada448242fe013df8","title":"asss","tag":"asdssssss","description":"asdasdasdasdasd","addDate":"15.05.2022","__v":0},{"_id":"62803351da448242fe013dfb","title":"Moby dick","tag":"book","description":"Idk what is this book about","addDate":"15.05.2022","__v":0},{"_id":"62803501da448242fe013e02","title":"Moby dick1","tag":"asd","description":"asdasd","addDate":"15.05.2022","__v":0}]
        const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [markedItemsItems, setMarkedItemsItems] = useState([]);
    //const getItemsItems = useSelector(state => state.items.points);
    const isLogged = useSelector(state => state.auth.loginedUser.token);
    const currentUserId = useSelector(state => state.auth.loginedUser.userId);

    const handleChange = useCallback(e => {
        if(list.includes(e.target.id)){
            list.pop(e.target.id)
        }else list.push(e.target.id)


    });

    // const handleChangeAll = useCallback(e => {
    //     let { checked } = e.target;
    //     const listRef = document.querySelectorAll(".render-table");
    //     listRef.forEach(el => (el.firstChild.firstElementChild.checked = checked));
    //     setMarkedItemsItems(checked ? [...items] : []);
    // });

    const onAddClick = () => {
        const form = document.getElementById('collection_name');
        let coll_name =  form.elements['collection_name'].value;
        console.log(coll_name)
        if(coll_name == undefined || coll_name == ""){
            coll_name = "main"
        }
        console.log(list);
        for(let i=0;i<list.length;i++){
            let body = {
                user_id: currentUserId,
                item_id: list[i],
                collection_name: coll_name
            }
                //console.log(JSON.stringify(body))
            console.log(sendJSON(config.server_host_name + "/app/item-collection", body))
        }
        // dispatch(itemOperations.listItems(ids));
        //
        // const updatedUsers = [...users];
        // _.pullAllWith(updatedUsers, markedItemsItems, _.isEqual);
        // setMarkedItemsItems([]);
        // setUsers([...updatedUsers]);
    };



    useEffect(() => {
        document.querySelector("#select-all").checked =
            items.length === markedItemsItems.length ? true : false;
    }, [markedItemsItems, items]);


    useEffect(() => {
        if (!isLogged) navigate("/sign-in");
    }, [isLogged]);

    let str = httpGet(config.server_host_name + "/app/items");

    return (
        <>

            <center><span className="color-title">List of items</span> </center>
            <Form className="center-all" id="collection_name">
            <Form.Group className="mb-4" >
                <center><Form.Label><span className="color-nav">Enter collection name before you add the item</span></Form.Label></center>
                <center><Form.Control className="form"
                                      name="collection_name"
                                      type="Collection_name"
                                      placeholder="Collection name"
                /></center>
            </Form.Group>
            </Form>
            <ToolbarItems
                onAddClick={onAddClick}
            />
            <ItemList
                handleChange={handleChange}
                //handleChangeAll={handleChangeAll}
                items={JSON.parse(str)}
            />

        </>
    );

}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpPost(theUrl, body)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.send( body);
    return xmlHttp.responseText;
}

function sendJSON(url, body) {


    var json = JSON.stringify(body);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
    return xhr.responseText
}

export default ItemView;

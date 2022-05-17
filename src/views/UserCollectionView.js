import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ToolbarItems from "../components/ToolbarItems";
import Collection from "../components/Collection";

import config from "../config.js";



function UserCollectionView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let list=[];
    let items_list = [];
    let collections = [];

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



    const onAddClick = () => {
        console.log(list);
        for(let i=0;i<list.length;i++){
            let body = {
                user_id: currentUserId,
                item_id: list[i],
                collection_name: "main"
            }
            //console.log(JSON.stringify(body))
            console.log(sendJSON(config.server_host_name + "/app/item-collection", body))
        }
    };



    useEffect(() => {
        document.querySelector("#select-all").checked =
            items.length === markedItemsItems.length ? true : false;
    }, [markedItemsItems, items]);


    useEffect(() => {
        if (!isLogged) navigate("/sign-in");
    }, [isLogged]);

    let collection_option=window.location.href.split('#')[1];
    if(collection_option == undefined){
        collection_option = 'main'
    }


    let collectionIds =JSON.parse(httpGet(config.server_host_name + "/app/item-collections/" + currentUserId));

    for(let i=0;i<collectionIds.length;i++){
        if(!collections.includes(collectionIds[i].collection_name)){
            collections.push(collectionIds[i].collection_name)
        }
        if(collectionIds[i].collection_name == collection_option){
            items_list.push(JSON.parse(httpGet(config.server_host_name + "/app/items/" +collectionIds[i].item_id)))
        }

    }
    //console.log(collections)
    return (
        <>
            <center><span className="color-title">List of users</span> </center>
            <ToolbarItems
                onAddClick={onAddClick}
            />
            <Collection
                handleChange={handleChange}
                //handleChangeAll={handleChangeAll}
                items={items_list}
                collections={collections}
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

export default UserCollectionView;

import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemPage from "../components/ItemPage";
import {Button, Form, Image} from "react-bootstrap";
import {commit} from "lodash/seq";
import config from "../config.js";



function ItemPageView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let list=[];
    let item_id;
    const isLogged = useSelector(state => state.auth.loginedUser.token);
    const currentUserId = useSelector(state => state.auth.loginedUser.userId);

    window.addEventListener('popstate', function(event) {
        document.querySelectorAll(".comment_div").forEach(function(c){
            c.parentNode.removeChild(c);
        });

    }, false);

    useEffect(() => {
        if (!isLogged) navigate("/sign-in");
    }, [isLogged]);

    let item;
    let was_found;
    let option=window.location.href.split('/')[4];
    if(option == undefined){
        was_found=false;
    }else{
        console.log(option)
        item = JSON.parse(httpGet(config.server_host_name + "/app/items/" + option))
        was_found=true;
    }
    let comments = JSON.parse(httpGet(config.server_host_name + "/app/commentss/" + option)); //item_id
    console.log(comments)
    let users_comments = [];
    for(let i=0;i<comments.length;i++) {
        let user = JSON.parse(httpGet(config.server_host_name + "/app/users/" + comments[i].user_id))
        comments[i].user_id = user.name;

    }
    return (
        <>
            <ItemPage
                was_found={was_found}
                item={item}
                comments={comments}
            />
            <Form className="center-all" id="comment">
                <Form.Group className="mb-4" >
                    <Form.Label><span className="color-nav">Leave your comment here</span></Form.Label>
                    <Form.Control className="form"
                                          name="comment"
                                          type="comment"
                                          placeholder="Type here"
                    />
                </Form.Group>
            </Form>
            <Button
                onClick={postComment}
                className="comment_button"
                title="Learn More"
                color="#841584">Post
            </Button>
        </>
    );
    function postComment(){
        const form = document.getElementById('comment');
        let context =  form.elements['comment'].value;
        console.log(context)
        let comment  = {
            item_id: option,
            user_id: currentUserId,
            context: context
        }
        sendJSON(config.server_host_name + "/app/comment", comment)

    }


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

export default ItemPageView;

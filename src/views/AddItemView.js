import { Form, Button } from "react-bootstrap";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import itemOperations from "../redux/items-redux/item-operations";

function SignUpView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let file;
    const [data, setData] = useState({ title: "", tag: "", description: "" });

    const onChangeHandler = useCallback(e =>
        setData({ ...data}),
    );

    const handleFileInput = (e) => {
        file = e.target.files[0]

    }

    const onSubmitHandler = useCallback(e => {
        e.preventDefault();
        const form = document.getElementById('addItemForm');
        dispatch(
            itemOperations.addItem({
                title: form.elements['title'].value,
                tag: form.elements['tag'].value,
                description: form.elements['description'].value
            }),
        );
        setData({ title: "", tag: "", description: ""});
        //return navigate("/sign-in");
    });
    return (
        <>
            <div className="sign"><center><span className="color-title">Add new Item</span></center></div>
        <center> <input type='file' id="imageInput" name="imageInput" onChange={handleFileInput} accept="image/*"/></center>
            <Form className="center-all" id="addItemForm" onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <center><Form.Label><span className="color-nav">Title</span></Form.Label></center>
                    <center> <Form.Control className="form"
                                           onChange={onChangeHandler}
                                           type="title"
                                           name="title"
                                           placeholder="Enter title"
                    /></center>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <center><Form.Label><span className="color-nav">Tag</span></Form.Label></center>
                    <center><Form.Control className="form"
                                          onChange={onChangeHandler}
                                          name="tag"
                                          type="tag"
                                          placeholder="Enter tag"
                    /></center>
                </Form.Group>
                <Form.Group className="mb-4" >
                    <center><Form.Label><span className="color-nav">Description</span></Form.Label></center>
                    <center><Form.Control className="form-desc"
                                          onChange={onChangeHandler}
                                          name="description"
                                          type="description"
                    /></center>
                </Form.Group>
                <center><Button variant="dark" type="submit">
                    Submit
                </Button></center>
            </Form>
        </>
    );
}
export default SignUpView;

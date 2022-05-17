import { Form, Button } from "react-bootstrap";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authOperations from "../redux/auth-redux/auth-operations";

function SignUpView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", name: "", password: "" });

  const onChangeHandler = useCallback(e =>
    setData({ ...data, [e.target.name]: e.target.value }),
  );
  const onSubmitHandler = useCallback(e => {
    e.preventDefault();
    dispatch(
      authOperations.signUp({
        isBlocked: false,
        isOnline: false,
        ...data,
      }),
    );
    setData({ email: "", name: "", password: "" });
    //return navigate("/sign-in");
  });
  return (
    <>
      <div className="sign"><center><span className="color-title">Sign Up</span></center></div>
    <Form className="center-all" onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <center><Form.Label><span className="color-nav">Name</span></Form.Label></center>
          <center> <Form.Control className="form"
            onChange={onChangeHandler}
            type="name"
            name="name"
            placeholder="Enter name"
          /></center>
    </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <center><Form.Label><span className="color-nav">Email address</span></Form.Label></center>
        <center><Form.Control className="form"
            onChange={onChangeHandler}
            name="email"
            type="email"
            placeholder="Enter email"
          /></center>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <center><Form.Label><span className="color-nav">Password</span></Form.Label></center>
          <center><Form.Control className="form"
            onChange={onChangeHandler}
            name="password"
            type="password"
            placeholder="Password"
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

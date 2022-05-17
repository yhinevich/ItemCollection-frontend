import {Form, Button} from "react-bootstrap";
import {useState, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import authOperations from "../redux/auth-redux/auth-operations";
import userOperations from "../redux/user-redux/user-operations";

function SignInView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({email: "", password: ""});
    const isLogined = useSelector(state => state.auth.loginedUser.token);
    const redirect = useSelector(state => state.users.redirect);

    const onChangeHandler = useCallback(e =>
        setData({...data, [e.target.name]: e.target.value}),
    );

    const onSubmitHandler = useCallback(e => {
        e.preventDefault();
        dispatch(authOperations.signIn(data));
        setData({email: "", password: ""});
    });

    useEffect(() => {
        if (isLogined) {
            dispatch(userOperations.fetchUsers());
            navigate("/user");
        }
    }, [isLogined]);




    return (
        <>
            <div className="sign"><center><span className="color-title">Fill registration form</span></center></div>
            <Form onSubmit={onSubmitHandler}>
                <center><Form.Group className="mb-3">
                    <Form.Label><span className="color-nav">Email address</span></Form.Label>
                    <Form.Control className="form"
                                  onChange={onChangeHandler}
                                  name="email"
                                  type="email"
                                  placeholder="Enter email"
                    />
                </Form.Group></center>
                <Form.Group className="mb-4">
                    <center><Form.Label><span className="color-nav">Password</span></Form.Label>
                        <Form.Control className="form"
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

export default SignInView;

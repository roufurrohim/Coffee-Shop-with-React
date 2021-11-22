import {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ACTION_GET_USER, LOGIN } from '../redux/actions/user';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {API_URL} from '../helpers/env'
import FooterComp from "../components/Footer";

const Login = () => {

  const dispatch = useDispatch();
  // const count = useSelector((state) => state.user)
  // const dataUser = count.all

  const [input, setInput] = useState(
    {
      email:"",
      password:""
    })

  const resetInput = () => {
    setInput({
      email: "",
      password: ""
    });
  };

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const history = useHistory()
  const toHome = () => {
    history.push("/")
  }

  const toSignUp = () => {
    history.push("/register")
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email : input.email,
      password : input.password
    }
    LOGIN(payload)
    .then((res) => {
      const token = res.data.token
      const picture = res.data.picture
      const id = res.data.id
      const level = res.data.level
      localStorage.setItem('id', id)
      localStorage.setItem('picture', picture)
      localStorage.setItem('token', token)
      localStorage.setItem('level', level)
      alert(res.message)
      dispatch(ACTION_GET_USER(id))
      resetInput()
      history.push('/')
    })
    .catch((err) => {
      const msg = err.response.data.message
      alert(msg)
    })
   
  };

  return (
    <div>
      <section className="container-fluid">
        <div className="row justify-content-between position-relative">
          <div className="col-lg-4 d-lg-block d-md-none d-none contentLeft"></div>
          <div className="col-lg-7 col-12 mt-2 contentRight">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-lg-3 col-md-3 col-7 ms-md-3">
                <div className="navbar-brand text-dark" onClick={toHome}>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                        src={`${API_URL}helpers/logo.png`}
                        alt="Logo"
                        style={{width: "33px",
                        height: "33px", marginRight:'5px'}}
                        className="d-inline-block align-text-top"
                      />
                      <h4 className="fw-bold" style={{paddingTop:'10px'}}>Coffee Shop</h4>
                  </div>
                </div>
              </div>
            <div className="col-lg-3 col-md-3 col-5 login">
              <button onClick={toSignUp} className="btn btn-outline-none rounded-pill fw-bold">Sign Up</button>
            </div>
          </div>
            <div className="container mt-5 ps-lg-0 ps-4 signUp">
            <div className="row mb-3">
              <div className="col d-flex justify-content-center align-items-center" style={{color: '#6a4029'}}>
                <h2 className="fw-bold">Login</h2>
              </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6 col-lg-9 col-12 ">
              <Form 
              onSubmit={handleSubmit}
              >
                  <FormGroup>
                    <Label for="email" className="labelEmail">Email Address:</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email adress"
                      value={input.email}
                      onChange={(e) => {changeHandler(e)}}
                    />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password" className="labelPwd">Password:</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={input.password}
                        onChange={(e) => {changeHandler(e)}}
                      />
                    </FormGroup>
                    <div id="passwordHelp" className="btn fs-5 text-decoration-underline fw-bold" style={{color: '#6A4029'}}>
                      Forgot password?
                    </div>
                    <Button
                          type="submit"
                          onClick={handleSubmit}
                          className="btn btn-lg col-12 my-5 fs-5 btnSignUp"
                        >
                         Login
                        </Button>
                      
                        <Button
                          type="submit"
                          color="light"
                          className="btn btn-lg mb-4 shadow-lg col-12 fs-6 bg-white fw-bold btnGooggle"
                        >
                          <span className="btn-label">
                            <img
                              src={`${API_URL}helpers/google.png`}
                              style={{ width: "26px", height: "26px" }}
                              alt="google"
                              className="me-2"
                            />
                          </span>
                          Login with Google
                        </Button>
                    </Form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section class="container-fluid bg-white shadow position-absolute d-lg-block d-md-none d-none member">
      <div class="row justify-content-center align-items-center ps-5">
        <div class="col-lg-8">
        <h2>Get your member card now!</h2>
        <p>Let's join with our member and enjoy the deals.</p>
        </div>
        <div class="col-lg-4">
          <div class="row">
            <button class="btn btn-outline-none fw-bold btnCreate">Create Now</button>
          </div>
        </div>
      </div>
    </section>

      <footer className="footerSignUp">
        <FooterComp />
      </footer>
    </div>
  );
};

export default Login;

import {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ACTION_GET_USER, LOGIN } from '../redux/actions/user';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
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
                        src="https://s3-alpha-sig.figma.com/img/e8f1/50f4/dd316b36489ed2498bae94124e7ee124?Expires=1632700800&Signature=Ct~qVplgCM0aPE~SFXenm~R6Tggm~XEP0dAsgJqqFXnFAb8EjIg0dNMuzupCR7OHesFOexlzeh3JAN51i3clQF3SPqoWFnQ8RoeRKpyoFsbTnYVUUYA5vONFpQ5CE~JvNjuI00N1vqaY1wrcC6kuj68nYg4dYA8yCZdUSAimBd8-yAbGLlK-D~QX5UDOftMNtAnBldlHTAPChs606p5L2gs5zbgFDjqQ0f1WAMH2n-aNmK030~k2hydGIBJdkyvVcjH-J6x2fy5df38rsZ-dRBjLpfE18gipMKAEPATukAM4wmM4uZy3r6lI5xW1tJRff9uCePtUv7g1vNPBD85eMA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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
                              src="https://s3-alpha-sig.figma.com/img/f881/84c6/8dee88f348660b174d22c163e0848498?Expires=1632700800&Signature=Qtuel-V93oLZkhCvLVXCaQkdrg-V-r2Ue5oZRqjY4BtWgzoBE0ovmhYNR0jOfby8qQz9uOH26u2Z3FbiJGAsuArmUQxcxtXl1v1BHv3t4L3zLDWWQLKA8zURye-IFSFIt63a-BuN3V-Rokv3rkWgZDl0uqdYj7SujjpjykH9AckYoaVrkD4vNeV3a4LdYyaqBdE46nsawV2lftrftfrObVLfAbjnOh73VUHb1eS87F--bn7G0qTy~kqIe5amrEmcaUAG0vPCEmwdSxTPl4jC0uq0bxy2rb8I9onrm7MqB6QPcCWswP~V6hkZaMKt686syODRZoHZLgjY4rMk1GtpmA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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

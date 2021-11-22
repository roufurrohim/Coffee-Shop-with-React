import { useState } from "react";
import { useHistory } from "react-router-dom";
import { INSERT } from '../redux/actions/user';
import {API_URL} from '../helpers/env'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../css/SignUp.css";
import FooterComp from "../components/Footer";

const Register = () => {

  const [form, setForm] = useState({
      email: "",
      password: "",
      phone: " ",
      address: " ",
      gender: "male",
      date: "1999-12-12",
      level: 1,
      image: "", //for BE
      imagePreview: "", // for UI
  });

  const resetInput = () => {
    setForm({
      ...form,
      email: "",
      password: "",
      name: "",
      phone: "",
      image: "",
      imagePreview: "",
    });
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
      });
  };

  const changeFile = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameUser = form.email.slice(0, 4)
    console.log(nameUser)
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("phone", form.phone);
    formData.append("image", form.image);
    formData.append("name", nameUser);
    formData.append("gender", form.gender);
    formData.append("level", form.level);
    formData.append("date", form.date);
    
    INSERT(formData)
    .then((res) => {
      console.log(res)
      alert(res.data.message)
      resetInput();
      history.push("/products")
    })
    .catch((err) => {
      const msg = err.response.data.message
      alert(msg)
      resetInput();
    })

  };

  const toHome = () => {
    history.push("/")
  }

  const toLogin = () => {
    history.push("/login")
  }
  return (
    <div>
      <section className="container-fluid">
        <div className="row justify-content-between position-relative">
          <div className="col-lg-4 d-lg-block d-md-none d-none contentLeft"></div>
          <div className="col-lg-7 col-12 mt-2 contentRight">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-lg-3 col-md-3 col-7 ms-md-3">
                <div onClick={toHome} className="navbar-brand text-dark d-flex justify-content-center align-items-center">
                    <img
                      src={`${API_URL}helpers/logo.png`}
                      alt="Logo"
                      style={{
                        width: "33px",
                        height: "33px",
                        marginRight: "5px",
                      }}
                      className="d-inline-block align-text-top"
                    />
                    <h4 className="fw-bold" style={{ paddingTop: "10px" }}>
                      Coffee Shop
                    </h4>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-5 ps-lg-0 ps-4 login">
                <button onClick={toLogin} className="btn btn-outline-none rounded-pill fw-bold">
                  Login
                </button>
              </div>
            </div>
            <div className="container mt-5 signUp">
              <div className="row text-center mb-3">
                <div className="col" style={{ color: "#6a4029" }}>
                  <h2 className="fw-bold">Sign Up</h2>
                </div>
              </div>
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6 col-lg-9 col-12">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="email" className="labelEmail">Email Address:</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email adress"
                        value={form.email}
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
                        value={form.password}
                        onChange={(e) => {changeHandler(e)}}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="phone" className="labelPhone">Phone:</Label>
                      <Input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Enter your Phone"
                        value={form.phone}
                        onChange={(e) => {changeHandler(e)}}
                      />
                    </FormGroup>
                    <FormGroup className="d-flex flex-column">
                      <Label for="image" className="labelImage">Image:</Label>
                      <img width={100} height={100} src={form.imagePreview} alt="pict" className={form.imagePreview === "" ? "d-none" : "my-2"} />
                      <Input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) => {changeFile(e)}}
                        accept="image/*"
                      />
                    </FormGroup>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          className="btn btn-lg col-12 my-5 fs-5 btnSignUp"
                        >
                         Sign Up
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
                          Sign up with Google
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
              <button class="btn btn-outline-none fw-bold btnCreate">
                Create Now
              </button>
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

export default Register;

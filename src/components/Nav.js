import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Nav.css";
import Search from "../svg/search.svg";
import Chat from "../svg/chat.svg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  Input,
} from "reactstrap";
import { useSelector } from 'react-redux';
import { API_URL } from '../helpers/env';

const NavbarItem = ({ isLogin, change, searchProd, submit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  const count = useSelector((state) => state.user)
  const dataUser = count.all
  const image = dataUser.picture
  // console.log(dataUser.data)
  return (
    <div className="navbar">
      <Navbar id="nav" color="white" light expand="lg">
        <NavbarBrand
          to="/"
          className="d-flex justify-content-center align-item-center"
        >
          <img
            src="https://s3-alpha-sig.figma.com/img/e8f1/50f4/dd316b36489ed2498bae94124e7ee124?Expires=1632700800&Signature=Ct~qVplgCM0aPE~SFXenm~R6Tggm~XEP0dAsgJqqFXnFAb8EjIg0dNMuzupCR7OHesFOexlzeh3JAN51i3clQF3SPqoWFnQ8RoeRKpyoFsbTnYVUUYA5vONFpQ5CE~JvNjuI00N1vqaY1wrcC6kuj68nYg4dYA8yCZdUSAimBd8-yAbGLlK-D~QX5UDOftMNtAnBldlHTAPChs606p5L2gs5zbgFDjqQ0f1WAMH2n-aNmK030~k2hydGIBJdkyvVcjH-J6x2fy5df38rsZ-dRBjLpfE18gipMKAEPATukAM4wmM4uZy3r6lI5xW1tJRff9uCePtUv7g1vNPBD85eMA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            style={{
              width: "33px",
              height: "33px",
            }}
            alt="Icon"
            className="icon"
          />
          <Link to="/">
            <h4 className="title">Coffee Shop</h4>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className=" toggleNav" />
        <Collapse isOpen={isOpen} className="navCenter" navbar>
          <Nav className="mr-auto ms-auto gap-lg-5 gap-sm-1" navbar>
            <NavLink id="RouterNavLink" className="home" to="/">
              Home
            </NavLink>

            <NavLink id="RouterNavLink" className="products" to="/products">
                Products
            </NavLink>

            <NavLink id="RouterNavLink" className="yourCart" to="/cart">
              Your Cart
            </NavLink>
            <NavLink id="RouterNavLink" className="history" to="#">
              History
            </NavLink>
          </Nav>

          {isLogin === false ? (
            <Nav
              className="d-flex me-lg-5 ms-lg-auto ms-md-5 justify-content-md-center align-items-md-center navRight"
              navbar
            >
              <NavLink id="RouterNavLink" to="/login" className="login">
                <button type="submit" className="btn btnLogin">
                  Login
                </button>
              </NavLink>

              <NavLink to="/register" className="signUp">
                <button type="submit" className="btn btnReg">
                  Sign Up
                </button>
              </NavLink>
            </Nav>
          ) : (
            <Nav
              className="d-flex me-lg-5 ms-lg-auto ms-md-5 justify-content-md-center align-items-md-center navRight"
              navbar
            >
              <NavItem>
                <Form onSubmit={submit}>
                  <img
                    src={Search}
                    alt="search"
                    for="search"
                    className="btn iconSearch"
                    onClick={submit}
                  />
                  <Input
                    sm={4}
                    type="text"
                    name="search"
                    id="search"
                    value={searchProd}
                    placeholder="Search"
                    onChange={(e)=> change(e)}
                  />
                </Form>
              </NavItem>

              <NavItem>
                <button type="submit" className="btn">
                  <div class="position-absolute fw-bold popup">1</div>
                  <img src={Chat} alt="chat" />
                </button>
              </NavItem>

              <NavItem>
                <button type="submit" className="btn">
                  
                  <img
                    src={API_URL+image}
                    alt="profile"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    className=" rounded-circle"
                  />
                </button>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarItem;

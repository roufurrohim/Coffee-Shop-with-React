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
import { API_URL } from "../helpers/env";

const NavbarItem = ({ level, token, image, change, searchProd, submit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navbar">
      <Navbar id="nav" color="white" light expand="lg">
        <NavbarBrand
          to="/"
          className="d-flex justify-content-center align-item-center"
        >
          <img
            src={`${API_URL}helpers/logo.png`}
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

            <NavLink
              id="RouterNavLink"
              className={
                level === null
                  ? "d-block"
                  : level === "1"
                  ? "yourCart"
                  : "d-none"
              }
              to="/cart"
            >
              Your Cart
            </NavLink>

            <NavLink
              id="RouterNavLink"
              className={level === "0" ? "d-block" : "d-none"}
              to="#"
            >
              Orders
            </NavLink>

            <NavLink
              id="RouterNavLink"
              className={level === "0" ? "d-block" : "d-none"}
              to="#"
            >
              Dashboard
            </NavLink>

            <NavLink
              id="RouterNavLink"
              className={
                level === null
                  ? "d-block"
                  : level === "1"
                  ? "history"
                  : "d-none"
              }
              to="/history"
            >
              History
            </NavLink>
          </Nav>

          {token === null ? (
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
                    onChange={(e) => change(e)}
                  />
                </Form>
              </NavItem>

              <NavItem>
                <button type="submit" className="btn">
                  <div class="position-absolute fw-bold popup">1</div>
                  <img src={Chat} alt="chat" />
                </button>
              </NavItem>

              <NavLink to="/profile">
                <button type="submit" className="btn">
                  <img
                    src={image === undefined ? null : API_URL + image}
                    alt="profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                    className=" rounded-circle"
                  />
                </button>
              </NavLink>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarItem;

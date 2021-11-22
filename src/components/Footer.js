import React from "react";
import Fb from "../svg/fb.svg";
import Twit from "../svg/twitter.svg";
import Ig from "../svg/ig.svg";
import { API_URL } from "../helpers/env";

const Footer = () => {
  return (
    <div className="container">
      <div className="row justify-content-between align-content-lg-center">
        <div className="col-lg-3 col-md-4 mb-3 ms-md-5 me-lg-5">
          <div className="d-inline-flex align-items-center mb-4">
            <img
              src={`${API_URL}helpers/logo.png`}
              style={{ width: "30px", height: "30px" }}
              alt="Iconig"
              className="icon"
            />
            <h4 className="fs-5 ps-2 fw-bold">Coffee Shop</h4>
          </div>
          <ul className="list-unstyled small text-muted social">
            <li className="mb-4">
              Coffee Shop is a store that sells some good meals, and especially
              coffee. We provide high quality beans
            </li>
            <li>
              <ul className="list-unstyled d-lg-flex d-md-flex d-flex mb-4 media">
                <li className="me-2">
                  <img src={Fb} alt="fb" />
                </li>
                <li className="me-1">
                  <img src={Twit} alt="twitter" />
                </li>
                <li className="ms-1">
                  <img src={Ig} alt="Instagram" />
                </li>
              </ul>
            </li>
            <li className="mb-2">©2020CoffeeStore</li>
          </ul>
        </div>
        <div className="col-lg-4 col-md-5">
          <div className="row right">
            <div className="col-6 col-lg-5 col-md-4 mb-3 ms-lg-5 ps-lg-5">
              <h5 className="fw-bold">Product</h5>
              <ul className="list-unstyled">
                <li className="mb-2">Download</li>
                <li className="mb-2">Pricing</li>
                <li className="mb-2">Locations</li>
                <li className="mb-2">Contries</li>
                <li className="mb-2">Blog</li>
              </ul>
            </div>
            <div className="col-6 col-lg-5 col-md-6 mb-3 ">
              <h5 className="fw-bold">Engage</h5>
              <ul className=" list-unstyled">
                <li className="mb-2">Coffe Shop ?</li>
                <li className="mb-2">FAQ</li>
                <li className="mb-2">About Us</li>
                <li className="mb-2">Privacy Policy</li>
                <li className="mb-2">Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

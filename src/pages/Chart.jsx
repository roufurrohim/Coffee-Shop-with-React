/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FooterComp from "../components/Footer";
import NavbarComp from "../components/Nav";
import { API_URL } from "../helpers/env";
import "../css/Chart.css";

const Cart = () => {
  const data = useSelector((state) => state.cart);
  const cart = data.cart;

  const dataUser = useSelector((state) => state.user)
  const user = dataUser.all

  const [tax, setTax] = useState(20000)
  const [shipping, setShipping] = useState(10000)

const subtotal = () => {
    let total = 0
    cart.forEach ((e)=>{
        total += e.price * e.qty
    })
    return total
}
  return (
    <div>
      <div className="border-bottom">
        <NavbarComp isLogin={true} />
      </div>
      <div className="container-fluid bgContainer">
        <div className="row">
          <div className="col-12 mt-5 ms-5 mb-5 ">
            <div className="row">
              <div className="col-2">
                <h2 className="titleCheck">Checkout your item now!</h2>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="row justify-content-center">
              <div className="col-3 me-5">
                <div className="card p-4 h-100 cardOrder">
                  <div className="card-body">
                    <h3 className="card-title mb-4 text-center">Order Summary</h3>
                    {cart.map((e, i) => (
                      <div className="row align-items-center mb-5" key={i}>
                        <div className="col-3">
                          <img
                            src={API_URL + e.image}
                            alt="pict"
                            width={80}
                            height={80}
                            className="my-2"
                          />
                        </div>
                        <div className="col-9">
                          <h6 className="TitleCart">{e.name}</h6>
                          <div className="row mt-3 ">
                            <div className="col-5 d-flex ">
                              <div className=" bdrbutton">{e.qty}</div>
                            </div>
                            <div className="col-7">
                              <p className="price  d-flex justify-content-end ">IDR {e.total}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="row border-top mt-5">
                        <div className="col-6">
                            <p>SUB TOTAL</p>
                            <p>TAX & FEES</p>
                            <p>SHIPPING</p>
                            <h4 className="fw-bold pt-3">TOTAL</h4>
                        </div>
                        <div className="col-6 text-end">
                            <p>IDR {subtotal()}</p>
                            <p>IDR {tax}</p>
                            <p>IDR {shipping}</p>
                            <h4 className="fw-bold pt-3">IDR {shipping+tax+subtotal()}</h4>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 ms-5">
                  <div className="row">
                      <div className="col-6">
                        <h5 className="addressDet">Address details</h5>
                      </div>
                      <div className="col-6 text-end ">
                          <h4 className="text-white btn">edit</h4>
                      </div>
                  
                
                        <div className="card cardAddress">
                            <div className="card-body p-4">
                                <p className="border-bottom"><b>Delivery</b> to {user.address}</p>
                                <p className="border-bottom">{user.phone}</p>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                        <h5 className="addressDet">Payment method</h5>
                            <div className="card cardAddress">
                                
                            </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footCheck">
        <FooterComp />
      </footer>
    </div>
  );
};

export default Cart;

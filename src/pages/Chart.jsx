/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DELETE_ITEM_CART, DELETE_ALL_CART } from "../redux/actions/cart";
import { INSERT_TRANS } from "../redux/actions/transaction";
import FooterComp from "../components/Footer";
import NavbarComp from "../components/Nav";
import { API_URL } from "../helpers/env";
import { BsCardText } from "react-icons/bs";
import { AiOutlineBank, AiOutlineDelete } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import "../css/Chart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.cart);
  const cart = data.cart;

  const dataProducts = useSelector((state) => state.products);
  const products = dataProducts.all;

  const dataUser = useSelector((state) => state.user);
  const user = dataUser.all[0];
  const id = localStorage.getItem("id");

  const [status, setStatus] = useState(true);
  const [trans, setTrans] = useState({
    address: user.address,
    phone: user.phone,
    delivery_method: "",
    payment_method: "",
    total: 0,
    // remark: user.name,
    shipping: 0,
    tax: 15000,
    user_id: id,
    details: cart,
  });

  const subtotal = () => {
    let total = 0;
    cart.forEach((e) => {
      total += e.price * e.qty;
    });
    return total;
  };

  const del = (data) => {
    dispatch(DELETE_ITEM_CART(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "delivery_method" && value === "Door delivery") {
      setTrans({
        ...trans,
        [name]: value,
        shipping: 10000,
        tax: 15000,
      });
    } else if (name === "delivery_method" && value === "Pick up") {
      setTrans({
        ...trans,
        [name]: value,
        shipping: 10000,
        tax: 15000,
      });
    } else if (name === "payment_method" && value === "Cash on delivery") {
      setTrans({
        ...trans,
        [name]: value,
        shipping: 10000,
        tax: 15000,
      });
    } else {
      setTrans({
        ...trans,
        [name]: value,
        shipping: 0,
        tax: 15000,
      });
    }
  };

  const handlePayment = (e) => {
    const { value } = e.target;
    setTrans({
      ...trans,
      payment_method: value,
    });
  };

  const edit = () => {
    setStatus(false);
  };

  const save = () => {
    setStatus(true);
  };

  const numberWithCommas = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return x;
    }
  };

  const selectDetails = (data) => {
    const { products_id, qty, price } = data;
    return { products_id, qty, price };
  };

  const pay = () => {
    const id = localStorage.getItem("id");
    const newDetails = trans.details.map(selectDetails);
    if (trans.address === "" && trans.phone === "") {
      const payload = {
        ...trans,
        phone: user.phone,
        address: user.address,
        details: newDetails,
        remark: user.name,
        subtotal: subtotal(),
        user_id: id,
        total: trans.shipping + trans.tax + subtotal(),
      };
      if (payload.details.length === 0) {
        alert("Tidak Ada Item untuk di Checkout Silahkan Pilih Item Dahulu");
        history.push("/products");
      } else {
        INSERT_TRANS(payload)
          .then((response) => {
            alert(response.data.message);
            dispatch(DELETE_ALL_CART());
            history.push("/products");
          })
          .catch((err) => {
            const msg = err.response.data.message;
            alert(msg);
          });
      }
    } else {
      const payload = {
        ...trans,
        details: newDetails,
        remark: user.name,
        subtotal: subtotal(),
        user_id: id,
        total: trans.shipping + trans.tax + subtotal(),
      };
      if (payload.details.length === 0) {
        alert("Tidak Ada Item untuk di Checkout Silahkan Pilih Item Dahulu");
        history.push("/products");
      } else {
        INSERT_TRANS(payload)
          .then((response) => {
            alert(response.data.message);
            dispatch(DELETE_ALL_CART());
            history.push("/products");
          })
          .catch((err) => {
            const msg = err.response.data.message;
            alert(msg);
          });
      }
    }
  };

  const token = localStorage.getItem("token");
  const picture = localStorage.getItem("picture");
  const level = localStorage.getItem("level");

  return (
    <div>
      <div className="border-bottom">
        <NavbarComp token={token} image={picture} level={level} />
      </div>
      <div className="container-fluid bgContainer">
        <div className="row">
          <div className="col-12 mt-5 ms-lg-5 mb-5 ">
            <div className="row">
              <div className="col-lg-2 col-12">
                <h2 className="titleCheck">Checkout your item now!</h2>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-3 col-12 me-lg-5">
                <div className="card p-4 cardOrder">
                  <div className="card-body">
                    <h3 className="card-title mb-4 text-center">
                      Order Summary
                    </h3>
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
                        <div className="col-9 ps-lg-0 ps-3">
                          <h5 className="fw-bold TitleCart">
                            {e.name_product}
                          </h5>
                          <div className="row mt-3 ">
                            <div className="col-5 d-flex ">
                              <div className=" bdrbutton">x{e.qty}</div>
                            </div>
                            <div className="col-7">
                              <p className="price  d-flex justify-content-end ">
                                IDR {numberWithCommas(e.subTotal)}
                                <AiOutlineDelete
                                  size={28}
                                  className="icon ms-2 text-danger"
                                  onClick={() => del(i)}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="border-bottom"></div>
                    <div className="row mt-5">
                      <div className="col-6">
                        <p>SUB TOTAL</p>
                        <p>TAX & FEES</p>
                        <p>SHIPPING</p>
                        <h4 className="fw-bold pt-4">TOTAL</h4>
                      </div>
                      <div className="col-6 text-end">
                        <p>IDR {numberWithCommas(subtotal())}</p>
                        <p>IDR {numberWithCommas(trans.tax)}</p>
                        {trans.delivery_method === "Door delivery" ||
                        trans.delivery_method === "Pick up" ||
                        trans.payment_method === "Cash on delivery" ? (
                          <p>IDR {numberWithCommas(10000)}</p>
                        ) : (
                          <p>IDR {numberWithCommas(0)}</p>
                        )}
                        <h4 className="fw-bold pt-4">
                          IDR{" "}
                          {numberWithCommas(
                            trans.shipping + trans.tax + subtotal()
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-12 ms-lg-5 mt-lg-0 mt-5">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h5 className="addressDet">Address details</h5>
                  </div>
                  <div className="col-lg-6 col-5 text-end ">
                    <h4 className="text-white btn fw-bold" onClick={edit}>
                      edit
                    </h4>
                  </div>

                  <div className="card cardAddress">
                    <div className="card-body p-4">
                      <p>
                        <b>Delivery</b> to :
                      </p>
                      {status ? (
                        <p>{trans.address === "" ? user.address : trans.address}</p>
                      ) : (
                        <textarea
                          type="text"
                          name="address"
                          value={trans.address}
                          onChange={handleChange}
                          className="w-100 border-0"
                        />
                      )}
                      <div className="border-bottom"></div>
                      {status ? (
                        <p className="mt-4">{user.phone}</p>
                      ) : (
                        <input
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          className="mt-3 border-0"
                          value={trans.phone}
                        />
                      )}
                      <div className="border-bottom mt-1"></div>
                    </div>
                    <button
                      className={
                        !status ? "btn fw-bold mb-3 text-end" : "d-none"
                      }
                      onClick={save}
                    >
                      Save
                    </button>
                  </div>

                  <h5 className="addressDet mt-3">Delivery Method</h5>
                  <div className="card mt-1 cardAddress ">
                    <div className="card-body">
                      <div className="card-text  flex-row justify-content-center ">
                        <div className="row mt-lg-2 deliv justify-content-between ">
                          <div className="col-lg-4 col-4 mb-lg-0 mb-3 dineIn">
                            <input
                              type="radio"
                              className="btn-check "
                              name="delivery_method"
                              value="Dine in"
                              onChange={handleChange}
                              id="btnradio1"
                            />
                            <label className="btn btn-outline" for="btnradio1">
                              Dine in
                            </label>
                          </div>

                          <div className="col-lg-5 col-5 pe-lg-4 mb-lg-0 mb-3 cod">
                            <input
                              type="radio"
                              className="btn-check deliv"
                              name="delivery_method"
                              value="Door delivery"
                              onChange={handleChange}
                              id="btnradio2"
                            />
                            <label className="btn btn-outline" for="btnradio2">
                              Door Delivery
                            </label>
                          </div>

                          <div className="col-lg-3 col-2 mb-lg-0 mb-3 pickUp">
                            <input
                              type="radio"
                              className="btn-check pickUp"
                              name="delivery_method"
                              value="Pick up"
                              onChange={handleChange}
                              id="btnradio3"
                            />
                            <label className="btn btn-outline" for="btnradio3">
                              Pick up
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <h5 className="addressDet">Payment method</h5>
                    <div className="card row cardAddress p-5">
                      <div className="form-check col-12 d-flex">
                        <div className="row w-100 align-items-lg-center">
                          <input
                            type="radio"
                            className=" form-check-input inputRadio me-4 col-2"
                            name="payment_method"
                            value="Card"
                            onChange={handlePayment}
                          />
                          <div className="col-2 iconCard">
                            <BsCardText size={28} className="icon text-white" />
                          </div>
                          <label
                            className="form-check-label col-4 labelCard"
                            for="card"
                          >
                            Card
                          </label>
                          <div className="border-bottom mt-2"></div>
                        </div>
                      </div>
                      <div className="form-check col-12 d-flex mt-4">
                        <div className="row w-100 align-items-lg-center">
                          <input
                            className="col-2 me-4 form-check-input inputRadio"
                            type="radio"
                            name="payment_method"
                            value="Bank account"
                            onChange={handlePayment}
                          />
                          <div className="col-2 iconBank">
                            <AiOutlineBank
                              size={28}
                              className="icon text-white"
                            />
                          </div>
                          <label
                            className="form-check-label col-8 labelCard"
                            for="bank"
                          >
                            Bank account
                          </label>
                          <div className="border-bottom mt-2"></div>
                        </div>
                      </div>
                      <div className="form-check col-12 d-flex mt-4">
                        {/* <div className="row w-100 align-items-lg-center"> */}
                        <div
                          className={
                            trans.delivery_method === "Dine in"
                              ? "d-none"
                              : "row w-100 align-items-lg-center"
                          }
                        >
                          <input
                            className="col-2 me-4 form-check-input inputRadio"
                            type="radio"
                            name="payment_method"
                            value="Cash on delivery"
                            onChange={handlePayment}
                          />
                          <div className="col-2 iconCOD">
                            <FiTruck size={28} className="icon" />
                          </div>
                          <label
                            className="form-check-label col-8 labelCard"
                            for="cod"
                          >
                            Cash on delivery
                          </label>
                          <div className="border-bottom mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5 btnConfirm " onClick={pay}>
                    <button className="btn btnCnP">Confirm and Pay</button>
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

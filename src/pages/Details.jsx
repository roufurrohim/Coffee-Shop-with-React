import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../helpers/env";
import { ACTION_GET_ALL_PRODUCTS, DELETE } from "../redux/actions/products";
import { INSERT_CART } from "../redux/actions/cart";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FiArrowRight } from "react-icons/fi";
import "../css/Details.css";

const Details = () => {
  const dispatch = useDispatch();

  const [details, setDetails] = useState([]);

  const data = useSelector((state) => state.products);

  const countUser = useSelector((state) => state.user);
  const dataUser = countUser.all;

  const dataId = localStorage.getItem("idProduct");

  let [count, setCount] = useState(1);

  useEffect(() => {
    const dataProducts = data.all;
    

    // eslint-disable-next-line array-callback-return
    const fill = dataProducts.filter((e) =>
      // eslint-disable-next-line eqeqeq
      e.id == dataId && e.size == "L" ? e : undefined
    );
    const total =  fill[0].price
    setDetails(
      {...fill[0], 
        total,
        qty: count,
        time: "",
        delivery_method: "",
        timeOrder: "",

      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incrementCount = () => {
    count = count + 1;
    setCount(count);
    setDetails({
      ...details,
      total: details.price * count,
      qty: count,
    });
  };

  const decrementCount = () => {
    if (count > 1) {
      count -= 1;
      setCount(count);
      let total = details.price * count
      setDetails({
        ...details,
        qty: count,
        total: total,
      });
    }
  };

  const history = useHistory();
  const handleEdit = () => {
    const data = localStorage.getItem("idProduct");
    const obj = JSON.parse(data);
    history.push(`/edit/${obj}`);
  };

  const handleDelete = (id) => {
    DELETE(id)
      .then((res) => {
        alert(res.data.message);
        dispatch(ACTION_GET_ALL_PRODUCTS());
      })
      .catch((err) => {
        alert(err.message);
      });

    history.push("/products");
  };

  const handleCart = (products) => {
    dispatch(INSERT_CART(products));
    alert("Insert To Cart Success")
    history.push('/products')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    })
  }

  // console.log(details)

  return (
    <div>
      <div className="border-bottom navbarDetails">
        <Nav isLogin={true} />
      </div>

      <section className="container-fluid details">
        <p className="fw-bold mt-3 navigation">
          Favorite & Promo{" "}
          <span style={{ color: "#6A4029" }}> &gt; {details.name}</span>
        </p>
        <div className="row justify-content-lg-between infoDeliv">
          <div className="col-lg-4 ms-lg-5 mt-lg-5 mt-3 left">
            <img src={API_URL + details.image} alt="detail" />
            <div className="card mt-5 delivery">
              <div className="card-body">
                <h5 className="card-title fw-bold">Delivery and Time </h5>
                <div className="card-text  flex-row justify-content-center ">
                  <div className="row mt-lg-5 deliv">
                    <div className="col-lg-3 mb-lg-0 mb-3 ms-lg-3 dineIn">
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

                    <div className="col-lg-4 mb-lg-0 mb-3 cod">
                      <input
                        type="radio"
                        className="btn-check"
                        name="delivery_method"
                        value="Door delivery"
                        onChange={handleChange}
                        id="btnradio2"
                        autocomplete="off"
                      />
                      <label className="btn btn-outline" for="btnradio2">
                        Door Delivery
                      </label>
                    </div>

                    <div className="col-lg-3 mb-lg-0 mb-3 pickUp">
                      <input
                        type="radio"
                        className="btn-check"
                        name="delivery_method"
                        value="Pick up"
                        onChange={handleChange}
                        id="btnradio3"
                        autocomplete="off"
                      />
                      <label className="btn btn-outline" for="btnradio3">
                        Pick up
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mt-lg-5">
                  <div className="col-lg-2 col-3 ms-lg-4 pt-2">
                    <h6 className="fw-bold fs-5">Now</h6>
                  </div>
                  <div className="col-lg-2 col-3 yes">
                    <input
                      type="radio"
                      className="btn-check"
                      name="timeOrder"
                      value="yes"
                      onChange={handleChange}
                      id="optionsYes"
                      autoComplete="off"
                    />
                    <label className="btn btn-outline" for="optionsYes">
                      Yes
                    </label>
                  </div>

                  <div className="col-lg-3 col-1 no">
                    <input
                      type="radio"
                      className="btn-check"
                      name="timeOrder"
                      value="no"
                      onChange={handleChange}
                      id="optionsNo"
                      autoComplete="off"
                    />
                    <label className="btn btn-outline" for="optionsNo">
                      No
                    </label>
                  </div>
                </div>

                <div className="mb-lg-3 mt-lg-5 mt-3 row">
                  <label
                    for="inputSetTime"
                    className="col-sm-3 col-form-label ms-lg-4 fw-bold fs-5"
                  >
                    Set Time
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="time"
                      value={details.time}
                      onChange={handleChange}
                      id="inputSetTime"
                      placeholder="Enter time for reservation"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 col-12 mt-2 mt-4 right">
            <div className="row infoProd">
              <h1 className="fw-bold col-lg-8 text-center titleProduct">
                {details.name}
              </h1>
              <p className="mt-5 col-lg-8 description">{details.description}</p>
              <p className="mt-5 col-lg-5 timeDeliv">
                Delivery only on{" "}
                <span className="fw-bold" style={{ color: "#553220" }}>
                  {details.delivery_days}
                </span>{" "}
                at{" "}
                <span className="fw-bold" style={{ color: "#553220" }}>
                  {details.delivery_time}
                </span>
              </p>

              <div className="col-lg-8 mt-4 mb-lg-5 handleTotal">
                <div className="row">
                  <div className="col-lg-6 col-3 me-lg-5">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        onClick={decrementCount}
                        className="btn bg-white minus"
                      >
                        -
                      </button>
                      <span className="total">{count}</span>
                      <button
                        type="button"
                        onClick={incrementCount}
                        className="btn bg-white plus"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-5 col-9 ps-lg-5 ps-5">
                    {/* <h1 className="price">IDR {numberWithCommas(details.price)}</h1> */}
                    <h1 className="price">IDR {details.total}</h1>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 mt-lg-1 mt-5 btn-group-vertical handleAdd">
                <button
                  type="button"
                  onClick={() => handleCart(details)}
                  className="btn add"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleEdit}
                  //  className="btn mt-4 btnEdit"
                  className={
                    dataUser.level === 1 ? "d-none" : "d-block btn mt-4 btnEdit"
                  }
                >
                  Edit Product
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(details.id)}
                  //  className="btn mt-4 btnDel"
                  className={
                    dataUser.level === 1 ? "d-none" : "d-block btn mt-4 btnDel"
                  }
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid position-absolute handleCekout">
        <div className="row">
          <div className="col-lg-3 position-absolute size">
            <h4 className="pt-3 titleSize">Choise a size</h4>
            <div className="list-group list-group-horizontal mt-3 listSize">
              <div className="list-group-item me-4 reguler">R</div>
              <div className="list-group-item me-4 large">L</div>
              <div className="list-group-item extra">XL</div>
            </div>
          </div>
          <div className="col-lg-8 position-absolute itemCart">
            <div className="row">
              <div className="col-lg-2 col-3">
                <img
                  src={API_URL + details.image}
                  alt="products"
                  className="imgCart"
                />
              </div>
              <div className="col-lg-6 detailsCart">
                <h5 className="nameProd">{details.name}</h5>
                <ul className="list-group ">
                  <li className="list-group-item">x1 (Large)</li>
                  <li className="list-group-item">x1 (Reguler)</li>
                </ul>
              </div>
              <div className="col-4 position-absolute checkout">
                <div className="row">
                  <div className="col-3">
                    <p>Checkout</p>
                  </div>
                  <div className="col-5 arrow">
                    <FiArrowRight size={42} className="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footDetails">
        <Footer />
      </footer>
    </div>
  );
};

export default Details;

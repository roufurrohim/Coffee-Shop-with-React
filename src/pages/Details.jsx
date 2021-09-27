import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../helpers/env";
import { DELETE } from "../redux/actions/products";
import { INSERT_CART } from "../redux/actions/cart";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FiArrowRight } from "react-icons/fi";
import "../css/Details.css";

const Details = () => {
  const dispatch = useDispatch();

  const { id } = useParams()

  const [details, setDetails] = useState([]);

  const data = useSelector((state) => state.products);

  let [count, setCount] = useState(1);

  useEffect(() => {
    const dataProducts = data.all;    

    // eslint-disable-next-line array-callback-return
    const fill = dataProducts.filter((e) =>
      // eslint-disable-next-line eqeqeq
      e.id == id ?  e : undefined
    );
  
    const subTotal =  fill[0].price
    setDetails(
      {...fill[0], 
        subTotal,
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
      subTotal: details.price * count,
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
        subTotal: total,
      });
    }
  };

  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    DELETE(id)
      .then((res) => {
        alert(res.data.message);
        history.push("/products");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleCart = (products) => {
    const payload = {
      ...products,
      products_id: products.id
    }
      dispatch(INSERT_CART(payload));
      alert("Insert To Cart Success")
      history.push('/products')
  };

  const toCart = (products) => {
    const payload = {
      ...products,
      products_id: products.id
    }
    dispatch(INSERT_CART(payload));
    history.push('/cart')
  }

  const numberWithCommas = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return x
    }
  };

  const token = localStorage.getItem("token");
  const picture = localStorage.getItem("picture");
  const level = localStorage.getItem("level");
  

  return (
    <div>
      <div className="border-bottom navbarDetails">
        <Nav token={token} image={picture} level={level}/>
      </div>

      <section className="container-fluid details">
        <p className="fw-bold mt-3 navigation">
          Favorite & Promo{" "}
          <span style={{ color: "#6A4029" }}> &gt; {details.name_product}</span>
        </p>
        <div className="row justify-content-lg-between infoDeliv">
          <div className="col-lg-4 ms-lg-5 mt-lg-5 mt-3 left">
            <img src={API_URL + details.image} alt="detail" />
          </div>

          <div className="col-lg-7 col-12 mt-2 mt-4 right">
            <div className="row infoProd">
              <h1 className="fw-bold col-lg-8 text-center titleProduct">
                {details.name_product}
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
                    <h1 className="price">IDR {numberWithCommas(details.subTotal)}</h1>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 mt-lg-1 mt-5 btn-group-vertical handleAdd">
                <button
                  type="button"
                  onClick={() => handleCart(details)}
                  className={ level === '0' ? "d-none" : "btn add"}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(details.id)}
                  className={
                    level === '1' ? "d-none" : "d-block btn mt-4 btnEdit"
                  }
                >
                  Edit Product
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(details.id)}
                  className={
                    level === '1' ? "d-none" : "d-block btn mt-4 btnDel"
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
            <h4 className="pt-3 titleSize">Size Product</h4>
            <div className="list-group list-group-horizontal mt-3 listSize">
              <div className="list-group-item me-4 reguler">{details.size}</div>
            </div>
          </div>

          <div className={level === '1' ? "col-lg-8 position-absolute itemCart" :  "d-none"}>
            <div className="row">
              <div className="col-lg-2 col-3">
                <img
                  src={API_URL + details.image}
                  alt="products"
                  className="imgCart"
                />
              </div>
              <div className="col-lg-6 detailsCart">
                <h5 className="nameProd">{details.name_product}</h5>
                <ul className="list-group ">
                  <li className="list-group-item">x{details.qty} {details.size}</li>
                </ul>
              </div>
              <div className="col-4 position-absolute checkout">
                <div className="row">
                  <div className="col-3">
                    <p>Checkout</p>
                  </div>
                  <div className="col-5 arrow" onClick={() => toCart(details)}>
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

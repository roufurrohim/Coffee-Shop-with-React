import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { ACTION_GET_ALL_PRODUCTS, ACTION_GET_SEARCH_PRODUCTS, INSERT } from "../redux/actions/products";
import FooterComp from "../components/Footer";
import { API_URL } from '../helpers/env';
import NavbarComp from "../components/Nav";
import ModalAdd from "../components/ModalAdd";
import "../css/Products.css";


const Products = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.products);
  const dataProducts = allProducts.all;

  // const countUser = useSelector((state) => state.user);
  // const dataUser = countUser.all.data;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // const [products, setProducts] = useState(dataProducts);
  
  const [search, setSearch] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [promo, setPromo] = useState([
    {
      id: "pc1",
      image: "mother.png",
      name: "HAPPY MOTHER’S DAY!",
      description: "Get one of our favorite menu for free!",
    },
    {
      id: "pc2",
      image: "father.png",
      name: "Get a cup of coffee for free on sunday morning",
      description: "Only at 7 to 9 AM",
    },
    {
      id: "pc3",
      image: "mother.png",
      name: "HAPPY MOTHER’S DAY!",
      description: "Get one of our favorite menu for free!",
    },
    {
      id: "pc4",
      image: "gm.png",
      name: "HAPPY HALLOWEEN!",
      description:
        "Do you like chicken wings? Get 1 free only if you buy pinky promise",
    },
  ]);

  const [addProduct, setAddProduct] = useState({
    nameProduct: "",
    image: "",
    imagePreview: "",
    description: "",
    stock: "",
    discount: "",
    days: "",
    time: "",
    category: "",
    size: "",
    price: "",
  });

  const changeHandlerAdd = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const nameSearch = query.get("search");

  useEffect(() => {
    dispatch(ACTION_GET_ALL_PRODUCTS());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nameSearch && nameSearch !== "") {
      dispatch(ACTION_GET_SEARCH_PRODUCTS(nameSearch))
    } else {
      dispatch(ACTION_GET_ALL_PRODUCTS())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch]);

  // Functional Handle Search
  const changeHandlerSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    history.push(`/products?search=${search}`);
    setSearch("");
  };

  const changeFile = (e) => {
    setAddProduct({
      ...addProduct,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", addProduct.nameProduct);
    formData.append("image", addProduct.image);
    formData.append("description", addProduct.description);
    formData.append("stock", addProduct.stock);
    formData.append("discount", addProduct.discount);
    formData.append("category_id", addProduct.category);
    formData.append("delivery_days", addProduct.days);
    formData.append("delivery_time", addProduct.time);
    formData.append("size", addProduct.size);
    formData.append("price", addProduct.price);

    INSERT(formData)
      .then((res) => {
        alert(res.data.message);
        dispatch(ACTION_GET_ALL_PRODUCTS())
        toggle()
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleDetails = (id) => {
    history.push(`/details/${id}`);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const token = localStorage.getItem("token");
  const picture = localStorage.getItem("picture");
  const level = localStorage.getItem("level");

  return (
    <div>
      <div className="border-bottom">
        <NavbarComp
          isLogin={true}
          data={dataProducts}
          searchProd={search}
          change={changeHandlerSearch}
          submit={handleSubmitSearch}
          token={token} image={picture} level={level}
        />
      </div>
      <section className="container-fluid promo">
        <div className="row">
          <div className="col-lg-4 cardPromo">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-12 pt-4 text-center">
                <h4>Promo Today</h4>
                <small>
                  Coupons will be updated every weeks. Check them out !
                </small>
              </div>
              <div className="row d-md-flex flex-md-column d-flex flex-column justify-content-lg-center align-items-lg-center col-lg-10 pt-5 testiCard">
                {promo.map((e, i) => (
                  <div
                    key={i}
                    id={e.id}
                    className="card mb-3 mx-md-2 mx-2 rounded"
                  >
                    <div className="row g-0">
                      <div className="col-md-4 col-4">
                        <img
                          src={`${API_URL}helpers/${e.image}`}
                          style={{ width: "85px", height: "94px" }}
                          alt="pict"
                        />
                      </div>
                      <div className="col-md-8 col-8">
                        <div className="card-body ps-0">
                          <p className="card-text fw-bold fs-6">
                            {e.name}
                            <br />
                            <small className="text fw-normal">
                              {e.description}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row justify-content-center align-items-center ms-lg-0 ms-md-0 ms-2">
              <button className="btn rounded-pill fw-bold fs-6 mt-5 p-3 apply">
                Apply Coupon
              </button>
            </div>

            <div className="row justify-content-lg-center align-content-lg-center ms-lg-5 mt-lg-5 ps-md-5 align-items-md-center pb-md-5 mt-4 terms">
              <p className="fw-bold ps-lg-4 titleTerms">Terms and Condition</p>
              <ol className="row d-flex align-items-lg-center ms-lg-5 ms-md-5 ms-3">
                <li>You can only apply 1 coupon per day </li>
                <li>It only for dine in </li>
                <li>Buy 1 get 1 only for new user</li>
                <li>Should make member card to apply coupon</li>
              </ol>
            </div>
            <div className=" d-flex flex-lg-column align-items-center justify-content-center mt-lg-0 mt-3 addPromo">
              <button
                type="button"
                className={
                  level === '1' ? "d-none" : "d-block btn btnPromo me-lg-0 me-3"
                }
              >
                Add New Promo
              </button>
              <button
                type="button"
                className={
                  level === '1' ? "d-none" : "d-block btn btnEditPromo mt-lg-4"
                }
              >
                Edit Promo
              </button>
            </div>
          </div>

          <div className="col-lg-7 col-md-12 mt-lg-0 mt-5 border-start product">
            <div className="container-fluid mt-lg-3 mt-md-3 mb-2">
              <div className="row d-flex mt-lg-0 mt-4">
                <div className="navbar d-flex align-content-center navProduct">
                  <div className="navbar-nav flex-row ">
                    <button type="btn" className="btn nav-item col-7 fs-6">
                      Favorite & Promo
                    </button>
                    <button type="btn" className="btn nav-item col-lg-5 fs-6">
                      Coffee
                    </button>
                    <button type="btn" className="btn nav-item col-6 fs-6">
                      Non Coffee
                    </button>
                    <button type="btn" className="btn nav-item col-lg-5 fs-6">
                      Foods
                    </button>
                    <button type="btn" className="btn nav-item col-4 fs-6">
                      Add-on
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid mt-lg-5 mt-md-5 ms-lg-5 ms-md-0 menuProduct">
              <div className="row itemProduct">
              { allProducts.loadAll ? <h2>Loading...</h2> :
            dataProducts.map((e, i) =>
            <div key={i} className="col-lg-3 col-md-4 col-6 py-lg-3 py-md-3 py-3 prod">
              <div
                className="card bg-white border-0 shadow-lg rounded"
                style={{width: '156px', height: '215px'}}
                onClick={()=> handleDetails(e.id)}
              >
              <img src={API_URL+e.image}
                    className="card-img-top rounded-circle position-absolute ms-3"
                    style={{width: '120px', height: '120px'}}
                    alt="Produk"
                />
                <div
                  className={e.discount === 0 ? 'd-none' : 'discount'}
                >
                  {e.discount}%
                </div>
                <div className="card-body mt-lg-5 mt-md-5 mt-4">
                  <p id={`product${e.id}`} className="col-lg-10 col-md-8 col-12 text-center ms-lg-2 text-lg-center ms-md-4 fw-bold mt-2 fs-5 mb-5 nameProd">
                    {e.name_product}
                  </p>
                  <span className="fw-bold ms-lg-4 ms-md-4 ms-2">
                    {/* {e.price} */}
                    IDR {numberWithCommas(e.price)}
                  </span>
                </div>
              </div>
            </div>
          )}
              </div>
              <div class="ms-lg-5 ms-md-5 mt-3 mb-3 note">
                <p>*the price has been cutted by discount appears</p>
                <div className=" d-flex justify-content-center align-item-center mt-lg-5 edit">
                  <button
                    type="button"
                    onClick={toggle}
                    className={
                      level === '1'
                        ? "d-none"
                        : "d-block btn btnAdd me-lg-4"
                    }
                    // className="btn btnAdd me-lg-4"
                  >
                    Add Products
                  </button>
                    <ModalAdd
                      modal={modal}
                      {...addProduct}
                      toggleModal={toggle}
                      change={changeHandlerAdd}
                      changeFiles={changeFile}
                      submit={handleSubmitAdd}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footHome">
        <FooterComp />
      </footer>
    </div>
  );
};

export default Products;

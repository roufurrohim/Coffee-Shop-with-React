import React, { useEffect, useState , createContext} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import { ACTION_GET_ALL_PRODUCTS, INSERT } from "../redux/actions/products";
import FooterComp from "../components/Footer";
import CardProducts from "../components/CardProducts";
import NavbarComp from "../components/Nav";
import ModalAdd from "../components/ModalAdd";
import "../css/Products.css";

export const DataContext = createContext();

const Products = () => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.products);
  const dataProducts = count.all;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [products, setProducts] = useState(dataProducts);
  //   const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [promo, setPromo] = useState([
    {
      id: "pc1",
      image:
        "https://s3-alpha-sig.figma.com/img/5272/76a9/8d88c62a29339c6f83f29e8f40c20178?Expires=1632700800&Signature=hgNrfi21x8HpSbbrVashM13vikYetwr3eIfd5nb-jdje7O2lW53gpR63sc~9La~~w3i8QaW5soMFTt2Hv4EXq7-cj~xZqGTJtgnjBJm0SuXepY1sCV5PoFecywJTpANqd66IkuLxi8iXZ1ozHYfHKYTzubDO~Ue8QfMvgIa5ISSEEmiahc5HtEv~xr5s8zdYs~ALHxvR9lKYcf1POZxYSzBQ0vXBmIs1uOp68EoINXW6u3BC31uFXGdkbo3SltZAIQXq7QyKTVVntnFwFPW1Io0iqMbxsiWe78E5v7afwW~CU3jjS-orATbUUWGT1HhTMXZEg1I0n0by2WQrXDcDnQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      name: "HAPPY MOTHER’S DAY!",
      description: "Get one of our favorite menu for free!",
    },
    {
      id: "pc2",
      image:
        "https://s3-alpha-sig.figma.com/img/ed87/b600/bcd624c9cdfab5f48a586cfe014785b0?Expires=1632700800&Signature=WIkM9MxXXqp850wDzsim5ubd57utPC6kOXkJgYvvLU5lJ2ibDrxv5oFdTSfCZ8vJZLHp3edMrLXAKTSIhDPYWbD7VO8qXhQ3mJ1BSAvjflUIrZnwwDdyJsePnKznQ0pyI10En8z~pHNUv1Mg3L6kgKt5pQ1ksosiSM~ty7ii3lqM3Xz0U1~uC-XSHJsb-kcFRZwkzwTA0QWKHj7bIRWkK2y8UfEuEgN22Wmnhbwbd7WCSdiR7sK0DnVQj3jlvbNtOK~ItuTxbbBTCK8YF0GZlHT2J0W8qk7sePBSTFpr7Av48Kruas6bC-BKqsAO3Dl9fJBKsYfdEYB1s5~xCqH4cw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      name: "Get a cup of coffee for free on sunday morning",
      description: "Only at 7 to 9 AM",
    },
    {
      id: "pc3",
      image:
        "https://s3-alpha-sig.figma.com/img/5272/76a9/8d88c62a29339c6f83f29e8f40c20178?Expires=1632700800&Signature=hgNrfi21x8HpSbbrVashM13vikYetwr3eIfd5nb-jdje7O2lW53gpR63sc~9La~~w3i8QaW5soMFTt2Hv4EXq7-cj~xZqGTJtgnjBJm0SuXepY1sCV5PoFecywJTpANqd66IkuLxi8iXZ1ozHYfHKYTzubDO~Ue8QfMvgIa5ISSEEmiahc5HtEv~xr5s8zdYs~ALHxvR9lKYcf1POZxYSzBQ0vXBmIs1uOp68EoINXW6u3BC31uFXGdkbo3SltZAIQXq7QyKTVVntnFwFPW1Io0iqMbxsiWe78E5v7afwW~CU3jjS-orATbUUWGT1HhTMXZEg1I0n0by2WQrXDcDnQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      name: "HAPPY MOTHER’S DAY!",
      description: "Get one of our favorite menu for free!",
    },
    {
      id: "pc4",
      image:
        "https://s3-alpha-sig.figma.com/img/e25b/8a97/346f786692a9f23c7fc959db9981ae5c?Expires=1632700800&Signature=H~kN019KVYavlea1AWGpBuCwEZTvIyliaYevckWOwWmt1PATnJkhCGn8VqWnpA8bY09E6RVmc1CRbGjqoZZRnnHuk4Pfra2-UqpEChYJqOHW5VlZpCDQpIj-q9q0he893nCeTXbfASPOHTwQC0fVKE~xKs9yrf3tDk8~GajvQndhuDf5IhvnLcjbaLe0wtM2vl0P~dsQxYUDnCLHqdivqCAvbasjzTWMxMHPjSMzEO2FqXPSrYkJMoV1Qxhk-E85Zq-fS0CBH2O2nplZ20lDm4QOw8e6ZFlKeepkFUxPKDwaKTMlMuhFDwyrrcgoCtIyD4nWX2~EhCR7DnwsmgPBTQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      name: "HAPPY HALLOWEEN!",
      description:
        "Do you like chicken wings? Get 1 free only if you buy pinky promise",
    },
  ]);

  const [addProduct, setAddProduct] = useState({
    nameProduct:"",
    image:"",
    imagePreview: "",
    description:"",
    stock:"",
    discount:"",
    days:"",
    time:"",
    category:"",
    details: [
      {
        size: "",
        price:""
      },
    ]
  })

  const [details, setDetails] = useState([
    {
      size: "",
      price: ""
    }
  ])

  const changeHandlerAdd = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };

  const changeHandlerDetails = (e) => {
    setDetails(
        {...details, [e.target.name]: e.target.value, }
      )
  }

  const countUser = useSelector((state) => state.user)
  const dataUser = countUser.all

  const history = useHistory()

  const location = useLocation()

  const query = new URLSearchParams(location.search);
  const nameSearch = query.get("search");

  useEffect(() => {
    dispatch(ACTION_GET_ALL_PRODUCTS());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nameSearch && nameSearch !== "") {
      console.log(nameSearch)
      const dataFill = dataProducts.filter((e) => e.name_product === nameSearch ? e : null)
      setProducts(dataFill)
    } else {
      setProducts(dataProducts)
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
    setSearch("")
  };

  const changeFile = (e) => {
    setAddProduct({
      ...addProduct,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };


  const handleSubmitAdd = (e) => {
    e.preventDefault()

    setProducts({
      ...addProduct,
      details: [
        ...addProduct.details,
        {
          price: details.price,
          size: details.size
        }
    ]
    })

    console.log(addProduct.details[0])

    const formData = new FormData()
      formData.append("name", addProduct.nameProduct)
      formData.append("image", addProduct.image)
      formData.append("description", addProduct.description)
      formData.append("stock", addProduct.stock)
      formData.append("discount", addProduct.discount)
      formData.append("category_id", addProduct.category)
      formData.append("delivery_days", addProduct.days)
      formData.append("delivery_time", addProduct.time)
      formData.append("details", addProduct.details[0])
      
 
      INSERT(formData)
      .then((res) => {
        alert(res.data.message)
        // resetInput();
        // history.push("/products")
      })
      .catch((err) => {
        alert(err.message)
        // resetInput();
      })
    }


  const handleDetails = (id) => {
    history.push(`/details/${id}`);
    localStorage.setItem("idProduct", id);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

  return (
    <div>
      <div className="border-bottom">
        <NavbarComp 
        isLogin={true}
        data={dataProducts}
        searchProd={search}
        change={changeHandlerSearch}
        submit={handleSubmitSearch} />
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
                          src={e.image}
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
          </div>

          <div className="col-lg-7 col-md-12 border-start product">
            <div className="container-fluid mt-lg-3 mt-md-3 mt-4 mb-2">
              <div className="row d-flex">
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
                <DataContext.Provider value={products}>
                  <CardProducts
                    handleDetails={handleDetails}
                    numberWithCommas={numberWithCommas}
                  />
                </DataContext.Provider>
              </div>
              <div class="ms-lg-5 ms-md-5 mt-3 mb-3 note">
                <p>*the price has been cutted by discount appears</p>
                <div className=" d-flex justify-content-center align-item-center mt-lg-5 edit">
                  <button
                    type="button"
                    onClick={toggle}
                    className={dataUser.level === 1 ? "d-none" : "d-block btn btnAdd me-lg-4"}
                    // className="btn btnAdd me-lg-4"
                  >
                    Add Products
                  </button>
                  <DataContext.Provider value={products}>
                    <ModalAdd
                      modal={modal}
                      {...addProduct}
                      toggleModal={toggle}
                      change={changeHandlerAdd}
                      changeFiles = {changeFile}
                      changeDetails={changeHandlerDetails}
                      submit={handleSubmitAdd}
                    />
                  </DataContext.Provider>
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

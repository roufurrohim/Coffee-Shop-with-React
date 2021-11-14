// import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
// import '../css/NewProduct.css'

const NewProduct = () => {
  // const [addProduct, setAddProduct] = useState({
  //   nameProduct: "",
  //   image: "",
  //   imagePreview: "",
  //   description: "",
  //   stock: "",
  //   discount: "",
  //   days: "",
  //   time: "",
  //   category: "",
  //   size: "",
  //   price: "",
  // });

  const token = localStorage.getItem("token");
  const picture = localStorage.getItem("picture");
  const level = localStorage.getItem("level");
  return (
    <div>
      <div className="border-bottom navbarDetails">
        <Nav token={token} image={picture} level={level} />
      </div>
      <section className="container-fluid newProduct">
        <p className="fw-bold mt-3 ms-5 navigation">
          Favorite & Promo{" "}
          <span style={{ color: "#6A4029" }}> &gt; Add new Product</span>
        </p>
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
              <label id="chooseAdd" className="btn btn-default btn-file">
              Choose from gallery <input type="file" style={{display: "none"}} required />
              </label>
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

export default NewProduct;

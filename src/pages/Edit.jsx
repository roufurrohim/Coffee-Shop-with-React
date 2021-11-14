import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UPDATE } from "../redux/actions/products";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";
import "../css/Edit.css";

const Edit = () => {
  const { id } = useParams();

  const data = useSelector((state) => state.products);
  const dataProducts = data.all;

  // eslint-disable-next-line array-callback-return
  // eslint-disable-next-line eqeqeq
  const fill = dataProducts.filter((e) => (e.id == id ? e : undefined));
  const dataFill = fill[0];
  
  const [edit, setEdit] = useState({
    name: dataFill.name_product,
    image: dataFill.image,
    imagePreview: "",
    description: dataFill.description,
    stock: dataFill.stock,
    discount: dataFill.discount,
    category: dataFill.id_category,
    delivery_days: dataFill.delivery_days,
    delivery_time: dataFill.delivery_time,
    size: dataFill.size,
    price: dataFill.price,
  });
  
  const changeHandler = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };
  const changeHandlerImage = (e) => {
    setEdit({
      ...edit,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const history = useHistory();

  const handleSubmitSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", edit.name);
    formData.append("image", edit.image);
    formData.append("description", edit.description);
    formData.append("stock", edit.stock);
    formData.append("discount", edit.discount);
    formData.append("category_id", edit.category);
    formData.append("delivery_days", edit.delivery_days);
    formData.append("delivery_time", edit.delivery_time);
    formData.append("size", edit.size);
    formData.append("price", edit.price);

    UPDATE(formData, id)
      .then((res) => {
        alert(res.data.message);
        history.push(`/products`)
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleCancel = () => {
    history.push(`/details/${id}`);
  };

  const token = localStorage.getItem("token");
  const picture = localStorage.getItem("picture");
  const level = localStorage.getItem("level");

  return (
    <div>
      <div className="border-bottom navbarDetails">
        <Nav token={token} image={picture} level={level} />
      </div>
      <div className=" container-fluid mt-5 mb-5 formEdit">
        <Form className="edit" onSubmit={handleSubmitSave}>
          <FormGroup row>
            <Label for="name" sm={2} className="mb-3 name">
              Name :
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="name"
                value={edit.name}
                id="name"
                placeholder="Name Products"
                onChange={changeHandler}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="image" sm={2} className="mb-3">
              Image :
            </Label>
            <img src={edit.imagePreview} style={{width: "200px", height: "200px"}} alt="preview" className="mt-lg-1 mt-5" />
            <Col sm={10}>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={changeHandlerImage}
              />
            </Col>
          </FormGroup>
          <FormGroup className="mb-3" row>
            <Label for="text" sm={2}>
              Description :
            </Label>
            <Col sm={10} className="inputDesc">
              <Input
                type="textarea"
                name="description"
                id="text"
                value={edit.description}
                style={{ height: "100px" }}
                onChange={changeHandler}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="stock" sm={2} className="mb-3">
              Stock :
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="stock"
                id="stock"
                value={edit.stock}
                placeholder="Stock"
                onChange={changeHandler}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="discount" sm={2} className="mb-3">
              Discount :
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="discount"
                id="discount"
                placeholder="Discount"
                value={edit.discount}
                onChange={changeHandler}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="price" sm={2} className="mb-3">
              Price :
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="price"
                id="price"
                value={edit.price}
                placeholder="exp 10000"
                onChange={changeHandler}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="day" sm={2} className="mb-3">
              Delivery Days :
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="delivery_days"
                id="day"
                value={edit.delivery_days}
                placeholder="start day - end day"
                onChange={changeHandler}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="time" sm={2} className="mb-3">
              Delivery Time :
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="time"
                id="time"
                value={edit.delivery_time}
                placeholder="start time - end time AM/PM"
                onChange={changeHandler}
              />
            </Col>
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="size" className="mb-3">
              Size :
            </Label>
            <Input
              type="select"
              value={edit.size}
              name="size"
              id="size"
              style={{ width: "50%", marginLeft: "20px" }}
              onChange={changeHandler}
            >
              <option value={edit.size}>{edit.size}</option>
              <option value="R">R</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="category">Category :</Label>
            <Input
              type="select"
              defaultValue={edit.category}
              name="category"
              id="category"
              style={{ width: "50%", marginLeft: "20px", marginTop: "20px" }}
              onChange={changeHandler}
            >
              <option>Select</option>
              <option value="1">Coffee</option>
              <option value="2">Non Coffee</option>
              <option value="3">Foods</option>
              <option value="4">Add-on</option>
            </Input>
          </FormGroup>
          <FormGroup check row className="d-flex mt-3 handleBtn">
            <Col className="btnGroup">
              <Button
                type="submit"
                onClick={handleSubmitSave}
                className="fw-bold me-5 save"
              >
                Save Product
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                className="fw-bold cancel"
              >
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
      <footer className="footEdit">
        <Footer />
      </footer>
    </div>
  );
};

export default Edit;

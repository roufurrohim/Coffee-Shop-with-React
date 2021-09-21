import { useState } from "react";
import { useHistory } from 'react-router-dom'
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";
import '../css/Edit.css'

const Edit = () => {

    const dataId = localStorage.getItem("idProduct");

    const data = useSelector((state) => state.products)
    const dataProducts = data.all

    // eslint-disable-next-line array-callback-return
    // eslint-disable-next-line eqeqeq
    const fill = dataProducts.filter((e) => e.id == dataId ? e : undefined )
    const dataFill = fill[0]

    console.log(dataFill)

    const [edit, setEdit] = useState(
        {
            name: dataFill.name,
            image: dataFill.image,
            imagePreview: "",
            description: dataFill.description,
            stock: dataFill.stock,
            discount: dataFill.discount,
            category: dataFill.id_category,
            delivery_days: dataFill.delivery_days,
            delivery_time: dataFill.delivery_time,
            details: [
                {
                    id_size: dataFill.id_size,
                    size: dataFill.size,
                    price: dataFill.price
                }
            ]
        }
    )

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

  const history = useHistory()

  const handleSubmitSave = (e) => {
    e.preventDefault()

    // const dataId = localStorage.getItem("idProduct");
    // const id = JSON.parse(dataId);
    // const data = {
    //     name: edit.name,
    //     image: edit.image,
    //     description: edit.description,
    //     stock: edit.stock,
    //     discount: edit.discount,
    //     category: edit.category,
    //     delivery_days: edit.delivery_days,
    //     delivery_time: edit.delivery_time
    //   }

    //   const dataSize = {
    //     id: size.id,
    //     size: edit.size,
    //     price: edit.price,
    //     code_products: id
    //   }
    
    // axios.all([
    // //   axios.patch(`${URL}products/${id}`, data, { headers: { token: Token }}),
    // //   axios.patch(`${URL}size/${size.id}`, dataSize, { headers: { token: Token }})
    // ])
    // .then(axios.spread((...responses) => {
    //   const resProduct = responses[0]
    //   const resSize = responses[1]
    //   alert(resProduct.data.message, resSize.data.message);
    //   history.push(`/details/${id}`)
    // }))
    // .catch(errors => {
    //   alert(errors);
    // })
  }

  const handleCancel = () => {
    const data = localStorage.getItem("idProduct");
    const id = JSON.parse(data);
    history.push(`/details/${id}`)
  }

  return (
    <div>
      <div className="border-bottom navbarDetails">
        <Nav isLogin={true} />
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
                name="nameProduct"
                value={edit.name}
                id="name"
                placeholder="Name Products"
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="image" sm={2} className="mb-3">
              Image :
            </Label>
            <Col sm={10}>
              <Input
                type="file"
                name="image"
                id="image"
                // value={edit.image}
                // placeholder="Paste Image Link In Here"
                onChange={(e) => {
                    changeHandlerImage(e);
                }}
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
                style={{height:'100px'}}
                onChange={(e) => {
                    changeHandler(e);
                }}
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
                onChange={(e) => {
                    changeHandler(e);
                }}
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
                onChange={(e) => {
                    changeHandler(e);
                }}
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
                onChange={(e) => {
                    changeHandler(e);
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="day" sm={2} className="mb-3">
              Delivery Day :
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="day"
                id="day"
                value={edit.delivery_days}
                placeholder="start day - end day"
                onChange={(e) => {
                    changeHandler(e);
                }}
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
                onChange={(e) => {
                    changeHandler(e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="size" className="mb-3">Size :</Label>
            <Input
              type="select"
              value={edit.size}
              name="size"
              id="size"
              style={{width:'50%', marginLeft:'20px'}}
              onChange={(e) => {
                changeHandler(e);
              }}
            >
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
              style={{width:'50%', marginLeft:'20px', marginTop:'20px'}}
              onChange={(e) => {
                changeHandler(e);
              }}
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
              <Button type="submit" onClick={handleSubmitSave} className="fw-bold me-5 save">
                Save Product
              </Button>
              <Button type="button" onClick={handleCancel} className="fw-bold cancel">Cancel</Button>
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

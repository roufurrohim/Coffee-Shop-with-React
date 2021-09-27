import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import '../css/ModalAdd.css'

const ModalAdd = ({ modal, toggleModal, nameProduct, imagePreview, change, changeFiles, changeDetails, submit }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>Add Product</ModalHeader>
        <ModalBody>
          <Form onSubmit={submit}>
            <FormGroup row>
              <Label for="name" sm={2} className="mb-3">
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="nameProduct"
                  value={nameProduct}
                  id="name"
                  placeholder="Name Products"
                  onChange={(e)=> {change(e)}}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="image" sm={2} className="mb-3">
                Image
              </Label>

              <img src={imagePreview} alt="pict" className="my-2 imgModal" />
              <Col sm={10}>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e)=> {changeFiles(e)}}
                  accept="image/*"
                />
              </Col>
            </FormGroup>
            <FormGroup className="mb-3" row>
              <Label for="text" sm={3}>
                Description
              </Label>
              <Col sm={8}>
                <Input type="textarea" name="description" id="text" onChange={(e)=> {change(e)}}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="stock" sm={2} className="mb-3">
                Stock
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder="Stock"
                  onChange={(e)=> {change(e)}}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="discount" sm={2} className="mb-3">
                Discount
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                  onChange={(e)=> {change(e)}}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="price" sm={2} className="mb-3">
                Price
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="exp 10000"
                  onChange={(e)=> {change(e)}}
                />
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Label for="day" sm={4} className="mb-3">
                Delivery Day
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="days"
                  id="day"
                  placeholder="start day - end day"
                  onChange={(e)=> {change(e)}}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="time" sm={4} className="mb-3">
                Delivery Time
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="time"
                  id="time"
                  placeholder="start time - end time AM/PM"
                  onChange={(e)=> {change(e)}}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="size">Size</Label>
              <Input type="select" name="size" id="size" onChange={(e)=> {change(e)}}>
                <option>Select Size</option>
                <option value="R">R</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input type="select" name="category" id="category" onChange={(e)=> {change(e)}}>
                <option>Select Category</option>
                <option value="1">Coffee</option>
                <option value="2">Non Coffee</option>
                <option value="3">Foods</option>
                <option value="4">Add-on</option>
              </Input>
            </FormGroup>
            <FormGroup check row className="d-flex mt-3 handleBtn">
              <Col>
                <Button type="submit" className="fw-bold me-lg-5 add">Add Product</Button>
                <Button onClick={toggleModal} className="fw-bold cancel">Cancel</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalAdd;

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalHistory = ({ modal, toggleModalHis, data, dataTrans }) => {
  const numberWithCommas = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return x;
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModalHis} centered>
        <ModalHeader className=" justify-content-center mb-5">
          Details Transaction
        </ModalHeader>
        <ModalBody>
          {data.map((e, i) => (
            <div
              className="row align-items-center justify-content-center mb-5"
              key={i}
            >
              <div className="col-9 ps-lg-0 ps-3 ">
                <h5 className="fw-bold TitleCart">{e.name_product}</h5>
                <div className="row mt-3 ">
                  <div className="col-5 d-flex ">
                    <div className=" bdrbutton">x{e.qty}</div>
                  </div>
                  <div className="col-7">
                    <p className="price d-flex justify-content-end ">
                      IDR {numberWithCommas(e.price_product * e.qty)}
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
                        <p>IDR {numberWithCommas(dataTrans.subtotal)}</p>
                        <p>IDR {numberWithCommas(dataTrans.tax)}</p>
                        <p>IDR {numberWithCommas(dataTrans.shipping)}</p>
                        <h4 className="fw-bold pt-4">
                          IDR {numberWithCommas(dataTrans.total)}
                        </h4>
                      </div>
                    </div>
        </ModalBody>
        <ModalFooter className=" border-top-0">
          <Button color="secondary" onClick={toggleModalHis}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalHistory;

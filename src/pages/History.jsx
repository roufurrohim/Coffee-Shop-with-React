import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_GET_ALL_HISTORY, ACTION_GET_DETAILS_HISTORY, DELETE_HISTORY } from "../redux/actions/history";
// import { API_URL } from "../helpers/env";
import { AiOutlineDelete } from "react-icons/ai";
import FooterComp from "../components/Footer";
import NavbarComp from "../components/Nav";
import '../css/History.css'
import ModalHistory from '../components/ModalHistory'

const History = () => {
    const dispatch = useDispatch()
    
    const allHistory = useSelector((state) => state.history)
    const data = allHistory.all
    const details = allHistory.details

  const [modal, setModal] = useState(false);
  const [history, setHistory] = useState({})
  console.log(history)

  const toggleModal = (id) => {
      setModal(!modal);
      dispatch(ACTION_GET_DETAILS_HISTORY(id))
      const dataHis = data.filter((e) => e.id_transaction === id ? e : undefined)
      setHistory(dataHis[0])
    }

    const toggleClose = () => setModal(!modal)
    
    useEffect(() => {
        dispatch(ACTION_GET_ALL_HISTORY())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const numberWithCommas = (x) => {
        if (x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
          return x
        }
    };

    const del = (id) => {
        DELETE_HISTORY(id).then((res) => {
            const msg = res.data.message
            console.log(res.data.message)
            dispatch(ACTION_GET_ALL_HISTORY())
            alert(msg)
        }).catch((err) => {
            console.log(err)
            alert(err)
        })
      };

    const token = localStorage.getItem("token");
    const picture = localStorage.getItem("picture");
    const level = localStorage.getItem("level");
    return (
        <div>
            <div className="border-bottom">
                <NavbarComp token={token} image={picture} level={level} />
            </div>
            
            <div className={data.length === 0 ? "container-fluid bgHistoryNone" : "container-fluid bgHistory"}>
                <div className="row">
                    <div className="col-12 mt-5 titleHistory">
                        <h1 className="mt-5">Let’s see what you have bought!</h1>
                        <small className="noteHistory">Select item to delete</small>
                    </div>
                    { allHistory.loadAll ? <h1>Loading...</h1> : 
                    <div className="d-flex flex-wrap justify-content-around">
                        {
                            data.map((e, i) => (
                                <div key={i} className="col-lg-3 col-12 my-lg-5 my-4 mx-lg-5">
                                    <div className="card p-3 cardHistory">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h4 className="ms-lg-3">{e.remark}</h4>
                                                    </div>
                                                    <div className="col-6 me-lg-0 text-end">
                                                    <AiOutlineDelete
                                                    size={28}
                                                    className="icon ms-2 text-danger"
                                                    onClick={() => del(e.id_transaction)}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            <p>Total: IDR {numberWithCommas(e.total)}</p>
                                            <p>Address: {e.address}.</p>
                                            <div className="col-12 detailsHistory" onClick={() =>toggleModal(e.id_transaction)}>
                                                <div className="row text-end">
                                                    <div className="col-11 text-end ">
                                                        <p className="detailsHis">View Details</p>
                                                    </div>
                                                </div>
                                                <div className="modal">
                                                   <ModalHistory 
                                                   modal={modal}
                                                   data ={details}
                                                   dataTrans = {history}
                                                   toggleModalHis={toggleClose}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    }
                </div>
            </div>
            {/* Footer */}
            <footer className="footCheck">
                <FooterComp />
            </footer>
        </div>
    )
}

export default History
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_GET_USER } from "../redux/actions/user";
import { API_URL } from "../helpers/env";
import FooterComp from "../components/Footer";
import NavbarComp from "../components/Nav";
import "../css/Profile.css";
import { useHistory } from "react-router";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const data = useSelector((state) => state.user);
  const dataUser = data.all;

  useEffect(() => {
    const id = localStorage.getItem("id");
    dispatch(ACTION_GET_USER(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
      localStorage.clear()
      history.push('/')
  }

  const token = localStorage.getItem("token");
  const picture = localStorage.getItem("picture");
  const level = localStorage.getItem("level");
  return (
    <div>
      <div className="border-bottom">
        <NavbarComp token={token} image={picture} level={level} />
      </div>
      <section className="container-fluid pageProfile">
        <div className="row justify-content-center ">
          <div className="col-lg-6 mb-3 text-light">
            <h2 className="fw-bold">User Profile</h2>
          </div>
          <div className="row pb-3 justify-content-lg-center">
            <div className="col-lg-2 col-md-12 py-md-3 my-2 profil">
              <div className="card bg-white rounded profilePageCard">
                <div className="card-body text-center">
                  <img
                    src={`${API_URL}${picture}`}
                    className="rounded-circle"
                    style={{ width: "112px", height: "100px" }}
                    alt="profile"
                  />
                  {/* <button id="create" className="btn-label btn-dark border-0 rounded-circle position-absolute" style="width: 30px; height: 32px; background-color: #6A4029; "><i className="bi bi-pencil"></i></button> */}
                  <h6 className="pt-lg-4 pb-0">{dataUser[0].name}</h6>
                  <small className="">{dataUser[0].email}</small>
                </div>
              </div>
            </div>

            <div className="col-lg-4 my-4 contact">
              <div className="card bg-white rounded cardContact">
                <div className="card-body">
                  <div className="card-title d-flex ">
                    <h3 className="col-11" style={{ color: "#4F5665" }}>
                      Contacts
                    </h3>
                    {/* <button id="create" className="btn-label btn-dark border-0 rounded-circle" style="width: 40px; height: 40px; background-color: #6A4029; "><i className="bi bi-pencil"></i></button> */}
                  </div>
                  <div className="card-text mt-5 ms-2">
                    <ul className="row list-unstyled ps-2">
                      <li className="col-5 ps-0 border-bottom border-2 border-dark">
                        <label
                          for="email"
                          className="form-label"
                          style={{ color: "#9F9F9F" }}
                        >
                          Email adress :
                        </label>
                        <p className="mb-0">{dataUser[0].email}</p>
                      </li>
                      <li className="col-5 ms-3 ps-0 border-bottom border-2 border-dark">
                        <label
                          for="number"
                          className="form-label"
                          style={{ color: "#9F9F9F" }}
                        >
                          Mobile number :
                        </label>
                        <p className="mb-0">{dataUser[0].phone}</p>
                      </li>
                      <li className="col-9 col-lg-5 col-md-5 mt-5 ps-0 border-bottom border-2 border-dark">
                        <label
                          for="adress"
                          className="form-label"
                          style={{ color: "#9F9F9F" }}
                        >
                          Delevery Adress :
                        </label>
                        <p className="mb-0">{dataUser[0].address}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-lg-center py-5">
            <div className="d-lg-flex col-lg-6 col-lg-2 mt-5 detailsProfile">
              <div className="card bg-white rounded cardDetailsProfile">
                <div className="card-body">
                  <div className="card-title d-flex ">
                    <h3 className="col-11" style={{ color: "#4F5665" }}>
                      Details
                    </h3>
                    {/* <button id="create" className="btn-label btn-dark border-0 rounded-circle" style="width: 40px; height: 40px; background-color: #6A4029; "><i className="bi bi-pencil"></i></button> */}
                  </div>
                  <div className="d-flex justify-content-between card-text mt-3 ms-0">
                    <div className="col">
                      <ul className="list-unstyled ps-2">
                        <li className="col-12 ps-0 border-bottom border-2 border-dark">
                          <label
                            for="name"
                            className="form-label"
                            style={{ color: "#9F9F9F" }}
                          >
                            Display name :
                          </label>
                          <p className="mb-0">{dataUser[0].name}</p>
                        </li>
                        <li className="col-12 mt-3 ps-0 border-bottom border-2 border-dark">
                          <label
                            for="firstName"
                            className="form-label"
                            style={{ color: "#9F9F9F" }}
                          >
                            First name :
                          </label>
                          <p className="mb-0">{dataUser[0].first_name}</p>
                        </li>
                        <li className="col-12 mt-3 ps-0 border-bottom border-2 border-dark">
                          <label
                            for="adress"
                            className="form-label"
                            style={{ color: "#9F9F9F" }}
                          >
                            Last name :
                          </label>
                          <p className="mb-0">{dataUser[0].last_name}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col ms-5 ps-5 pe-0">
                      <ul className="list-unstyled ">
                        <li className="col-8 ps-0 border-bottom border-2 border-dark">
                          <label
                            for="name"
                            className="form-label"
                            style={{ color: "#9F9F9F" }}
                          >
                            DD/MM/YY :
                          </label>
                          <p className="mb-0">{new Date(dataUser[0].date).toLocaleDateString()}</p>
                        </li>
                        <li className="col-2 mt-3">
                          <ul className="list-unstyled form-check">
                            <li className="col-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radios"
                                id="radio"
                                value="option1"
                              />
                              <label className="form-check-label" for="radios">
                                Male
                              </label>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <ul className="list-unstyled form-check">
                            <li className="col-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                value="option2"
                                checked
                              />
                              <label
                                className="form-check-label"
                                for="exampleRadios2"
                              >
                                Female
                              </label>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ps-lg-5 pt-lg-3 ps-md-5 pt-md-3 pt-3 menu">
                <p className=" text-lg-center text-light fw-bold pb-3 fs-6">
                  Do you want to save the change?
                </p>
                <ul className="list-unstyled">
                  <li className="col-12">
                    <div
                      className="btn rounded-pill w-100 text-white"
                      style={{ backgroundColor: "#6A4029" }}
                    >
                      Save Change
                    </div>
                  </li>
                  <li className="col-12 py-4">
                    <div
                      className="btn  rounded-pill w-100"
                      style={{ backgroundColor: "#FFBA33", color: "#6A4029" }}
                    >
                      Cancel
                    </div>
                  </li>
                  <li className="col-12">
                    <div
                      className="btn my-4 w-100 rounded-pill bg-light "
                      style={{ color: "#6A4029" }}
                    >
                      Edit Password
                    </div>
                  </li>
                  <li className="col-12 " onClick={logOut}>
                    <div
                      className="btn w-100 rounded-pill bg-light ps-4"
                      style={{ color: "#6A4029" }}
                    >
                      Log out
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footCheck">
        <FooterComp />
      </footer>
    </div>
  );
};

export default Profile;

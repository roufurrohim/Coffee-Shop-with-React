import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { ACTION_GET_USER } from '../redux/actions/user';
import { API_URL } from '../helpers/env';
import NavbarComp from "../components/Nav";
import Check from "../svg/check.svg";
import MapVisit from "../svg/map.svg";
import Star from "../svg/star.svg";
import CheckList from '../svg/checkList.svg'
import FooterComp from "../components/Footer";
import "../css/Home.css";

const Home = () => {

  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const [partner, setPartner] = useState([
    {
      id: 1,
      name: "netflix",
      image: "netflix.png",
    },
    {
      id: 2,
      name: "reddit",
      image: "reddit.png",
    },
    {
      id: 3,
      name: "amazon",
      image: "amazon.png",
    },
    {
      id: 4,
      name: "discord",
      image: "discord.png",
    },
    {
      id: 5,
      name: "spotify",
      image: "spotify.png",
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [ratting, setRatting] = useState([
    {
      id: 1,
      name: "Viez Robert",
      image: "viez.png",
      address: "Warsaw, Poland",
      ratting: 4.5,
      comment:
        '"Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!"',
    },
    {
      id: 2,
      name: "Yessica Christy",
      image: "yessica.png",
      address: "Shanxi, China",
      ratting: 4.3,
      comment:
        '"I like it because I like to travel far and still can make my day better just by drinking their Hazelnut Latte"',
    },
    {
      id: 3,
      name: "Kim Young Jou",
      image: "kim.png",
      address: "Seoul, South Korea",
      ratting: 4.1,
      comment:
        '"This is very unusual for my taste, I haven’t liked coffee before but their coffee is the best! and yup, you have to order the chicken wings, the best in town!"',
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [ favorite, setFavorite ] = useState([
    {
      id: "p1",
      name: "Hazelnut Latte",
      image: "hazelnut.png",
      size: "L",
      price: 25000,
      description: [
        "Hazelnut Syrup",
        "Wanilla Whipped Cream",
        "Ice / Hot",
        "Sliced Banana on Top",
      ],
      stock: 20,
      discount: 0,
      category: "Coffee",
      delivery_days: "Tuesday",
      delivery_time: "4-8PM",
    },
    {
      id: "p2",
      name: "Pinky Promise",
      image: "pinky.png",
      size: "L",
      price: 25000,
      description: [
        "1 Shot of Coffee",
        "Vanilla Whipped Cream",
        "Chocolate Biscuits",
        "Strawberry Syrup",
        "Sliced strawberry on Top",
      ],
      stock: 23,
      discount: 0,
      category: "Non Coffee",
      delivery_days: "Monday",
      delivery_time: "1-3PM",
    },
    {
      id: "p3",
      name: "Chicken Fire Wings",
      image: "chicken.png",
      size: "L",
      price: 30000,
      description: [
        "Wings",
        "Drum Sticks",
        "Mayonaise and Lemon",
        "Hot Fried",
        "Secret Recipe",
        "Buy 1 Get 1 only for Dine in",
      ],
      stock: 12,
      discount: 15,
      category: "Foods",
      delivery_days: "Monday",
      delivery_time: "1-3PM",
    },
  ])

  useEffect(() => {
    const id = localStorage.getItem('id')
    dispatch(ACTION_GET_USER(id))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const token = localStorage.getItem("token");
  const picture = localStorage.getItem("picture");
  const level = localStorage.getItem("level");

  return (
    <div>
      <div className="navbarHome">
        <NavbarComp token={token} image={picture} level={level} />
      </div>

      {/* Jumbotron */}
      <section className="jumbotron-fluid position-relative started">
        <div className="container text-white pt-5">
          <div className="row pt-lg-5 pt-sm-5 header">
            <h1 className="col-lg-5 pt-lg-5 fw-bold lh-base">
              Start Your Day with Coffee and Good Meals
            </h1>
          </div>
          <p className="col-lg-4 pt-lg-3">
            We provide high quality beans, good taste, and healthy meals made by
            love just for you. Start your day with us for a bigger smile!
          </p>
          <button type="submit" className="btn text-white">
            Get Started
          </button>
        </div>
      </section>

      {/* Information Company */}
      <section className="container-fluid bg-white border border-light position-absolute d-lg-block d-none bg-black company">
        <div className="row info">
          <div className="col-4 ">
            <div className="row justify-content-lg-center align-items-lg-center mt-4 staff">
              <div className="col-1 align-items-lg-center justify-content-lg-center iconStaff">
                <svg
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.0001 7.8001C8.95488 7.8001 9.87055 7.42081 10.5457 6.74568C11.2208 6.07055 11.6001 5.15488 11.6001 4.2001C11.6001 3.24532 11.2208 2.32964 10.5457 1.65451C9.87055 0.979382 8.95488 0.600098 8.0001 0.600098C7.04532 0.600098 6.12964 0.979382 5.45451 1.65451C4.77938 2.32964 4.4001 3.24532 4.4001 4.2001C4.4001 5.15488 4.77938 6.07055 5.45451 6.74568C6.12964 7.42081 7.04532 7.8001 8.0001 7.8001ZM2.89875 18.6001C1.07696 18.6001 -0.457661 17.0687 0.23951 15.3856C0.661649 14.3664 1.28039 13.4404 2.0604 12.6604C2.84041 11.8804 3.76642 11.2616 4.78556 10.8395C5.80469 10.4174 6.89699 10.2001 8.0001 10.2001C9.1032 10.2001 10.1955 10.4174 11.2146 10.8395C12.2338 11.2616 13.1598 11.8804 13.9398 12.6604C14.7198 13.4404 15.3385 14.3664 15.7607 15.3856C16.4579 17.0687 14.9232 18.6001 13.1014 18.6001H2.89875Z"
                    fill="#6A4029"
                  />
                </svg>
              </div>

              <div className="col-1">
                <span className="fw-bold ">90+</span>
                <br />
                <span>Staff</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row justify-content-lg-center align-items-lg-center mt-4 store">
              <div className="col-1 iconStore">
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 7.54932C14 6.63006 13.8189 5.71981 13.4672 4.87053C13.1154 4.02125 12.5998 3.24958 11.9497 2.59957C11.2997 1.94956 10.5281 1.43394 9.67878 1.08216C8.8295 0.730377 7.91925 0.549316 7 0.549316C6.08075 0.549316 5.17049 0.730377 4.32122 1.08216C3.47194 1.43394 2.70026 1.94956 2.05025 2.59957C1.40024 3.24958 0.884626 4.02125 0.532843 4.87053C0.18106 5.71981 -1.36979e-08 6.63006 0 7.54932C0 8.93632 0.41 10.2263 1.105 11.3143H1.097C3.457 15.0093 7 20.5493 7 20.5493L12.903 11.3143H12.896C13.6164 10.1907 13.9995 8.88406 14 7.54932ZM7 10.5493C6.20435 10.5493 5.44129 10.2332 4.87868 9.67064C4.31607 9.10803 4 8.34497 4 7.54932C4 6.75367 4.31607 5.99061 4.87868 5.428C5.44129 4.86539 6.20435 4.54932 7 4.54932C7.79565 4.54932 8.55871 4.86539 9.12132 5.428C9.68393 5.99061 10 6.75367 10 7.54932C10 8.34497 9.68393 9.10803 9.12132 9.67064C8.55871 10.2332 7.79565 10.5493 7 10.5493Z"
                    fill="#6A4029"
                  />
                </svg>
              </div>
              <div className="col-1">
                <span className="fw-bold">30+</span>
                <br />
                <span>Stores</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row justify-content-lg-center align-items-lg-center mt-4">
              <div className="col-1 iconCostum">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 31 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.918 4.03337C26.2583 3.38873 25.475 2.87736 24.6129 2.52847C23.7507 2.17958 22.8267 2 21.8934 2C20.9602 2 20.0361 2.17958 19.174 2.52847C18.3119 2.87736 17.5286 3.38873 16.8688 4.03337L15.4997 5.37059L14.1305 4.03337C12.7979 2.73186 10.9905 2.00067 9.10587 2.00067C7.22128 2.00067 5.41387 2.73186 4.08126 4.03337C2.74865 5.33488 2 7.1001 2 8.94072C2 10.7813 2.74865 12.5466 4.08126 13.8481L5.45043 15.1853L15.4997 25L25.5489 15.1853L26.918 13.8481C27.5781 13.2037 28.1017 12.4387 28.4589 11.5967C28.8161 10.7547 29 9.85216 29 8.94072C29 8.02928 28.8161 7.12677 28.4589 6.28475C28.1017 5.44273 27.5781 4.6777 26.918 4.03337V4.03337Z"
                    stroke="#6A4029"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="col-1">
                <span className="fw-bold">800+</span>
                <br />
                <span>Costumers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Company */}
      <section className="container-fluid position-relative my-sm-5 mt-1 teamWork">
        <div className="row  d-flex align-items-lg-center justify-content-lg-center">
          <div className="d-lg-block d-none col-lg-4 team position-relative">
            <img
              src={`${API_URL}helpers/team.jpeg`}
              alt="Team Work"
            />
          </div>
          <div className="col-lg-4 col-sm-12 teamInfo">
            <h2>We Provide Good Coffee and Healthy Meals</h2>
            <p>
              You can explore the menu that we provide with fun and have their
              own taste and make your day better.
            </p>
            <div className="row">
              <div className="row">
                <div className="col-1 check">
                  <img src={Check} alt="check" />
                </div>
                <p className="col-6 ">High quality beans</p>
              </div>
              <div className="row my-lg-1">
                <div className="col-1 check">
                  <img src={Check} alt="check" />
                </div>
                <p className="col-11">
                  Healthy meals, you can request the ingredients
                </p>
              </div>
              <div className="row my-lg-1">
                <div className="col-1 check">
                  <img src={Check} alt="check" />
                </div>
                <p className="col-11">
                  Chat with our staff to get better experience fo ordering
                </p>
              </div>
              <div className="row my-lg-1">
                <div className="col-1 check">
                  <img src={Check} alt="check" />
                </div>
                <p className="col-11">
                  Free member card with a minimum purchase of IDR 200.000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Item Favorite */}
      <section className="container-fluid fav">
        <div className="row text-center pb-lg-5 pt-5">
          <h1>Here is People’s Favorite</h1>
          <p>
            Let’s choose and have a bit taste of poeple’s favorite. It might be
            yours too!
          </p>
        </div>
        <div className="d-flex pt-4 ps-3 mt-lg-5 ms-lg-0 ms-2 mt-5 justify-content-lg-evenly favorite">
          {favorite.map((e, i) => (
            <div
            key={i}
            id={e.id}
            className="col-lg-2 col-md-6 mt-lg-0 mb-lg-0 mt-5 mb-5 me-md-5 me-5 cardFav"
          >
            <div
              className="card position-relative"
              style={{ width: "20rem", height: "32rem" }}
            >
              <img
                src={`${API_URL}helpers/${e.image}`}
                className="rounded-pill position-absolute imgCard"
                style={{ width: "50%", height: "32%" }}
                alt="Product 1"
              />
              <div className="card-body">
                <h5 className="card-title text-center mt-5 mb-4 title">
                  {e.name}
                </h5>
                <div className="row align-items-center justify-content-center ms-lg-5 ms-md-5 ms-3 pb-2">
                  <div className="card-text">
                    {e.description.map((e) => (
                      <p>
                        <img src={CheckList} alt="checklist" />
                        <span>{e}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0 text-center mb-2">
                <h5 className="text-center ">IDR {e.price}</h5>
                <button to="#" className="btn btn-none order rounded-pill">
                  Order Now
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      </section>

      {/* Visit store */}
      <section className=" container-fluid pt-5 d-lg-block d-md-block d-none visit">
        <div className="row flex-column text-center align-items-center head">
          <div className="col-lg-3 col-md-7 fw-bold mt-lg-5">
            <h1>Visit Our Store in the Spot on the Map Below</h1>
          </div>
          <div className="col-lg-3 col-md-6 mt-lg-4">
            <p>
              See our store in every city on the spot and spen your good day
              there. See you soon!
            </p>
          </div>
        </div>
        <div className=" row map mt-4">
          <img src={MapVisit} alt="Map Visit" />
        </div>
      </section>

      {/* Partner */}
      <section className="container-fluid pt-5 d-lg-block d-none partner">
        <div className="row text-center head">
          <h1>Our Partner</h1>
        </div>
        <div className="row row-cols-md-3 pb-5 justify-content-center align-items-center ">
          {partner.map((e, i) => (
            <div key={i} id={e.id} className="col-lg-2">
              <img src={`${API_URL}helpers/${e.image}`} alt={e.name} className="img-fluid" />
            </div>
          ))}
        </div>
      </section>

      {/* Testi */}
      <section className="container-fluid testi">
        <div className="text-center pb-lg-5 pt-5">
          <h1>Loved by Thousands of Happy Customer</h1>
          <p>
            These are the stories of our customers who have visited us with
            great pleasure.
          </p>
        </div>
        <div className="row flex-row flex-nowrap justify-content-lg-center cardGroup">
          {ratting.map((e, i) => (
            <div key={i} className="col-lg-3 me-lg-5 testimoni me-5 ms-2">
              <div className="card cardTesti">
                <div className="card-body">
                  <div
                    key={e.id}
                    className="row d-flex justify-content-lg-evenly align-content-center"
                  >
                    <img
                      src={`${API_URL}helpers/${e.image}`}
                      style={{ width: "80px", height: "55px" }}
                      className="card-img-top rounded-circle col-2"
                      alt="pict"
                    />
                    <div className="col-5 ">
                      <h6 className="card-title">
                        <b>{e.name}</b>
                      </h6>
                      <small>{e.address}</small>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-item-center">
                      <p>{e.ratting}</p>
                      <span style={{ paddingLeft: "5px", marginTop: "-2px" }}>
                        <img src={Star} alt="star" />
                      </span>
                    </div>
                  </div>
                  <p className="card-text">{e.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 justify-content-center foot">
          <div className=" group">
            <div className=" union">
              <svg
                width="45"
                height="16"
                viewBox="0 0 45 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.55721 15.4998C7.53816 15.4999 7.51909 15.5 7.5 15.5C7.48091 15.5 7.46184 15.4999 7.44279 15.4998H6.9469V15.4799C3.06303 15.1968 0 11.9561 0 8C0 4.04389 3.06303 0.80319 6.9469 0.520085V0.5H7.5H37.0841V0.511337C37.2218 0.503812 37.3604 0.5 37.5 0.5C41.6421 0.5 45 3.85786 45 8C45 12.1421 41.6421 15.5 37.5 15.5C37.3604 15.5 37.2218 15.4962 37.0841 15.4887V15.4998H7.55721Z"
                  fill="#6A4029"
                />
              </svg>
            </div>
            <div className="circle">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="8" r="7.5" fill="#DDE0E4" />
              </svg>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="8" r="7.5" fill="#DDE0E4" />
              </svg>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="8" r="7.5" fill="#DDE0E4" />
              </svg>
            </div>
          </div>

          <div className=" vector">
            <div className="left">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.75 7.74998H3.925L8.4625 2.29998C8.67467 2.04471 8.77675 1.71561 8.74628 1.38507C8.7158 1.05454 8.55527 0.749652 8.3 0.537478C8.04473 0.325305 7.71563 0.223228 7.3851 0.253702C7.05456 0.284177 6.74967 0.444708 6.5375 0.699979L0.2875 8.19998C0.245451 8.25963 0.207849 8.3223 0.175 8.38748C0.175 8.44998 0.175 8.48748 0.0875002 8.54998C0.0308421 8.6933 0.0011764 8.84587 0 8.99998C0.0011764 9.15409 0.0308421 9.30665 0.0875002 9.44998C0.0875002 9.51248 0.0874998 9.54998 0.175 9.61248C0.207849 9.67765 0.245451 9.74032 0.2875 9.79998L6.5375 17.3C6.65503 17.4411 6.8022 17.5546 6.96856 17.6323C7.13491 17.7101 7.31636 17.7503 7.5 17.75C7.79207 17.7505 8.07511 17.6488 8.3 17.4625C8.42657 17.3575 8.5312 17.2287 8.60789 17.0832C8.68458 16.9378 8.73183 16.7787 8.74692 16.6149C8.76202 16.4512 8.74466 16.2861 8.69586 16.1291C8.64705 15.9721 8.56775 15.8263 8.4625 15.7L3.925 10.25H18.75C19.0815 10.25 19.3995 10.1183 19.6339 9.88386C19.8683 9.64944 20 9.3315 20 8.99998C20 8.66846 19.8683 8.35052 19.6339 8.1161C19.3995 7.88167 19.0815 7.74998 18.75 7.74998Z"
                  fill="#6A4029"
                />
              </svg>
            </div>

            <div className="right">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 7.74998H16.075L11.5375 2.29998C11.3253 2.04471 11.2232 1.71561 11.2537 1.38507C11.2842 1.05454 11.4447 0.749652 11.7 0.537478C11.9553 0.325305 12.2844 0.223228 12.6149 0.253702C12.9454 0.284177 13.2503 0.444708 13.4625 0.699979L19.7125 8.19998C19.7545 8.25963 19.7922 8.3223 19.825 8.38748C19.825 8.44998 19.825 8.48748 19.9125 8.54998C19.9692 8.6933 19.9988 8.84587 20 8.99998C19.9988 9.15409 19.9692 9.30665 19.9125 9.44998C19.9125 9.51248 19.9125 9.54998 19.825 9.61248C19.7922 9.67765 19.7545 9.74032 19.7125 9.79998L13.4625 17.3C13.345 17.4411 13.1978 17.5546 13.0314 17.6323C12.8651 17.7101 12.6836 17.7503 12.5 17.75C12.2079 17.7505 11.9249 17.6488 11.7 17.4625C11.5734 17.3575 11.4688 17.2287 11.3921 17.0832C11.3154 16.9378 11.2682 16.7787 11.2531 16.6149C11.238 16.4512 11.2553 16.2861 11.3041 16.1291C11.3529 15.9721 11.4322 15.8263 11.5375 15.7L16.075 10.25H1.25C0.91848 10.25 0.600536 10.1183 0.366116 9.88386C0.131695 9.64944 0 9.3315 0 8.99998C0 8.66846 0.131695 8.35052 0.366116 8.1161C0.600536 7.88167 0.91848 7.74998 1.25 7.74998Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* promo */}
      <section className="d-lg-block d-none position-absolute promoHome">
        <div className="info">
          <h2>Check our promo today!</h2>
          <p>Let's see the deals and pick yours!</p>
        </div>
        <div className="btn">
          <button type="submit">See Promo</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footHome">
        <FooterComp />
      </footer>
    </div>
  );
};

export default Home;

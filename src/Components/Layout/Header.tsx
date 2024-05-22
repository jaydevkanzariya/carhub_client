import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (


    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-black border-bottom box-shadow mb-3">
      <div className="container-fluid">
        <a
          className="navbar-brand text-light "
          asp-area="Customer"
          asp-controller="Home"
          asp-action="Index"
        >
          <img
            src="/images/home/carlogo1.png"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          Car Hub
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-light" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Car Content
              </a>

              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    
                  onClick={() => navigate("car/carList")}
                  >
                    Car
                  </a>
                </li>

                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => navigate("cartype/cartypeList")}
                >
                  CarType
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => navigate("mileage/mileagelist")}
                >
                  Mileage
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark text-light"
                    asp-area="Admin"
                    asp-controller="Brand"
                    asp-action="Index"
                  >
                    Brand
                  </a>
                </li>
                
                <li className="nav-item">
                  <a
                    className="nav-link text-dark text-light"
                    onClick={() => navigate("variant/variantlist")}
                  >
                    Variant
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark text-light"
                    onClick={() => navigate("feature/featurelist")}
                  >
                    Feature
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link text-dark text-light"
                    onClick={() => navigate("color/colorList")}
                  >
                    Color
                  </a>
                </li>
                
                
                <li className="nav-item">
                  <a
                    className="nav-link text-dark text-light"
                    onClick={() => navigate("featuretype/featuretypelist")}
                  >
                    FeatureType
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link text-dark text-light"
                    onClick={() => navigate("dealer/dealerlist")}
                    >
                    Dealer
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle text-light "
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Location
              </a>
              <ul className="dropdown-menu">
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => navigate("country/countryList")}
                >
                  Country
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => navigate("order/myorders")}
                >
                  State
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => navigate("order/allOrders")}
                >
                  City
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link  text-light"
                asp-area="Admin"
                asp-controller="ApplicationRole"
                asp-action="IndexApplicationRole"
              >
                Role
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link  text-light"
                asp-area="Admin"
                asp-controller="ApplicationUser"
                asp-action="IndexApplicationUser"
              >
                User
              </a>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}

export default Header;

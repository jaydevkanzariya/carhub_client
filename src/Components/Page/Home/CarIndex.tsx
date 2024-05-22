import React from "react";
import { apiResponse, carModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  car: carModel;
}

function CarIndex(props: Props) {
  const navigate = useNavigate();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );


 

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/details/${props.car.id}`}>
              <img
                src={props.car.imageURL}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>
     

         

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`/details/${props.car.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {props.car.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.car.brand?.brandName}
            </p>
          </div>
          <p
            className="card-text"
            style={{
              textAlign: "center",
              fontWeight: "light",
              fontSize: "14px",
            }}
          >
            {props.car.details.substring(0,10)}
          </p>
          <div className="row text-center">
            <h4>{props.car.startingPrice}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarIndex;

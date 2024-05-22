 import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { inputHelper, toastNotify } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
  useGetCarByIdQuery,
} from "../Apis/carApi";
import {
  useDeleteMileageMutation,
  useGetMileagesQuery,
  useGetMileageByCarIdQuery,
} from "../Apis/mileageApi";
import {
  useGetReviewsQuery,
  useLikeCountMutation,
  useGetReviewByCarIdQuery,
  useDisLikeCountMutation,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "../Apis/reviewApi";
import {
  useGetCarSpecificationsQuery,
  useCreateCarSpecificationMutation,
  useGetCarSpecificationByIdQuery,
  useUpdateCarSpecificationMutation,
} from "../Apis/carSpecificationApi";
import { useGetReviewXCommentsQuery } from "../Apis/reviewXCommentApi";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { MainLoader } from "../Components/Page/Common";
import {
  carModel,
  mileageModel,
  carSpecificationModel,
  ReviewModel,
  reviewXCommentModel,
} from "../Interfaces";
import { json } from "stream/consumers";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: carData } = useGetCarByIdQuery(id);
  const { data: carMileage } = useGetMileageByCarIdQuery(id);
  const { data: carspecification } = useGetCarSpecificationByIdQuery(id);
  const { data: reviewXComments } = useGetReviewXCommentsQuery(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [Likecount] = useLikeCountMutation();
  const [DisLikecount] = useDisLikeCountMutation();
  const [updateReview] = useUpdateReviewMutation();
  const { data: Reviews } = useGetReviewByCarIdQuery(id);

  function toggleDescription() {
    setShowFullDescription((prev) => !prev);
  }
  const handleLike = async (reviewId: number) => {
    try {
      
      let response;
      response = await Likecount(reviewId);
      toastNotify("like successfully", "success");
      if (response) {
        navigate(`/details/${id}`);
      }

      // Fetch updated reviews after likreing
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };
  const handleDisLike = async (reviewId: number) => {
    try {
      let response;
      response = await DisLikecount(reviewId);
      toastNotify("DISlike successfully", "success");
      if (response) {
        navigate(`/details/${id}`);
      }

      // Fetch updated reviews after likreing
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };
  console.log(JSON.stringify(reviewXComments));
  return (
    <>
      <div className="card shadow border-0 mt-4 mb-4">
        <div className="card-header bg-secondary bg-gradient text-light py-4">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="text-white text-uppercase">
                {carData?.result.name}
              </h3>
            </div>
          </div>
        </div>
        <div className="card-body  px-3">
          <div className="py-3">
            <div className="row">
              <div className="col-12 col-lg-4 text-center mb-3"></div>
              <div className="col-12 col-lg-6  offset-lg-1">
                <div className="col-12 col-md-6 pb-4">
                  <span className="badge">{carData?.result.name}</span>
                </div>
                <div className="">
                  <span className="text-dark text-opacity-50">
                    Brand Name :-
                  </span>
                  <span className="text-dark">
                    {carData?.result.brand.brandName}
                  </span>
                </div>
                <div className="">
                  <span className="text-dark text-opacity-50">
                    ManufacturingYear :-
                  </span>
                  <span className="text-dark">
                    {carData?.result.manufacturingYear}
                  </span>
                </div>

                <div className="pb-2">
                  <span className="text-dark text-opacity-50 fw-bold">
                    Details :-
                  </span>
                  <span className="" id="ReadMore">
                    {showFullDescription
                      ? carData?.result.details
                      : carData?.result.details.substring(0, 10)}
                  </span>
                  <span className="" id="ReadLess">
                    {carData?.result.details}
                  </span>
                  <span id="dots">...</span>{" "}
                  <a className="" onClick={toggleDescription} id="myBtn">
                    {showFullDescription ? "Read less" : "Read more"}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" text-dark text-uppercase">
              <h4>{carData?.result.name} Car Specification</h4>
            </div>
          </div>
          <div className=" text-body">
            <div className="d-flex ">
              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-speedometer2"></i>
                  Mileage
                </a>
                <div className="">{carMileage?.result.average}</div>
              </div>
              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-fuel-pump-fill"></i>
                  Fuel Type
                </a>
                <div className="">{carMileage?.result.fuelType}</div>
              </div>
              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-pin-map"></i>
                  Transmission
                </a>
                <div className="">{carMileage?.result.transmission}</div>
              </div>

              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-browser-safari"></i>
                  Engine
                </a>
                <div className="">{carspecification?.result.displacement}</div>
              </div>
              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-lightning-charge"></i>
                  Max power
                </a>
                <div className="">{carspecification?.result.maxPower}</div>
              </div>
              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-chevron-down"></i>
                  Seating Capacity
                </a>
                <div className="">
                  {carspecification?.result.seatingCapacity}
                </div>
              </div>
              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-geo-fill"></i>
                  Gear
                </a>
                <div className="">{carspecification?.result.gearBox}</div>
              </div>
              <div className="ps-2 ms-5">
                <a>
                  <i className="bi bi-balloon"></i>
                  AirBag
                </a>
                <div className="">{carspecification?.result.airbagNo}</div>
              </div>
            </div>
          </div>
          <Link to={`/specificationIndex/${id}`}>
            All Features or Specification
          </Link>
          <Link
            style={{
              display: "block",
              textDecoration: "underline",
              color: "inherit",
            }}
            to={`/review/${id}`}
          >
            Add Review
          </Link>
          <div className="row my-1">
            {Reviews?.result.map((item: ReviewModel) => (
              <div key={item.id} className="row mb-1">
                <div className="pl-1 text-start">
                  <span className="fw-bold text-uppercase">Title:-</span>
                  {item.title}
                </div>
                <div className="pl-1 text-start">
                  <span className="fw-bold text-uppercase">Description:-</span>
                  {item.descriptaion}
                </div>

                <div className="d-flex justify-content-evenly m-2">
               
                  <div className="ratingContainer">
                    
                    {[...Array(parseInt(item.overallRating))].map(
                      (_, index) => (
                        <i key={index} className="ratingStar fas fa-star"></i>
                      )
                    )}
                    {[...Array(5 - parseInt(item.overallRating))].map(
                      (_, index) => (
                        <i key={index} className="ratingStar far fa-star"></i>
                      )
                    )}
                       
                  </div>
                 
                 

                  <div className="border border-1 border-dark rounded-pill p-1">
                    <a
                      onClick={() => handleLike(item.id)}
                      // Add appropriate props or state for React routing
                    >
                      <i className="bi bi-hand-thumbs-up Like"></i>
                      <span>{item.likeCount}</span>
                    </a>
                  </div>

                  <div className="border border-1 border-dark rounded-pill p-1">
                    <a
                      onClick={() => handleDisLike(item.id)}
                      // Add appropriate props or state for React routing
                    >
                      <i className="bi bi-hand-thumbs-down DisLike"></i>
                      <span>{item.disLikeCount}</span>
                    </a>
                  </div>

                  <Link to={`/reviewXComment/${item.id}`}>Add Comment</Link>
                </div>
                
                <div className="row">
                  {reviewXComments?.result.map(
                   
                    (item1: reviewXCommentModel ) =>
                    item1.reviewId ===  item.id && (
                      // alert(item1.reviewId ==  item.id),
                      // alert(JSON.stringify(reviewXComments?.result)),
                        <div key={item1.id} className="row px-4">
                          {/* <div>
                              UserName: {item1.ApplicationUser.UserName}
                            </div> */}
                          <div>Comment: {item1.comment}</div>
                        </div>
                      )
                  )}
                  
                </div>
              </div>
            ))}
             
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;

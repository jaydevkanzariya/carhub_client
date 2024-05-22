import React, { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "../Apis/reviewApi";
import { useGetCarByIdQuery } from "../Apis/carApi";

import { inputHelper, toastNotify } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

const reviewData: {
  carId?: number;
  overallRating: string;
  descriptaion: string;
  title: string;
  likeCount: number;
  disLikeCount: number;
  viewCount: number;
} = {
  carId: undefined,
  overallRating: "",
  descriptaion: "",
  title: "",
  likeCount: 0,
  disLikeCount: 0,
  viewCount: 0,
};

function ReviewUpsert() {
  
  const { id } = useParams();
  const { data: carData } = useGetCarByIdQuery(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(reviewData);

  const [createReview] = useCreateReviewMutation();

  const handleStarHover = (value: number) => {
    setRating(value);
  };

  const handleStarClick = (value: number) => {
    setRating(value);
    setReview({
      ...review,
      overallRating: value.toString(),
    });

    // Additional logic if needed
  };

  
  const handleReviewInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, review);
    setReview(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("descriptaion", review.descriptaion);
    formData.append("title", review.title);
    formData.append("overallRating", review.overallRating);
    formData.append("likeCount", review.likeCount.toString());
    formData.append("disLikeCount", review.disLikeCount.toString());
    formData.append("viewCount", review.viewCount.toString());
    formData.append("carId", id?.toString() || "");

    let response;

    debugger;
    //create
    response = await createReview(formData);
    toastNotify("Review created successfully", "success");

    if (response) {
      setLoading(false);
      navigate(`/details/${id}`);
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <form onSubmit={handleSubmit}>
        <div className="container border p-3">
          <h4 className="text-primary">Add Review Of {carData?.result.name}</h4>
          <hr />

          <div className="row">
            {/* ... other form elements ... */}

            <div className="col-12 pb-3">
              <div className="form-group float-md-end">
                {/* Star ratings */}
                {[1, 2, 3, 4, 5].map((value) => (
                  <i
                    key={value}
                    className={`ratingStar far fa-star ${
                      value <= rating ? "fas" : "far"
                    }`}
                    data-value={value}
                    onMouseOver={() => handleStarHover(value)}
                    onClick={() => handleStarClick(value)}
                  ></i>
                ))}
                <input
                  type="text"
                  hidden
                  required
                  name="overallRating"
                  value={review.overallRating}
                />
              </div>
            </div>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter title"
              required
              name="title"
              value={review.title}
              onChange={handleReviewInput}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter descriptaion"
              required
              name="descriptaion"
              value={review.descriptaion}
              onChange={handleReviewInput}
            />

            <div className="col-5 mt-2">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary form-control w-75"
              />
            </div>
            <div className="col-5 mt-2">
              <button className="btn-primary btn w-75" onClick={() => navigate(`/details/${id}`)}>Close</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewUpsert;

import React, { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
 
} from "../Apis/reviewApi";
import {
    useGetReviewXCommentsQuery,
  useGetReviewXCommentByIdQuery,
  useCreateReviewXCommentMutation,
  useUpdateReviewXCommentMutation,
  useDeleteReviewXCommentMutation,
  } from "../Apis/reviewXCommentApi";

import { useGetCarByIdQuery } from "../Apis/carApi";

import { inputHelper, toastNotify } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

const reviewXCommentData: {
    reviewId?: number;
    comment: string;
} = {
    reviewId: undefined,
    comment: "",
};

function ReviewUpsert() {
  
  const { id } = useParams();
  const { data: reviewData } = useGetReviewByIdQuery(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewXComment, setReviewXComment] = useState(reviewXCommentData);

  const [createReviewXComment] = useCreateReviewXCommentMutation();

  
  
  const handleReviewInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e,reviewXComment);
    setReviewXComment(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    
    formData.append("comment",reviewXComment.comment );
    formData.append("reviewId", id?.toString() || "");

    let response;

    debugger;
    //create
    response = await createReviewXComment(formData);
    toastNotify("ReviewxComment created successfully", "success");

    if (response) {
      setLoading(false);
      navigate(`/details/${reviewData.result.carId}`);
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <form onSubmit={handleSubmit}>
        <div className="container border p-3">
          <h4 className="text-primary">Add comment Of {reviewData?.result.title}</h4>
          <hr />

          <div className="row">
            {/* ... other form elements ... */}

            
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter comment"
              required
              name="comment"
              value={reviewXComment.comment}
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
              <button className="btn-primary btn w-75" onClick={() => navigate(`/details/${reviewData.result.carId}`)}>Close</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewUpsert;

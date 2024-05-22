import reviewModel from "./ReviewModel"
export default interface reviewXCommentModel {
  id: number;
  reviewId: number;
  review: reviewModel;
  comment: string;
  
  }
  
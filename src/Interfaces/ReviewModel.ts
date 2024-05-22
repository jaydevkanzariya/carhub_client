
import carModel from "./carModel"
export default interface ReviewModel {
  id: number;
  carId: number;
  car: carModel;
  overallRating: string;
  descriptaion: string;
  title: string;
  likeCount: number;
  disLikeCount: number;
  viewCount: number;
  }
  
import carModel from "./carModel"
export default interface mileageModel {
    id: number;
  carId: number;
  car: carModel;
  fuelType: string;
  transmission: string;
  average: number;
}
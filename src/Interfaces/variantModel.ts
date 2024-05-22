import carModel from "./carModel"
export default interface variantModel {
  id: number
  carId: number
  car: carModel 
  variantName: string
  transmission: string
  price: number
}
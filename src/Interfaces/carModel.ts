import  brandModel from "./brandModel"
import  carTypeModel from "./carTypeModel"
export default interface carModel {
  id: number
  name: string
  details: string
  brandId: number
  brand: brandModel
  carTypeId: number
  carType: carTypeModel
  startingPrice: number
  endPrice: number
  manufacturingYear: number
  isActive: boolean
  imageURL: string
  }
  
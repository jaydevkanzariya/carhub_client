
import  carModel from "./carModel"
export default interface carSpecificationModel {
  id: number
  carId: number
  car: carModel 
  displacement: string
  maxPower: string
  maxTorque: string
  cylinder: number
  frontSuspension: string
  rearSuspension: string
  shockAbsorbers: string
  airbagNo: string
  length: number
  width: number
  height: number
  bootSpace: number
  seatingCapacity: number
  wheelBase: number
  gearBox: number
  driveType: string
  }
  
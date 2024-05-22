import featureTypeModel from "./featureTypeModel";
import carModel from "./carModel";
import featureModel from "./featureModel";


export default interface carXFeatureModel {
  id: number
  carId: number
  car: carModel
  featureTypeId: number
  featureType: featureTypeModel
  featureId: number
  feature: featureModel
  }

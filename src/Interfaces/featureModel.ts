import featureTypeModel from "./featureTypeModel";

export default interface featureModel {
  id: number;
  name: string;
  featureTypeId?: number;
  featureType: featureTypeModel;
  }

import  brandModel from "./brandModel"
export default  interface dealerModel {
  id: number;
  dealerName: string;
  mobileNumber: string;
  email: string;
  dealerLocation: string;
  brandId: number;
  brand: brandModel;
  isAvailable: boolean;
  }
  
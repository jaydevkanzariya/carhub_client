import carModel from "./carModel"
import colorModel from "./colorModel"
export default interface carXColorModel {
  id: number;
  carId: number;
  car: carModel;
  colorId: number;
  color: colorModel;
}
  
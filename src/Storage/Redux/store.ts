import { configureStore } from "@reduxjs/toolkit";
import { countryReducer } from "./countrySlice";
import { cartypeReducer } from "./cartypeSlice";
import { featuretypeReducer } from "./featuretypeSlice";
import { colorReducer } from "./colorSlice";
import { mileageReducer } from "./mileageSlice";
import { carReducer } from "./carSlice";
import { variantReducer } from "./variantSlice";
import { brandReducer } from "./brandSlice";
import { dealerReducer } from "./dealerSlice";
import { carXColorReducer } from "./carXColorSlice";
import { carSpecificationReducer } from "./carSpecificationSlice";
import { featureReducer } from "./featureSlice";
import { carXFeatureReducer } from "./carXFeatureSlice";
import { reviewReducer } from "./reviewSlice";
import { reviewXCommentReducer } from "./reviewXCommentSlice";

import {
  countryApi,
  cartypeApi,
  colorApi,
  mileageApi,
  carApi,
  featuretypeApi,
  variantApi,
  brandApi,
  dealerApi,
  carXColorApi,
  carSpecificationApi,
  featureApi,
  carXFeatureApi,
  reviewApi,
  reviewXCommentApi,
} from "../../Apis";

const store = configureStore({
  reducer: {
    countryStore: countryReducer,
    cartypeStore: cartypeReducer,
    colorStore: colorReducer,
    mileageStore: mileageReducer,
    carStore: carReducer,
    featuretypeStore: featuretypeReducer,
    variantStore: variantReducer,
    brandStore: brandReducer,
    dealertStore: dealerReducer,
    carXColorStore: carXColorReducer,
    carSpecificationStore: carSpecificationReducer,
    featureStore: featureReducer,
    reviewStore: reviewReducer,
    carXFeatureStore: carXFeatureReducer,
    reviewXCommentStore: reviewXCommentReducer,


    [countryApi.reducerPath]: countryApi.reducer,
    [cartypeApi.reducerPath]: cartypeApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,
    [mileageApi.reducerPath]: mileageApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [featuretypeApi.reducerPath]: featuretypeApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [dealerApi.reducerPath]: dealerApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [carXColorApi.reducerPath]:carXColorApi.reducer,
    [carSpecificationApi.reducerPath]:carSpecificationApi.reducer,
    [featureApi.reducerPath]: featureApi.reducer,
    [carXFeatureApi.reducerPath]: carXFeatureApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [reviewXCommentApi.reducerPath]: reviewXCommentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countryApi.middleware)
      .concat(cartypeApi.middleware)
      .concat(colorApi.middleware)
      .concat(mileageApi.middleware)
      .concat(carApi.middleware)
      .concat(featuretypeApi.middleware)
      .concat(variantApi.middleware)
      .concat(brandApi.middleware)
      .concat(dealerApi.middleware)
      .concat(carXColorApi.middleware)
      .concat(carSpecificationApi.middleware)
      .concat(featureApi.middleware)
      .concat(carXFeatureApi.middleware)
      .concat(reviewApi.middleware)
      .concat(reviewXCommentApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;

export default store;

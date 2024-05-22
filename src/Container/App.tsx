import React, { useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  CountryList, CountryUpsert, CarTypeList, CarTypeUpsert,ColorUpsert,ColorList,MileageList,MileageUpsert,FeatureTypeList,FeatureTypeUpsert,
  VariantUpsert,VariantList,DealerUpsert,DealerList,CarXColorUpsert,CarXColorList,CarList,CarUpsert,CarSpecificationList,CarSpecificationUpsert,FeatureList,FeatureUpsert,
  CarXFeatureList,CarXFeatureUpsert,Home,Details,SpecificationIndex,Review,ReviewXComment
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { RootState } from "../Storage/Redux/store";

function App() {
  
 

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/countrylist" element={<CountryList />} />
          <Route  path="/country/countryUpsert/:id" element={<CountryUpsert />} />
          <Route path="/country/countryUpsert" element={<CountryUpsert />} />
          <Route path="/cartype/cartypelist" element={<CarTypeList />} />
          <Route  path="/cartype/cartypeUpsert/:id" element={<CarTypeUpsert />} />
          <Route path="/cartype/cartypeUpsert" element={<CarTypeUpsert />} />
          <Route path="/color/colorlist" element={<ColorList />} />
          <Route  path="/color/colorUpsert/:id" element={<ColorUpsert />} />
          <Route path="/color/colorUpsert" element={<ColorUpsert />} />
          <Route path="/mileage/mileagelist" element={<MileageList />} />
          <Route  path="/mileage/mileageUpsert/:id" element={<MileageUpsert />} />
          <Route path="/mileage/mileageUpsert" element={<MileageUpsert />} />
          <Route path="/featuretype/featuretypelist" element={<FeatureTypeList />} />
          <Route  path="/featuretype/featuretypeUpsert/:id" element={<FeatureTypeUpsert />} />
          <Route path="/featuretype/featuretypeUpsert" element={<FeatureTypeUpsert />} />
          <Route path="/variant/variantlist" element={<VariantList />} />
          <Route  path="/variant/variantUpsert/:id" element={<VariantUpsert />} />
          <Route path="/variant/variantUpsert" element={<VariantUpsert />} />
          <Route path="/dealer/dealerlist" element={<DealerList />} />
          <Route  path="/dealer/dealerUpsert/:id" element={<DealerUpsert />} />
          <Route path="/dealer/dealerUpsert" element={<DealerUpsert />} />
          <Route path="/car/carlist" element={<CarList />} />
          <Route  path="/car/carUpsert/:id" element={<CarUpsert />} />
          <Route path="/car/carUpsert" element={<CarUpsert />} />
          <Route path="/carXColor/carXColorlist" element={<CarXColorList />} />
          <Route  path="/carxColor/carXColorUpsert/:carId" element={<CarXColorUpsert />} />
          <Route path="/carXColor/carXColorUpsert" element={<CarXColorUpsert />} />
          <Route path="/carSpecification/carSpecificationlist" element={<CarSpecificationList />} />
          <Route  path="/carSpecification/carSpecificationUpsert/:id" element={<CarSpecificationUpsert />} />
          <Route path="/carSpecification/carSpecificationUpsert" element={<CarSpecificationUpsert />} />
          <Route path="/feature/featurelist" element={<FeatureList />} />
          <Route  path="/feature/featureUpsert/:id" element={<FeatureUpsert />} />
          <Route path="/feature/featureUpsert" element={<FeatureUpsert />} />
          <Route path="/carXFeature/carXFeaturelist" element={<CarXFeatureList />} />
          <Route  path="/carXFeature/carXFeatureUpsert/:carId" element={<CarXFeatureUpsert />} />
          <Route path="/carXFeature/carXFeatureUpsert" element={<CarXFeatureUpsert />} />
          <Route  path="/details/:id" element={<Details/>} />
          <Route  path="/specificationIndex/:id" element={<SpecificationIndex/>} />
          <Route  path="/review/:id" element={<Review/>} />
          <Route  path="/reviewXComment/:id" element={<ReviewXComment/>} />
       
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;


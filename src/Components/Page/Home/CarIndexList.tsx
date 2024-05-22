import React from "react";
import { useState, useEffect } from "react";
import { useGetCarsQuery } from "../../../Apis/carApi";
import { carModel } from "../../../Interfaces";
import CarIndex from "./CarIndex";
import { useDispatch, useSelector } from "react-redux";
import { setCar } from "../../../Storage/Redux/carSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";
function CarIndexList() {
  const [cars, setcars] = useState<carModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCarsQuery(null);
 
  const searchValue = useSelector(
    (state: RootState) => state.carStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        searchValue
      );
      setcars(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCar(data.result));
      setcars(data.result);
    
    }
  }, [isLoading]);

 

  const handleFilters = (
    search: string
  ) => {
    let tempArray =
  
     [...data.result]
         data.result.filter(
            (item: carModel) =>
              item.name.toUpperCase() === item.name.toUpperCase()
          );

    //search functionality
    if (search) {
      const tempArray2 = [...tempArray];
      tempArray = tempArray2.filter((item: carModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    //sort
   
   

    return tempArray;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
        
        
        </ul>
      </div>

      {cars.length > 0 &&
        cars.map((car: carModel, index: number) => (
          <CarIndex car={car} key={index} />
        ))}
    </div>
  );
}

export default CarIndexList;

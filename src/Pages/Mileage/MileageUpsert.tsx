import React, { useEffect, useState } from "react";
import {
  useCreateMileageMutation,
  useGetMileageByIdQuery,
  useUpdateMileageMutation,
} from "../../Apis/mileageApi";
import { useGetCarsQuery } from "../../Apis/carApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const mileageData: { 
  carId?: number,
  fuelType: string,
  transmission: string,
  average: number 
} = {
  fuelType: "",
  transmission:"",
  carId: undefined,
  average:0
  // isActive: false,
};

function MileageUpsert() {
 

  const { id } = useParams();
 debugger  
  const navigate = useNavigate();
  const [mileageInputs, setMileageInputs] = useState(mileageData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createMileage] = useCreateMileageMutation();
  const [updateMileage] = useUpdateMileageMutation();
  const { data } = useGetMileageByIdQuery(id);
  const { data: carsData } = useGetCarsQuery(null);

  // useEffect(() => {
  //   if (data && data.result) {
  //     const tempData = {
  //       stateName: data.result.stateName,
  //       countryId: data.result.countryId,
  //       isActive: data.result.isActive,
  //     };
  //     setStateInputs(tempData);
  //     setIsChecked(tempData.isActive);
  //   }
  // }, [data]);

  useEffect(() => {
    if (id) {
      
      // Fetch state data by ID
     // const { data } = useGetStateByIdQuery(id);
      if (data && data.result) {
        const tempData = {
          fuelType: data.result.fuelType,
          transmission: data.result.transmission,
          average: data.result.average,
          carId: data.result.carId,

        };
        setMileageInputs(tempData);
        // setIsChecked(tempData.isActive);
      }
    }
  }, [id]);

  const handleOnChange = () => {
    // setIsChecked(!isChecked);
    // Update StateInputs with the new value of isActive
    setMileageInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleMileageInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, mileageInputs);
    setMileageInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("fuelType", mileageInputs.fuelType);
    formData.append("average", mileageInputs.average.toString());
    formData.append("transmission", mileageInputs.transmission);
   formData.append("carId", mileageInputs.carId?.toString() || "");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateMileage({ data: formData, id });
      toastNotify("Mileage updated successfully", "success");
    } else {
      //create
      response = await createMileage(formData);
      toastNotify("Mileage created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/mileage/mileagelist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit Mileage" : "Add Mileage"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter fuelType"
              required
              name="fuelType"
              value={mileageInputs.fuelType}
              onChange={handleMileageInput}
            />

           <label>Select Car</label>
            <select
              className="form-control"
              name="carId"
              value={mileageInputs.carId}
              onChange={(e) =>
                setMileageInputs((prevData) => ({
                  ...prevData,
                  carId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select Car</option>
              {carsData?.result.map((car:any) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter transmission"
              required
              name="transmission"
              value={mileageInputs.transmission}
              onChange={handleMileageInput}
            />
            
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter average"
              required
              name="average"
              value={mileageInputs.average}
              onChange={handleMileageInput}
            />



            
          
            

            
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/mileage/mileagelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Mileage
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MileageUpsert;

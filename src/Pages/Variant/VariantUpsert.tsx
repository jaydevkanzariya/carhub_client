import React, { useEffect, useState } from "react";
import {
  useCreateVariantMutation,
  useGetVariantByIdQuery,
  useUpdateVariantMutation,
} from "../../Apis/variantApi";
import { useGetCarsQuery } from "../../Apis/carApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const variantData: { variantName: string; carId?: number;
  transmission: string
  price: number } = 
  {
  variantName: "",
  carId: undefined,
  transmission:"",
  price:0,
 
  // isActive: false,
};

function VariantUpsert() {
  debugger
  
  const { id } = useParams();

  const navigate = useNavigate();
  const [variantInputs, setVariantInputs] = useState(variantData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createVariant] = useCreateVariantMutation();
  const [updateVariant] = useUpdateVariantMutation();
  const { data } = useGetVariantByIdQuery(id);
  const { data: carsData } = useGetCarsQuery(null);

  // useEffect(() => {
  //   if (data && data.result) {
  //     const tempData = {
  //       variantName: data.result.variantName,
  //       carId: data.result.carId,
  //       isActive: data.result.isActive,
  //     };
  //     setVariantInputs(tempData);
  //     setIsChecked(tempData.isActive);
  //   }
  // }, [data]);

  useEffect(() => {
    if (id) {
      
      // Fetch variant data by ID
      // const { data } = useGetVariantByIdQuery(id);
      if (data && data.result) {
        const tempData = {
          variantName: data.result.variantName,
          carId: data.result.carId,
          transmission: data.result.transmission,
          price: data.result.price,



          
        };
        setVariantInputs(tempData);
        
      }
    }
  }, [id]);

  // const handleOnChange = () => {
  //   setIsChecked(!isChecked);
  //   // Update VariantInputs with the new value of isActive
  //   setVariantInputs((prevData) => ({
  //     ...prevData,
  //     isActive: !isChecked,
  //   }));
  // };

  const handleVariantInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, variantInputs);
    setVariantInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("VariantName", variantInputs.variantName);
    formData.append("transmission", variantInputs.transmission);
    formData.append("price", variantInputs.price.toString());
    
    formData.append("CarId", variantInputs.carId?.toString() || "");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateVariant({ data: formData, id });
      toastNotify("Variant updated successfully", "success");
    } else {
      //create
      response = await createVariant(formData);
      toastNotify("Variant created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/variant/variantlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit Variant" : "Add Variant"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
          <label htmlFor="car">Select Car</label>
            <select
              className="form-control"
              name="carId"
              value={variantInputs.carId}
              onChange={(e) =>
                setVariantInputs((prevData) => ({
                  ...prevData,
                  carId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select Car</option>
              {carsData?.result.map((car: any) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>


            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter variantName"
              required
              name="variantName"
              value={variantInputs.variantName}
              onChange={handleVariantInput}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter transmission"
              required
              name="transmission"
              value={variantInputs.transmission}
              onChange={handleVariantInput}
            />
             <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter price"
              required
              name="price"
              value={variantInputs.price}
              onChange={handleVariantInput}
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
                  onClick={() => navigate("/variant/variantlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Variant
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VariantUpsert;

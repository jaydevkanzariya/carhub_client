import React, { useEffect, useState } from "react";
import {
  useCreateCarMutation,
  useGetCarByIdQuery,
  useUpdateCarMutation,
} from "../../Apis/carApi";
import { useGetBrandsQuery } from "../../Apis/brandApi";
import { useGetCarTypesQuery } from "../../Apis/cartypeApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const carData: {
  name: string;
  details?: string;
  brandId?: number;
  carTypeId?: number;
  startingPrice: number;
  endPrice: number;
  manufacturingYear?: number;
  imageURL: string;
} = {
  name: "",
  details: "",
  brandId: undefined,
  carTypeId: undefined,
  startingPrice: 0,
  endPrice: 0,
  manufacturingYear: 0,
  imageURL: "",
  // isActive: false,
};

function CarUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [carInputs, setCarInputs] = useState(carData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const { data } = useGetCarByIdQuery(id);
  const { data: brandsData } = useGetBrandsQuery(null);
  const { data: carTypesData } = useGetCarTypesQuery(null);

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
          name: data.result.name,
          details: data.result.details,
          brandId: data.result.brandId,
          carTypeId: data.result.carTypeId,
          startingPrice: data.result.startingPrice,
          endPrice: data.result.endPrice,
          manufacturingYear: data.result.manufacturingYear,
          imageURL: data.result.imageURL,
          isActive: data.result.isActive,
        };
        setCarInputs(tempData);
        setIsChecked(tempData.isActive);
      }
    }
  }, [id]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setCarInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleCarInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, carInputs);
    setCarInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", carInputs.name);
    formData.append("IsActive", isChecked.toString());
    formData.append("BrandId", carInputs.brandId?.toString() || "");
    formData.append("CarTypeId", carInputs.carTypeId?.toString() || "");
    formData.append("Details", carInputs.details || "");
    formData.append("StartingPrice", carInputs.startingPrice.toString());
    formData.append("EndPrice", carInputs.endPrice.toString());
    formData.append("manufacturingYear", carInputs.manufacturingYear?.toString() || "");
    formData.append("ImageURL", carInputs.imageURL || "");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateCar({ data: formData, id });
      toastNotify("Car updated successfully", "success");
    } else {
      //create
      debugger;
      response = await createCar(formData);
      debugger;
      toastNotify("Car created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/car/carlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit Car" : "Add Car"}</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Car Name"
              required
              name="name"
              value={carInputs.name}
              onChange={handleCarInput}
            />

            <label htmlFor="brand">Select Brand</label>
            <select
              className="form-control"
              name="brandId"
              value={carInputs.brandId}
              onChange={(e) =>
                setCarInputs((prevData) => ({
                  ...prevData,
                  brandId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select Brand</option>
              {brandsData?.result.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
            <label htmlFor="carType">Select CarType</label>
            <select
              className="form-control"
              name="carTypeId"
              value={carInputs.carTypeId}
              onChange={(e) =>
                setCarInputs((prevData) => ({
                  ...prevData,
                  brandId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select CarType</option>
              {carTypesData?.result.map((carType: any) => (
                <option key={carType.id} value={carType.id}>
                  {carType.typeName}
                </option>
              ))}
            </select>

            <textarea
              className="form-control mt-3"
              placeholder="Enter details"
              name="details"
              rows={10}
              value={carInputs.details}
              onChange={handleCarInput}
            ></textarea>

            <label htmlFor="startingPrice">Starting Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Starting Price"
              required
              name="startingPrice"
              value={carInputs.startingPrice}
              onChange={handleCarInput}
            />

            <label htmlFor="endPrice">End Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter End Price"
              required
              name="endPrice"
              value={carInputs.endPrice}
              onChange={handleCarInput}
            />

            <label htmlFor="manufacturingYear">Manufacturing Year</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Manufacturing Year"
              name="manufacturingYear"
              value={carInputs.manufacturingYear}
              onChange={handleCarInput}
            />

            <label htmlFor="imageURL">Image URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              name="imageURL"
              value={carInputs.imageURL}
              onChange={handleCarInput}
            />

            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              // checked={stateInputs.isActive}
              // onChange={handlestateInput}
              checked={isChecked}
              onChange={handleOnChange}
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
                  onClick={() => navigate("/car/carlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Car
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CarUpsert;

import React, { useEffect, useState } from "react";
import {
  useCreateDealerMutation,
  useGetDealerByIdQuery,
  useUpdateDealerMutation,
} from "../../Apis/dealerApi";
import { useGetBrandsQuery } from "../../Apis/brandApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const dealerData: { 
  dealerName: string,
  mobileNumber: string,
  email: string,
  dealerLocation: string,
  brandId?: number,
  } =
   {
  dealerName: "",
  mobileNumber: "",
  email:"",
  dealerLocation:"",
  brandId: undefined
};

function DealerUpsert() {
  
  const { id } = useParams();

  const navigate = useNavigate();
  const [dealerInputs, setDealerInputs] = useState(dealerData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createDealer] = useCreateDealerMutation();
  const [updateDealer] = useUpdateDealerMutation();
  const { data } = useGetDealerByIdQuery(id);
  const { data: brandsData } = useGetBrandsQuery(null);

  

  useEffect(() => {
    if (id) {
      // Fetch dealer data by ID
      // const { data } = useGetDealerByIdQuery(id);
      if (data && data.result) {
        const tempData = {
          dealerName: data.result.dealerName,
          brandId: data.result.brandId,
          dealerLocation: data.result.dealerLocation,
          mobileNumber: data.result.mobileNumber,
          email: data.result.email,
          isAvailable: data.result.isAvailable,
        };
        setDealerInputs(tempData);
        setIsChecked(tempData.isAvailable);
      }
    }
  }, [id]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update DealerInputs with the new value of isActive
    setDealerInputs((prevData) => ({
      ...prevData,
      isAvailable: !isChecked,
    }));
  };

  const handleDealerInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, dealerInputs);
    setDealerInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("dealerName", dealerInputs.dealerName);
    formData.append("dealerLocation", dealerInputs.dealerLocation);
    formData.append("mobileNumber", dealerInputs.mobileNumber);
    formData.append("email", dealerInputs.email);
    formData.append("isAvailable", isChecked.toString());
    formData.append("brandId", dealerInputs.brandId?.toString() || "");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateDealer({ data: formData, id });
      toastNotify("Dealer updated successfully", "success");
    } else {
      debugger
      //create
      response = await createDealer(formData);
      toastNotify("Dealer created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/dealer/dealerlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit Dealer" : "Add Dealer"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter dealerName"
              required
              name="dealerName"
              value={dealerInputs.dealerName}
              onChange={handleDealerInput}
            />

           

            <label htmlFor="country">Select brand</label>
            <select
              className="form-control"
              name="brandId"
              value={dealerInputs.brandId}
              onChange={(e) =>
                setDealerInputs((prevData) => ({
                  ...prevData,
                  brandId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select brand</option>
              {brandsData?.result.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Enter dealerLocation"
              required
              name="dealerLocation"
              value={dealerInputs.dealerLocation}
              onChange={handleDealerInput}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter mobileNumber"
              required
              name="mobileNumber"
              value={dealerInputs.mobileNumber}
              onChange={handleDealerInput}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              required
              name="email"
              value={dealerInputs.email}
              onChange={handleDealerInput}
            />

            <label htmlFor="checkbox">Is AVailable</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isAvailable"
              value={isChecked.toString()}
              // checked={dealerInputs.isActive}
              // onChange={handledealerInput}
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
                  onClick={() => navigate("/dealer/dealerlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Dealer
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DealerUpsert;

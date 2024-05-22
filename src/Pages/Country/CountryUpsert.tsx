import React, { useEffect, useState } from "react";
import {
  useCreateCountryMutation,
  useGetCountryByIdQuery,
  useUpdateCountryMutation,
} from "../../Apis/countryApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

// const countryData = {
//   countryName: "",
//   isActive: true,
// };
const countryData: { countryName: string; isActive: boolean } = {
  countryName: "",
  isActive: false,
};

function CountryUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [countryInputs, setCountryInputs] = useState(countryData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const { data } = useGetCountryByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        countryName: data.result.countryName,
        isActive: data.result.isActive,
      };
      setCountryInputs(tempData);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCountryInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, countryInputs);
    setCountryInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("CountryName", countryInputs.countryName);
    formData.append("IsActive", countryInputs.isActive.toString());

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateCountry({ data: formData, id });
      toastNotify("Country updated successfully", "success");
    } else {
      //create
      response = await createCountry(formData);
      toastNotify("Country created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/country/countrylist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Country" : "Add Country"}
      </h3>
      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="countryName"
              value={countryInputs.countryName}
              onChange={handleCountryInput}
            />

            <label htmlFor="checkbox">Is Active</label>
            <input
              type="checkbox"
              name="isActive"
              // checked={countryInputs.isActive}
              // onChange={handleCountryInput}
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
                  onClick={() => navigate("/country/countrylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CountryUpsert;

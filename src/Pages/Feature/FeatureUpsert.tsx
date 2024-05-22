import React, { useEffect, useState } from "react";
import {
  useCreateFeatureMutation,
  useGetFeatureByIdQuery,
  useUpdateFeatureMutation,
} from "../../Apis/featureApi";
import { useGetFeatureTypesQuery } from "../../Apis/featuretypeApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

// const countryData = {
//   countryName: "",
//   isActive: true,
// };

const featureData: { name: string; featureTypeId?: number} = {
  name: "",
  featureTypeId: undefined,
};

function FeatureUpsert() {
  debugger;
  const { id } = useParams();

  const navigate = useNavigate();
  const [FeatureInputs, setFeatureInputs] = useState(featureData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createFeature] = useCreateFeatureMutation();
  const [updateFeature] = useUpdateFeatureMutation();
  const { data } = useGetFeatureByIdQuery(id);
  
  const { data: featureTypesData } = useGetFeatureTypesQuery(null);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        featureTypeId: data.result.featureTypeId,
      };
      setFeatureInputs(tempData);
    }
  }, [data]);

 

  const handleFeatureInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, featureData);
    setFeatureInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("Name", FeatureInputs.name);
    formData.append("FeatureTypeId", FeatureInputs.featureTypeId?.toString() || "");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateFeature({ data: formData, id });
      toastNotify("Feature updated successfully", "success");
    } else {
      //create

      response = await createFeature(formData);
      toastNotify("Feature created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/feature/featurelist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Feature" : "Add Feature"}
      </h3>
    

      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter FeatureName"
              required
              name="name"
              value={FeatureInputs.name}
              onChange={handleFeatureInput}
            />
           
           <label htmlFor="FeatureType">Select FeatureType</label>
            <select
              className="form-control"
              name="FeatureTypeId"
              value={FeatureInputs.featureTypeId}
              onChange={(e) =>
                setFeatureInputs((prevData) => ({
                  ...prevData,
                  featureTypeId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select FeatureType</option>
              {featureTypesData?.result.map((featureType:any) => (
                <option key={featureType.id} value={featureType.id}>
                  {featureType.featureTypeName}
                </option>
              ))}
            </select>
          
           
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
                  onClick={() => navigate("/feature/featurelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Feature
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default FeatureUpsert;

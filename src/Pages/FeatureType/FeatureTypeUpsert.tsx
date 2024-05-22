import React, { useEffect, useState } from "react";
import {
  useCreateFeatureTypeMutation ,
  useGetFeatureTypeByIdQuery,
  useUpdateFeatureTypeMutation,
} from "../../Apis/featuretypeApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

// const countryData = {
//   countryName: "",
//   isActive: true,
// };
const featuretypeData: { featureTypeName: string} = {
  featureTypeName: "",
};

function FeatureTypeUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [featuretypeInputs, setFeatureTypeInputs] = useState(featuretypeData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createFeatureType] = useCreateFeatureTypeMutation();
  const [updateFeatureType] = useUpdateFeatureTypeMutation();
  const { data } = useGetFeatureTypeByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        featureTypeName: data.result.featureTypeName,
        // isActive: data.result.isActive,
      };
      setFeatureTypeInputs(tempData);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFeatureTypeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    debugger
    const tempData = inputHelper(e, featuretypeInputs);
    setFeatureTypeInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    debugger

    formData.append("featureTypeName", featuretypeInputs.featureTypeName);

    let response;
    
    
    if (id) {
      //update
      formData.append("Id", id);
      debugger
      response = await updateFeatureType({ data: formData, id });
      toastNotify("featuretype updated successfully", "success");
    } else {
      //create
  
      response = await createFeatureType(formData);
      
      toastNotify("featuretype created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/featuretype/featuretypelist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit FeatureType" : "Add Featuretype"}
      </h3>
      {/* <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="typeName"
              value={featuretypeInputs.typeName}
              onChange={handleFeatureTypeInput}
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
                  onClick={() => navigate("/featuretype/featuretypelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to FeatureType
                </a>
              </div>
            </div>
          </div>
        </div>
      </form> */}

      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter FeatureTypeName"
              required
              name="featureTypeName"
              value={featuretypeInputs.featureTypeName}
              onChange={handleFeatureTypeInput}
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
                  onClick={() => navigate("/featuretype/featuretypelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to FeatureType
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default FeatureTypeUpsert;

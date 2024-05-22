import React from "react";
import {
  useDeleteFeatureMutation,
  useGetFeaturesQuery,
} from "../../Apis/featureApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { featureModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function FeatureList() {
  debugger
  const [deleteFeature] = useDeleteFeatureMutation();
  const { data, isLoading } = useGetFeaturesQuery(null);
  const navigate = useNavigate();

  const handleFeatureDelete = async (id: number) => {
    toast.promise(
      deleteFeature(id),
      {
        pending: "Processing your request...",
        success: "Feature Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Feature List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/feature/featureupsert")}
            >
              Add New Feature
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              
              <div className="col-1">ID</div>
              <div className="col-3">FeatureName</div>
              <div className="col-3">FeatureType</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((feature: featureModel) => {
              return (
                <div className="row border" key={feature.id}>
                  <div className="col-1">{feature.id}</div>
                  <div className="col-3">{feature.name}</div>
                  <div className="col-3">{feature.featureType.featureTypeName}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/feature/featureupsert/" + feature.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleFeatureDelete(feature.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default FeatureList;

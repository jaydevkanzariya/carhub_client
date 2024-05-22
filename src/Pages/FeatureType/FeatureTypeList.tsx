import React from "react";
import {
  useDeleteFeatureTypeMutation,
  useGetFeatureTypesQuery,
} from "../../Apis/featuretypeApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { featureTypeModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function FeatureTypeList() {
  const [deleteFeatureType] = useDeleteFeatureTypeMutation();
  const { data, isLoading } = useGetFeatureTypesQuery(null);
  const navigate = useNavigate();

  const handleFeatureTypeDelete = async (id: number) => {
    toast.promise(
      deleteFeatureType(id),
      {
        pending: "Processing your request...",
        success: "FeatureType Deleted Successfully 👌",
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
            <h1 className="text-success">FeatureType List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/featuretype/featuretypeupsert")}
            >
              Add New FeatureType
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              {/* <div className="col-1">Image</div> */}
              <div className="col-1">ID</div>
              <div className="col-4">FeatureTypeName</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((featuretype: featureTypeModel) => {
              return (
                <div className="row border" key={featuretype.id}>
                  <div className="col-1">{featuretype.id}</div>
                  <div className="col-4">{featuretype.featureTypeName}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/featuretype/featuretypeupsert/" + featuretype.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleFeatureTypeDelete(featuretype.id)}
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

export default FeatureTypeList;

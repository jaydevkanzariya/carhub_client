import React from "react";
import {
  useDeleteCarTypeMutation,
  useGetCarTypesQuery,
} from "../../Apis/cartypeApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { carTypeModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function CarTypeList() {
  const [deleteCarType] = useDeleteCarTypeMutation();
  const { data, isLoading } = useGetCarTypesQuery(null);
  const navigate = useNavigate();

  const handleCarTypeDelete = async (id: number) => {
    toast.promise(
      deleteCarType(id),
      {
        pending: "Processing your request...",
        success: "CarType Deleted Successfully 👌",
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
            <h1 className="text-success">CarType List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/cartype/cartypeupsert")}
            >
              Add New CarType
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              {/* <div className="col-1">Image</div> */}
              <div className="col-1">ID</div>
              <div className="col-4">CarTypeName</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((cartype: carTypeModel) => {
              return (
                <div className="row border" key={cartype.id}>
                  <div className="col-1">{cartype.id}</div>
                  <div className="col-4">{cartype.typeName}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/cartype/cartypeupsert/" + cartype.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCarTypeDelete(cartype.id)}
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

export default CarTypeList;

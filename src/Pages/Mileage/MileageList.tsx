import React from "react";
import {
  useDeleteMileageMutation,
  useGetMileagesQuery,
} from "../../Apis/mileageApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { mileageModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function MileageList() {
  const [deleteMileage] = useDeleteMileageMutation();
  const { data, isLoading } = useGetMileagesQuery(null);
  const navigate = useNavigate();

  const handleMileageDelete = async (id: number) => {
    toast.promise(
      deleteMileage(id),
      {
        pending: "Processing your request...",
        success: "Mileage Deleted Successfully 👌",
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
            <h1 className="text-success">Mileage List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/mileage/mileageupsert")}
            >
              Add New Mileage
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              {/* <div className="col-1">Image</div> */}
              <div className="col-2">Car Name</div>
              <div className="col-2">FuelType</div>
              <div className="col-2">Transmission</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((mileage: mileageModel) => {
              return (
                <div className="row border" key={mileage.id}>
                  <div className="col-2">{mileage.car.name}</div>
                  <div className="col-2">{mileage.fuelType}</div>
                  <div className="col-2">{mileage.transmission}</div>
                 
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/mileage/mileageupsert/" + mileage.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleMileageDelete(mileage.id)}
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

export default MileageList;

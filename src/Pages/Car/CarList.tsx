import React from "react";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
  useGetCarByIdQuery,
} from "../../Apis/carApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { carModel } from "../../Interfaces";
import { useNavigate } from "react-router";
function CarList() {
  const [deleteCar] = useDeleteCarMutation();
  const { data, isLoading } = useGetCarsQuery(null);
  const navigate = useNavigate();

  const handleCarDelete = async (id: number) => {
    toast.promise(
      deleteCar(id),
      {
        pending: "Processing your request...",
        success: "Car Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  const handleCarXColorClick = (carId: number, carName: string) => {
    navigate(`/carXColor/carXColorupsert/${carId}`, { state: { carName, carId } });
  };
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Car List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/Car/carupsert")}
            >
              Add New Car
            </button>
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-1">Name</div>
              <div className="col-2">brand</div>
              <div className="col-2">StratingPrice</div>
              <div className="col-2">CarXColor</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((car: carModel) => {
              return (
                <div className="row border" key={car.id}>
                  <div className="col-1">{car.name}</div>
                  <div className="col-2">{car.brand?.brandName}</div>
                  <div className="col-2">{car.startingPrice}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() => handleCarXColorClick(car.id, car.name)}
                    >
                      CarXColor
                      
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/carSpecification/carSpecificationUpsert/" + car.id)}
                    >
                      CarSpecification
                      
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/carXFeature/carXFeatureUpsert/" + car.id)}
                    >
                      CarXFeature
                      
                    </button>
                  </div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() => navigate("/car/carupsert/" + car.id)}
                      ></i>
                    </button>
                    <button className="btn btn-danger mx-2">
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

export default CarList;

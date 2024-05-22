import React from "react";
import {
  useDeleteColorMutation,
  useGetColorsQuery,
} from "../../Apis/colorApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { colorModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function ColorList() {
  const [deleteColor] = useDeleteColorMutation();
  const { data, isLoading } = useGetColorsQuery(null);
  const navigate = useNavigate();

  const handleColorDelete = async (id: number) => {
    toast.promise(
      deleteColor(id),
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
            <h1 className="text-success">Color List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/color/colorupsert")}
            >
              Add New Color
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              {/* <div className="col-1">Image</div> */}
              <div className="col-1">ID</div>
              <div className="col-4">Color</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((color: colorModel) => {
              return (
                <div className="row border" key={color.id}>
                  <div className="col-1">{color.id}</div>
                  <div className="col-4">{color.colorName}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/color/colorupsert/" + color.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleColorDelete(color.id)}
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

export default ColorList;

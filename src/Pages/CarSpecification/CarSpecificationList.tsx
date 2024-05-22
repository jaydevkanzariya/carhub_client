import React from "react";
import {
  useDeleteVariantMutation,
  useGetVariantsQuery,
} from "../../Apis/variantApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { variantModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function VariantList() {
  const [deleteVariant] = useDeleteVariantMutation();
  const { data, isLoading } = useGetVariantsQuery(null);
  const navigate = useNavigate();

  const handleVarintDelete = async (id: number) => {
    toast.promise(
      deleteVariant(id),
      {
        pending: "Processing your request...",
        success: "Variant Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      },
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Variant List</h1>
            

            <button
              className="btn btn-success"
              onClick={() => navigate("/variant/variantupsert")}
            >
              Add New Varint
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-3">CarName</div>
              <div className="col-3">VariantName</div>
              <div className="col-3">Transmission</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((variant: variantModel) => {
              return (
                <div className="row border" key={variant.id}>
                  <div className="col-1">{variant.id}</div>
                  <div className="col-3">{variant.car.name}</div>
                  <div className="col-3">{variant.variantName}</div>
                  <div className="col-3">{variant.transmission}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/carXColor/carXColorUpsert/" + variant.carId)
                        }
                      ></i>
                    </button>
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/variant/variantupsert/" + variant.id)
                        }

                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleVarintDelete(variant.id)}
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

export default VariantList;

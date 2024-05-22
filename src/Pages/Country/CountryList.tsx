import React from "react";
import {
  useDeleteCountryMutation,
  useGetCountrysQuery,
} from "../../Apis/countryApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { countryModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function CountryList() {
  const [deleteCountry] = useDeleteCountryMutation();
  const { data, isLoading } = useGetCountrysQuery(null);
  const navigate = useNavigate();

  const handleCountryDelete = async (id: number) => {
    toast.promise(
      deleteCountry(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
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
            <h1 className="text-success">Country List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/country/countryupsert")}
            >
              Add New Country
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              {/* <div className="col-1">Image</div> */}
              <div className="col-1">ID</div>
              <div className="col-4">CountryName</div>
              <div className="col-3">Is Active</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((country: countryModel) => {
              return (
                <div className="row border" key={country.id}>
                  <div className="col-1">{country.id}</div>
                  <div className="col-4">{country.countryName}</div>
                  <div className="col-3">{country.isActive}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/country/countryupsert/" + country.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCountryDelete(country.id)}
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

export default CountryList;

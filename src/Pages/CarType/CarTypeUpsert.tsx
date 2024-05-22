import React, { useEffect, useState } from "react";
import {
  useCreateCarTypeMutation,
  useGetCarTypeByIdQuery,
  useUpdateCarTypeMutation,
} from "../../Apis/cartypeApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { isDeepStrictEqual } from "util";

// const countryData = {
//   countryName: "",
//   isActive: true,
// };
const cartypeData: { typeName: string} = {
  typeName: "",
};

function CarTypeUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [cartypeInputs, setCarTypeInputs] = useState(cartypeData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCarType] = useCreateCarTypeMutation();
  const [updateCarType] = useUpdateCarTypeMutation();
  const { data } = useGetCarTypeByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        typeName: data.result.typeName,
        isActive: data.result.isActive,
      };
      setCarTypeInputs(tempData);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCarTypeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, cartypeInputs);
    setCarTypeInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("CountryName", cartypeInputs.typeName);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateCarType({ data: formData, id });
      toastNotify("Cartype updated successfully", "success");
    } else {
      //create
      response = await createCarType(formData);
      toastNotify("cartype created successfully", "success");
    }

    

    if (response) {
      setLoading(false);
      navigate("/cartype/cartypelist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit CarType" : "Add Cartype"}
      </h3>
     
      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter CarTypeName"
              required
              name="typeName"
              value={cartypeInputs.typeName}
              onChange={handleCarTypeInput}
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
                  onClick={() => navigate("/cartype/cartypelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to CarType
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default CarTypeUpsert;

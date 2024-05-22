import React, { useEffect, useState } from "react";
import {
  useCreateColorMutation,
  useGetColorByIdQuery,
  useUpdateColorMutation,
} from "../../Apis/colorApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

// const countryData = {
//   countryName: "",
//   isActive: true,
// };
const colorData: { colorName: string} = {
  colorName: "",
};

function ColorUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [colorInputs, setColorInputs] = useState(colorData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createColor] = useCreateColorMutation();
  const [updateColor] = useUpdateColorMutation();
  const { data } = useGetColorByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        colorName: data.result.colorName,
     
      };
      setColorInputs(tempData);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleColorInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, colorInputs);
    setColorInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("ColorName", colorInputs.colorName);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateColor({ data: formData, id });
      toastNotify("Color updated successfully", "success");
    } else {
      //create
      debugger
      response = await createColor(formData);
      toastNotify("color created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/color/colorlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Color" : "Add Color"}
      </h3>
      

      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter ColorName"
              required
              name="colorName"
              value={colorInputs.colorName}
              onChange={handleColorInput}
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
                  onClick={() => navigate("/color/colorlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Color
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default ColorUpsert;

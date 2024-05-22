import React, { useEffect, useState } from "react";
import { useGetCarByIdQuery } from "../../Apis/carApi";
import { useGetColorsQuery } from "../../Apis/colorApi";
import { useGetCarXColorByCarIdQuery, useCreateCarXColorMutation } from "../../Apis/carXColorApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function CarXColorUpsert() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: carData } = useGetCarByIdQuery(carId);
  const { data: colorData } = useGetColorsQuery(null);
  const { data: carXColorData } = useGetCarXColorByCarIdQuery(carId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [createCarXColor] = useCreateCarXColorMutation();

  useEffect(() => {
    if (colorData) {
      const initialCheckedMap: Record<string, boolean> = {};
      carXColorData?.result.forEach((item: any) => {
        initialCheckedMap[item.colorId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedColorIds(carXColorData?.result.map((item: any) => item.colorId) || []);
    }
  }, [colorData, carXColorData]);

  const handleOnChange = (colorId: string) => {
    debugger
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [colorId]: !prevMap[colorId],
    }));
    
    setSelectedColorIds((prevIds) => {
      if (prevIds.includes(colorId)) {
        
        // If colorId is already in the list, remove it
        return prevIds.filter((id) => id !== colorId);
      } else {
        // If colorId is not in the list, add it
        return [...prevIds, colorId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (carId) {
      formData.append("CarId", carId);
      selectedColorIds.forEach((colorId) => {
        formData.append("SelectedColorIds", colorId);
      });

      const response = await createCarXColor(formData);
      if (response) {
        toastNotify("Color updated successfully", "success");
        setLoading(false);
        navigate("/car/carlist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success">{carData?.result.name}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="form-group">
              <label>Select Colors:</label>
              {colorData?.result.map((color: any) => (
                <div key={color.id} className="form-check">
                  <input
                    type="checkbox"
                    name="SelectedColorIds"
                    className="form-check-input"
                    id={`payment-${color.id}`}
                    value={color.id}
                    checked={isCheckedMap[color.id] || false}
                    onChange={() => handleOnChange(color.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`color-${color.id}`}
                  >
                    {color.colorName}
                  </label>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => navigate("/car/carlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to CarList
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CarXColorUpsert;

import React, { useEffect, useState } from "react";
import {
  useCreateCarSpecificationMutation,
  useGetCarSpecificationByIdQuery,
  useUpdateCarSpecificationMutation,
} from "../../Apis/carSpecificationApi";
import { useGetCarsQuery } from "../../Apis/carApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const carSpecificationData: {
  carId?: number 
  displacement: string
  maxPower: string
  maxTorque: string
  cylinder: number 
  frontSuspension: string
  rearSuspension: string
  shockAbsorbers: string
  airbagNo: string
  length: number
  width: number
  height: number
  bootSpace: number
  seatingCapacity: number
  wheelBase: number
  gearBox: number
  driveType: string
} =
  {
  carId: undefined,
  displacement: "",
  maxPower: "",
  maxTorque: "",
  cylinder: 0,
  frontSuspension: "",
  rearSuspension: "",
  shockAbsorbers: "",
  airbagNo: "",
  length: 0,
  width: 0,
  height: 0,
  bootSpace: 0,
  seatingCapacity: 0,
  wheelBase: 0,
  gearBox: 0,
  driveType: "",
 
};

function CarSpecificationUpsert() {
  debugger
  
  const { id } = useParams();

  const navigate = useNavigate();
  const [carSpecificationInputs, setCarSpecificationInputs] = useState(carSpecificationData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCarSpecification] = useCreateCarSpecificationMutation();
  const [updateCarSpecification] = useUpdateCarSpecificationMutation();
  const { data } = useGetCarSpecificationByIdQuery(id);
  

  // useEffect(() => {
  //   if (data && data.result) {
  //     const tempData = {
  //       carSpecificationName: data.result.carSpecificationName,
  //       carId: data.result.carId,
  //       isActive: data.result.isActive,
  //     };
  //     setCarSpecificationInputs(tempData);
  //     setIsChecked(tempData.isActive);
  //   }
  // }, [data]);

  useEffect(() => {
    if (id) {
      
      // Fetch carSpecification data by ID
      // const { data } = useGetCarSpecificationByIdQuery(id);
      if (data && data.result) {
        const tempData = {
          
          carId: data.result.carId,
          displacement: data.result.displacement,
          maxPower: data.result.maxPower,
          maxTorque: data.result.maxTorque,
          cylinder: data.result.cylinder,
          
          frontSuspension: data.result.frontSuspension,
          rearSuspension: data.result.rearSuspension,
          shockAbsorbers: data.result.shockAbsorbers,
          airbagNo: data.result.airbagNo,
          length: data.result.length,
          width: data.result.width,
          height: data.result.height,
          bootSpace: data.result.bootSpace,
          seatingCapacity: data.result.seatingCapacity,
          wheelBase: data.result.wheelBase,
          gearBox: data.result.gearBox,
          driveType: data.result.driveType,
        };
        setCarSpecificationInputs(tempData);
        
      }
    }
  }, [id]);

  

  const handleCarSpecificationInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, carSpecificationInputs);
    setCarSpecificationInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("displacement", carSpecificationInputs.displacement);
    formData.append("maxPower", carSpecificationInputs.maxPower);
    formData.append("maxTorque", carSpecificationInputs.maxTorque);
    formData.append("frontSuspension", carSpecificationInputs.frontSuspension);
    formData.append("rearSuspension", carSpecificationInputs.rearSuspension);
    formData.append("shockAbsorbers", carSpecificationInputs.shockAbsorbers);
    formData.append("airbagNo", carSpecificationInputs.airbagNo);
    formData.append("length", carSpecificationInputs.length.toString());
    formData.append("width", carSpecificationInputs.width.toString());
    formData.append("height", carSpecificationInputs.height.toString());
    formData.append("bootSpace", carSpecificationInputs.bootSpace.toString());
    formData.append("seatingCapacity", carSpecificationInputs.seatingCapacity.toString());
    formData.append("wheelBase", carSpecificationInputs.wheelBase.toString());
    formData.append("gearBox", carSpecificationInputs.gearBox.toString());
    formData.append("cylinder", carSpecificationInputs.cylinder.toString());
    formData.append("driveType", carSpecificationInputs.driveType);
    formData.append("CarId", id?.toString() || "");

    let response;

    
      response = await createCarSpecification(formData);
      toastNotify("CarSpecification created successfully", "success");
    

    if (response) {
      setLoading(false);
      navigate("/car/carlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">Add {data?.result.car.name} CarSpecification</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
         <div className="col-md-7">
          
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter displacement"
              required
              name="displacement"
              value={carSpecificationInputs.displacement}
              onChange={handleCarSpecificationInput}
            />
             
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter maxPower"
              required
              name="maxPower"
              value={carSpecificationInputs.maxPower}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter maxTorque"
              required
              name="maxTorque"
              value={carSpecificationInputs.maxTorque}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter cylinder"
              required
              name="cylinder"
              value={carSpecificationInputs.cylinder}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter frontSuspension"
              required
              name="frontSuspension"
              value={carSpecificationInputs.frontSuspension}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter rearSuspension"
              required
              name="rearSuspension"
              value={carSpecificationInputs.rearSuspension}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter shockAbsorbers"
              required
              name="shockAbsorbers"
              value={carSpecificationInputs.shockAbsorbers}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter airbagNo"
              required
              name="airbagNo"
              value={carSpecificationInputs.airbagNo}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter length"
              required
              name="length"
              value={carSpecificationInputs.length}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter  width"
              required
              name="width"
              value={carSpecificationInputs.width}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter  height"
              required
              name=" height"
              value={carSpecificationInputs.height}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter  bootSpace"
              required
              name=" bootSpace"
              value={carSpecificationInputs.bootSpace}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter  seatingCapacity"
              required
              name=" seatingCapacity"
              value={carSpecificationInputs.seatingCapacity}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter  wheelBase"
              required
              name=" wheelBase"
              value={carSpecificationInputs.wheelBase}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter  gearBox"
              required
              name=" gearBox"
              value={carSpecificationInputs.gearBox}
              onChange={handleCarSpecificationInput}
            />
            <input
              type="text "
              className="form-control mt-2"
              placeholder="Enter  driveType"
              required
              name=" driveType"
              value={carSpecificationInputs.driveType}
              onChange={handleCarSpecificationInput}
            />
            
           
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                   Create
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/car/carlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Car
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CarSpecificationUpsert;

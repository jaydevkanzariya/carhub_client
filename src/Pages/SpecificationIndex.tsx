import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import {
  useDeleteCarMutation,
  useGetCarsQuery,
  useGetCarByIdQuery,
} from "../Apis/carApi";
import {
  useGetCarSpecificationsQuery,
  useCreateCarSpecificationMutation,
  useGetCarSpecificationByIdQuery,
  useUpdateCarSpecificationMutation,
} from "../Apis/carSpecificationApi";

import {
  useGetFeatureTypesQuery,
  useGetFeatureTypeByIdQuery,
  useCreateFeatureTypeMutation,
  useUpdateFeatureTypeMutation,
  useDeleteFeatureTypeMutation,
} from "../Apis/featuretypeApi";
import {
  useGetFeaturesQuery,
  useGetFeatureByIdQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} from "../Apis/featureApi";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { MainLoader } from "../Components/Page/Common";
import {
  carModel,
  mileageModel,
  carSpecificationModel,
  featureModel,
  featureTypeModel,
} from "../Interfaces";
import { useNavigate, useParams } from "react-router-dom";

function SpecificationIndex() {
  debugger;
  const { id } = useParams();
  const { data: carData } = useGetCarByIdQuery(id);
  const { data: carspecification } = useGetCarSpecificationByIdQuery(id);
  const { data: featureTypes } = useGetFeatureTypesQuery(null);
  const { data: features} = useGetFeaturesQuery(null);

  const [showFullDescription, setShowFullDescription] = useState(false);
  function toggleDescription() {
    setShowFullDescription((prev) => !prev);
  }
  const [selectedFeature, setSelectedFeature] = useState(null as number | null);

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-3 offset-lg-1 text-center mb-3">
          <div>
            <figure className="figure">
              <img
                src="@Model.Car.ImageURL"
                className="figure-img img-fluid rounded"
                alt="..."
              />
            </figure>
          </div>
        </div>

        <div className="col-12 col-lg-6 offset-lg-1">
          <div className="col-12 col-md-6 pb-4">
            <span className="badge">{carData?.result.name}</span>
          </div>
          <div className="row ps-2">
            <h6 className="text-dark text-opacity-50 ">
              Brand Name :- {carData?.result.brand.brandName}
            </h6>
          </div>
          <div className="row ps-2">
            <h6 className="text-dark text-opacity-50  pb-2">
              ManufacturingYear :-
              <span className="">{carData?.result.manufacturingYear}</span>
            </h6>
          </div>

          <div className="row ps-2 ">
            <h6 className="text-dark text-opacity-50 ">
              Details :- {carData?.result.details}
            </h6>
          </div>
        </div>
      </div>

      <div className="col-lg-12 col-md-12 col-sm-12">
        <h3 className="box-title mt-5">Car Specification Info</h3>
        <div className="table-responsive">
          <table className="table table-striped table-product">
            <tbody>
              <tr>
                <td width="390">Brand Name</td>
                <td>{carData?.result.brand.brandName}</td>
              </tr>
              <tr>
                <td>Car Name</td>
                <td>{carData?.result.name}</td>
              </tr>

              <tr>
                <td>Displacement(cc)</td>
                <td>{carspecification?.result.displacement}</td>
              </tr>
              <tr>
                <td>Max Power</td>
                <td>{carspecification?.result.maxPower}</td>
              </tr>
              <tr>
                <td>Max Torque</td>
                <td>{carspecification?.result.maxTorque}</td>
              </tr>
              <tr>
                <td>No of Cylinder</td>
                <td>{carspecification?.result.cylinder}</td>
              </tr>
              <tr>
                <td>FrontSuspension</td>
                <td>{carspecification?.result.frontSuspension}</td>
              </tr>
              <tr>
                <td>RearSuspension</td>
                <td>{carspecification?.result.rearSuspension}</td>
              </tr>
              <tr>
                <td>ShockAbsorbers</td>
                <td>{carspecification?.result.shockAbsorbers}</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>{carspecification?.result.length}</td>
              </tr>
              <tr>
                <td>Width</td>
                <td>{carspecification?.result.width}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{carspecification?.result.height}</td>
              </tr>
              <tr>
                <td>BootSpace</td>
                <td>{carspecification?.result.bootSpace}</td>
              </tr>
              <tr>
                <td>SeatingCapacity</td>
                <td>{carspecification?.result.seatingCapacity}</td>
              </tr>
              <tr>
                <td>WheelBase</td>
                <td>{carspecification?.result.wheelBase}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex">
        {featureTypes?.result.map((item1: featureTypeModel, index1: number) => (
          <Dropdown className="mx-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {item1.featureTypeName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {features?.result.map(
                (item2: featureModel, index2: number) =>
                  item1.id === item2.featureTypeId && (
                    <Dropdown.Item href="#/action-1">
                      {item2.name}
                    </Dropdown.Item>
                  )
              )}
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </div>
    </>
  );
}

export default SpecificationIndex;

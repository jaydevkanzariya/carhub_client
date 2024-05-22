
import React, { useEffect, useState } from "react";
import { useGetFeaturesQuery,
     useGetFeatureByIdQuery,
     useCreateFeatureMutation,
     useUpdateFeatureMutation,
     useDeleteFeatureMutation 
   } from "../../Apis/featureApi";
   import { useGetCarByIdQuery } from "../../Apis/carApi";
   import { useGetFeatureTypesQuery,
   } from "../../Apis/featuretypeApi";
  
   import { useGetCarXFeaturesQuery,
     useGetCarXFeatureByIdQuery,
     useCreateCarXFeatureMutation,
     useGetCarXFeatureByCarIdQuery,
     useUpdateCarXFeatureMutation,
     useDeleteCarXFeatureMutation} from "../../Apis/carXFeatureApi";
import { toastNotify } from "../../Helper";
import { featureModel,carXFeatureModel } from "../../Interfaces";
import { useNavigate, useParams } from "react-router-dom";

function CarXFeatureUpsert() {
  
  const { carId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: carData } = useGetCarByIdQuery(carId);
  const { data: featuresData } = useGetFeaturesQuery(null);
  const { data: featuretypesData } = useGetFeatureTypesQuery(null);
  const { data: carXFeatureData } = useGetCarXFeatureByCarIdQuery(carId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([]);
  const [selectedFeaturetypeId, setSelectedFeaturetypeId] = useState<string | undefined>();
  const [createCarXFeature] = useCreateCarXFeatureMutation();

  
  useEffect(() => {
    
    if (carXFeatureData && selectedFeaturetypeId) {
      const initialCheckedMap: Record<string, boolean> = {};
      const featureIdsForSelectedType = carXFeatureData.result
      .filter((item:carXFeatureModel) => item.featureTypeId.toString() === selectedFeaturetypeId)
        .map((item: carXFeatureModel) => {
          initialCheckedMap[item.featureId.toString()] = true;
          return item.featureId.toString()
        });
       
      alert(JSON.stringify(featureIdsForSelectedType));
      setIsCheckedMap(initialCheckedMap);
      
      setSelectedFeatureIds(featureIdsForSelectedType);
    }
  }, [selectedFeaturetypeId]);

  const handleFeaturetypeChange = (featuretypeId: string) => {
    setSelectedFeaturetypeId(featuretypeId);
  };

  const handleFeatureChange = (featureId: string) => {
    debugger
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [featureId]: !prevMap[featureId],
    }));

    setSelectedFeatureIds((prevIds) => {
      if (prevIds.includes(featureId)) {
        return prevIds.filter((id) => id !== featureId);
      } else {
        return [...prevIds, featureId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    if (carId && selectedFeaturetypeId) {
      formData.append("CarId", carId);
      formData.append("FeatureTypeId", selectedFeaturetypeId);
      selectedFeatureIds.forEach((featureId) => {
        formData.append("SelectedFeatureIds", featureId);
      });

      const response = await createCarXFeature(formData);
      if (response) {
        toastNotify("Features updated successfully", "success");
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
            <label htmlFor="featureTypeId">Select FeatureType</label>
            <select
              className="form-control"
              name="featureTypeId"
              onChange={(e) => handleFeaturetypeChange(e.target.value)}
            >
              <option value="">Select Featuretype</option>
              {featuretypesData?.result.map((featuretype: any) => (
                <option key={featuretype.id} value={featuretype.id}>
                  {featuretype.featureTypeName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-7">
            {selectedFeaturetypeId && (
              <div className="form-group">
                <label>Select Features:</label>
                {featuresData?.result.map((feature: featureModel) => (
                  feature.featureTypeId === Number(selectedFeaturetypeId) && (
                    <div key={feature.id} className="form-check">
                      <input
                        type="checkbox"
                        name="SelectedFeatureIds"
                        
                        className="form-check-input"
                        id={`feature-${feature.id}`}
                        value={feature.id}
                        checked={isCheckedMap[feature.id] || false}
                        onChange={() => handleFeatureChange(feature.id.toString())}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`feature-${feature.id}`}
                      >
                        {feature.name}
                      </label>
                    </div>
                  )
                ))}
              </div>
            )}
          
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

export default CarXFeatureUpsert;


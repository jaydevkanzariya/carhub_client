import React,{useEffect} from "react";
import {
  useDeleteDealerMutation,
  useGetDealersQuery,
} from "../../Apis/dealerApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { dealerModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function DealerList() {
  const [deleteDealer] = useDeleteDealerMutation();
  const { data, isLoading, refetch} = useGetDealersQuery(null);
  const navigate = useNavigate();
  
  
  // const handleDealerDelete = async (id: number) => {
  //   toast.promise(
  //     deleteDealer(id),
  //     {
  //       pending: "Processing your request...",
  //       success: "Dealer Deleted Successfully 👌",
  //       error: "Error encoutnered 🤯",
  //     },
  //     {
  //       theme: "dark",
  //     },
      
  //   ).then(() => {
      
  //     refetch();
  //   });
    
  // };
   
  const handleDealerDelete = async (id: number) => {
    try {
      // Perform deletion
      await deleteDealer(id);

      // Display success toast
      toast.success("Dealer Deleted Successfully 👌", {
        theme: "dark",
      });
     
      window.location.reload();
      // Trigger a refetch to get the updated data
    
    } catch (error) {
      // Display error toast if deletion fails
      toast.error("Error encountered 🤯", {
        theme: "dark",
      });
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Dealer List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/dealer/dealerupsert")}
            >
              Add New Dealer
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-3">DealerName</div>
              <div className="col-3">BrandName</div>
              <div className="col-3">MobileNumber</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((dealer: dealerModel) => {
              return (
                <div className="row border" key={dealer.id}>
                  <div className="col-1">{dealer.id}</div>
                  <div className="col-3">{dealer.dealerName}</div>
                  <div className="col-3">{dealer.brand.brandName}</div>
                  <div className="col-3">{dealer.mobileNumber}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/dealer/dealerupsert/" + dealer.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDealerDelete(dealer.id)}
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

export default DealerList;

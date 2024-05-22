import React from "react";
import { CarIndexList } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";

function Home() {
  return (
    <div>
      <Banner />
     
      <div className="container p-2">
        <CarIndexList />
      </div>
    </div>
  );
}

export default Home;

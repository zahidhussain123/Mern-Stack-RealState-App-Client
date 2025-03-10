import React from "react";
import "./properties.css";
import { useProperties } from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/searchBar/SearchBar";
import PropertyCard from "../../components/propertyCard/PropertyCard";
import { useState } from "react";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filterVal, setFilterVal] = useState("");
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          width="80"
          height="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className='"flexColCenter paddings innerWidth properties-container'>
        <SearchBar filterVal={filterVal} setFilterVal={setFilterVal} />
        <div className="paddings flexCenter properties">
          {data &&
            data?.residencies
              ?.filter((val) => {
                return (
                  val?.title
                    ?.toLowerCase()
                    ?.includes(filterVal?.toLowerCase()) ||
                  val?.city
                    ?.toLowerCase()
                    ?.includes(filterVal?.toLowerCase()) ||
                  val?.country
                    ?.toLowerCase()
                    ?.includes(filterVal?.toLowerCase())
                );
              })
              ?.map((card, i) => <PropertyCard card={card} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Properties;

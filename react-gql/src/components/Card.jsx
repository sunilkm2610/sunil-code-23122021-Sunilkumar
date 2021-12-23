import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { CARS } from "../Graphql/Query";
const Card = () => {
  const { error, loading, data } = useQuery(CARS);
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  const zoom = (e) => {
    window.open(e.target.src, "Google", "width=500,height=500");
  };

  useEffect(() => {
    if (data) {
      setCars(data.getAllCarsList);
    }
  }, [data]);
  return (
    <>
      <div className="header">
        <h1>cars catalog</h1>
        <input
          type="text"
          placeholder="search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className="items">
        {cars
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((val) => {
            return (
              <div className="item" key={val.id}>
                <img src={val.image} onClick={(e) => zoom(e)} />
                <div className="title">
                  <h3>{val.name}</h3>
                  <h3>Model : {val.model}</h3>
                  <h3>Price : {val.price}</h3>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Card;

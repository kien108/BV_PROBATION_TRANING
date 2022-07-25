import React, { useEffect, useMemo, useState } from "react";
import DataItem from "./DataItem";

const MemorizeExample = () => {
   const [randomNumber, setRandomNumber] = useState(0);
   const [data, setData] = useState([]);

   const addElementToArray = () => {
      const randomElement = {
         index: data.length,
         value: Math.round(Math.random() * 100),
      };

      setData((prev) => [...prev, randomElement]);
   };

   useEffect(() => {
      console.log("re-render parent");
   });
   const getRandomNumber = () => {
      setRandomNumber(Math.round(Math.random() * 100));
   };

   const listDatas = useMemo(() => {
      return data.map((item, index) => <DataItem key={index} item={item} />);
   }, [data]);
   return (
      <div>
         <h1>{randomNumber}</h1>

         <div className="">{listDatas}</div>
         <div className="">
            <button onClick={() => getRandomNumber()}>Random Number</button>
            <button onClick={() => addElementToArray()}>Add Element</button>
         </div>
      </div>
   );
};

export default MemorizeExample;

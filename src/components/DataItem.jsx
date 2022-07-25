import React, { useEffect } from "react";

const DataItem = ({ item }) => {
   useEffect(() => {
      console.log("re render when data change....");
   });

   return (
      <div>
         {item.value} : {item.index}
      </div>
   );
};

export default DataItem;

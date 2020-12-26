import { gql, useQuery } from "@apollo/client";
import React from "react";

const App = () => {
  const {data} = useQuery(gql`{
    movies {
      title
    }
  }`);

  console.log(data);
  
  return <div>hello</div>;
};

export default App;

import React from "react";
import http from "../services/httpRequests";

interface Props {
  searchParams: { filter: string };
}

const ProductsDashboardPage = async ({ searchParams: { filter } }: Props) => {
  const data = await http.GET("http://localhost:3000/api/products");

  return (
    <>
      {filter ? <p>The Search Param is {filter}</p> : <p>Product Dash Board</p>}
      <div>{data}</div>
    </>
  );
};

export default ProductsDashboardPage;

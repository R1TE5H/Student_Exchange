import React from "react";
import { getData } from "../services/httpRequests";

interface Props {
  searchParams: { filter: string };
}

const ProductsDashboardPage = async ({ searchParams: { filter } }: Props) => {
  const products = await getData("https://jsonplaceholder.typicode.com/users");

  return (
    <>
      <div>
        {filter ? (
          <p>The Search Param is {filter}</p>
        ) : (
          <p>Product Dash Board</p>
        )}
      </div>
    </>
  );
};

export default ProductsDashboardPage;

import React from "react";

interface Props {
  searchParams: { filter: string };
}

const ProductsDashboardPage = ({ searchParams: { filter } }: Props) => {
  return (
    <div>
      {filter ? <p>The Search Param is {filter}</p> : <p>Product Dash Board</p>}
    </div>
  );
};

export default ProductsDashboardPage;

import http from "@/app/services/httpRequests";
import React from "react";

interface Props {
  params: { id: string };
}

const IndividualProductPage = async ({ params: { id } }: Props) => {
  const data = await http.GET(`http://localhost:3000/api/products/${id}`);

  return (
    <>
      <div>Product Number {id} Page</div>
      <div>
        {data.name}, {data.id}
      </div>
    </>
  );
};

export default IndividualProductPage;

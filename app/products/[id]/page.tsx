import React from "react";

interface Props {
  params: { id: string };
}

const IndividualProductPage = ({ params: { id } }: Props) => {
  return <div>Product Number {id} Page</div>;
};

export default IndividualProductPage;

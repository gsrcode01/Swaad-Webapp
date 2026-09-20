import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-2">Oops!!</h1>
      <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>
      <p className="text-gray-600">
        {error?.status ? `${error.status}: ${error.statusText}` : error?.message}
      </p>
    </div>
  );
};

export default Error;

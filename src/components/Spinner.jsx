import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-5xl text-blue-500" />
      </div>
  );
};

export default Spinner;

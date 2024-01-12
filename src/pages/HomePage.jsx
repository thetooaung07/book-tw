import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {

 const [admin, setAdmin] =  useState();

  const selectRef = useRef(null);
  const checkboxRef = useRef(null);
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Input value:", inputRef.current.value);
    console.log("Select value:", selectRef.current.value);
    console.log("Checkbox value:", checkboxRef.current.checked);
  }

  return (
    <div className=" w-screen  h-screen flex justify-center items-center gap-10">

            <Link to={"/books"} className="bg-blue-600 text-white block  my-2 py-4 px-20 rounded-lg text-center"> Books </Link>
            <Link to={"/readers"} className="bg-blue-600 text-white block  my-2 py-4 px-20 rounded-lg text-center"> Readers </Link>
            <Link to={"/authors"} className="bg-blue-600 text-white block  my-2 py-4 px-20 rounded-lg text-center"> Authors </Link>
    
    </div>
  );
};
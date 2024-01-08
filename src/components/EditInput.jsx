import PropTypes from "prop-types";
import React, { useState } from "react";

export const EditInput = ({
  edit,
  data,
  setData,
  placeholder,
  isNumber = false,
}) => {
  return (
    <div className="w-40 overflow-hidden">
      {edit ? (
        <input
          className="bg-black/20"
          placeholder={placeholder}
          autoFocus
          value={data ?? ""}
          onChange={(e) => setData(e.target.value)}
        ></input>
      ) : (
        data
      )}
    </div>
  );
};

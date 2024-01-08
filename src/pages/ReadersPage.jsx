import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEntryById } from "../service";

export const ReadersPage = () => {
  const [data, setData] = useState();
  const params = useParams();

  useEffect(() => {
    getEntryById("/student/", params.id).then((res) => setData(res));
  }, []);

  return (
    <div className="w-screen h-screen pl-20 pt-20 overflow-hidden">
     
    </div>
  );
};

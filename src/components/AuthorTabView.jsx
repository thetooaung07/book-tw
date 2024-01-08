import React, { useEffect, useState } from "react";
import { createNewEntry, deleteEntry, getAllEntry, updateExistingEntry } from "../service";
import { StudentCard } from "./AuthorCard";

export const AuthorTabView = () => {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");


  useEffect(() => {
    getAllEntry("/author").then((res) => setData(res));
  }, []);


  const handleCreate = () => {

    if (name != "" && dob != "" && contactInfo != "") {
      createNewEntry("/author", {
        authorName: name,
        dateOfBirth: dob,
        contactInfo: contactInfo,
        gpa: gpa
      }).then((res) => {
        setEditMode(false);
        setName("");
        setDob("");
        setData((prevData) => [...prevData, res]);
      }
      )
    } else {
      setEditMode(false);
    }
  }

  const handleDelete = (id) => {
    deleteEntry("/author/", id).then(() => {
      setData(prevData => prevData.filter(item => item.id !== id));
    });
  };

  return (
    <div className="w-full h-full transition-all duration-300 rounded-lg">
     
    </div>
  );
};

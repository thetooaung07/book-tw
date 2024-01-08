import React, {  useState } from "react";
import { EditInput } from "./EditInput";
import {  updateExistingEntry } from "../service";
import { useNavigate } from "react-router-dom";

export const StudentCard = ({
  id,
  studentName,
  studentDob,
  studentContactInfo,
  studentGpa,
  handleDelete,
}) => {
  const [name, setName] = useState(studentName);
  const [dob, setDob] = useState(studentDob);
  const [contactInfo, setContactInfo] = useState(studentContactInfo);
  const [gpa, setGpa] = useState(studentGpa);

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  function handleEdit(e) {
    setEditMode(!editMode);
    if (name == "") setName(studentName);
    if (dob == "") setDob(studentDob);
    if (contactInfo == "") setContactInfo(studentContactInfo);
    if (gpa == "") setContactInfo(studentContactInfo);
  }

  const handleUpdate = (e) => {
    e.stopPropagation();
    if (
      name != studentName ||
      dob != studentDob ||
      studentContactInfo != contactInfo
    ) {
      updateExistingEntry("/student/", id, {
        studentName: name,
        dateOfBirth: dob,
        contactInfo: contactInfo,
        gpa: gpa,
      });
    }
    handleEdit();
  };

  return (
    <div className="bg-white/20 h-52 rounded overflow-hidden shadow-lg relative">
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/details/student/" + id);
        }}
      >
        Details
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-4 flex items-center">
          <div className="">{id}.&nbsp;</div>
          <div className="flex-1">
            <EditInput
              placeholder={"Enter Name"}
              editMode={editMode}
              handleUpdate={handleUpdate}
              name={name}
              setName={setName}
            ></EditInput>
          </div>
        </div>

        <EditInput
          placeholder={"YYYY-MM-DD"}
          editMode={editMode}
          handleUpdate={handleUpdate}
          name={dob}
          setName={setDob}
        ></EditInput>

        <div className="h-1 my-1"></div>
        <EditInput
          placeholder={"Enter Contact Info"}
          editMode={editMode}
          handleUpdate={handleUpdate}
          name={contactInfo}
          setName={setContactInfo}
        ></EditInput>

        <div className="h-1 my-1"></div>
        <EditInput
          placeholder={"Enter gpa"}
          isNumber={true}
          editMode={editMode}
          handleUpdate={handleUpdate}
          name={gpa}
          setName={setGpa}
        ></EditInput>
      </div>

      <div className="absolute bottom-0 right-0 flex items-center">
        {editMode ? (
          <button
            className="py-0 text-xs rounded-none m-0 w-10 h-8 flex justify-center items-center bg-black/50 bg-green-200 text-black"
            onClick={handleUpdate}
          >
            Done
          </button>
        ) : (
          <button
            className="py-0 text-xs rounded-none m-0 w-10 h-8 flex justify-center items-center bg-black/50"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        {!editMode && (
          <button
            className="px-1 py-0 text-xs rounded-none m-0 w-8 h-8 flex justify-center items-center bg-red-600"
            onClick={() => handleDelete(id)}
          >
            D
          </button>
        )}
      </div>
    </div>
  );
};

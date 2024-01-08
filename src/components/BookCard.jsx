import React, { useState } from "react";
import { EditInput } from "./EditInput";
import { updateExistingEntry } from "../service";

export const CourseCard = ({
  id,
  courseName,
  courseCredit,
  courseCapacity,
  courseDepartment,
  handleDelete,
}) => {
  const [name, setName] = useState(courseName);
  const [credit, setCredit] = useState(courseCredit);
  const [capacity, setCapacity] = useState(courseCapacity);
  const [department, setDepartment] = useState(courseDepartment);

  const [editMode, setEditMode] = useState(false);

  function handleEdit() {
    setEditMode(!editMode);
    if (name == "") setName(courseName);
    if (credit == "") setCredit(courseCredit);
    if (capacity == "") setCapacity(courseCapacity);
    if (department == "") setDepartment(courseDepartment);
  }

  const handleUpdate = () => {
    if (
      name != courseName ||
      credit != courseCredit ||
      capacity != courseCapacity
    ) {
      updateExistingEntry("/course/", id, {
        courseName: name,
        credits: credit,
        capacity: capacity,
        department: department,
      });
    }
    handleEdit();
  };

  return (
    <div className="bg-white/20 h-52 rounded overflow-hidden shadow-lg relative">
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
          placeholder={"Enter credit"}
          editMode={editMode}
          handleUpdate={handleUpdate}
          isNumber={true}
          name={credit}
          setName={setCredit}
        ></EditInput>

        <div className="h-1 my-1"></div>
        <EditInput
          placeholder={"Enter Capacity"}
          editMode={editMode}
          isNumber={true}
          handleUpdate={handleUpdate}
          name={capacity}
          setName={setCapacity}
        ></EditInput>

        <div className="h-1 my-1"></div>
        <EditInput
          placeholder={"Enter Department"}
          editMode={editMode}
          handleUpdate={handleUpdate}
          name={department}
          setName={setDepartment}
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

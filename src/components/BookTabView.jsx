import React, { useEffect, useState } from "react";
import { createNewEntry, deleteEntry, getAllEntry, updateExistingEntry } from "../service";
import { CourseCard } from "./BookCard";

export const BookTabView = () => {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [credit, setCredit] = useState("");
  const [capacity, setCapacity] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    getAllEntry("/course").then((res) => setData(res));
  }, []);


  const handleCreate = () => {

    if (courseName != "" && credit != "" && capacity != "") {
      createNewEntry("/course", {
        courseName: courseName,
        credits: credit,
        capacity: capacity,
        department: department
      }).then((res) => {
        setEditMode(false);
        setCourseName("");
        setCapacity("");
        setCredit("");
        setDepartment("");
        setData((prevData) => [...prevData, res]);
      }
      )
    } else {
      setEditMode(false);
    }
  }

  const handleDelete = (id) => {
    deleteEntry("/course/", id).then(() => {
      setData(prevData => prevData.filter(item => item.id !== id));
    });
  };

  return (
    <div className="w-full h-full transition-all duration-300 rounded-lg">
      {data && data.length == 0 && <div className="text-white">Empty</div>}

      <div className="pt-4 mx-auto flex">
        {data && data.length != 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
            {data.map((el, index) => {

              return (
                <CourseCard
                  key={index}
                  id={el.courseID}
                  courseName={el.courseName}
                  courseCapacity={el.capacity}
                  courseCredit={el.credits}
                  courseDepartment={el.department}
                  handleDelete={handleDelete}
                />
              );
            })}
            <div
              onClick={() => setEditMode(true)}
              className="cursor-pointer relative bg-white/20 h-52 rounded overflow-hidden shadow-lg flex text-white"
            >
              {editMode ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCreate();
                  }}
                  className="w-full px-6 pt-4 flex items-start flex-col z-10"
                >
                  <input
                    placeholder="Enter Course Name"
                    className="w-full p-1 disabled:bg-transparent"
                    autoFocus
                    type="text"
                    value={courseName}
                    onChange={(e) => {
                      e.stopPropagation(); setCourseName(e.target.value);
                    }}
                  />

                  <div className="h-1 mb-1"></div>

                  <input
                    placeholder={"Enter Capacity"}
                    className="w-full p-1 disabled:bg-transparent"
                    type="number"
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                    }}
                  />

                  <div className="h-1 mb-1"></div>

                  <input
                    placeholder="Enter Credits"
                    className="w-full p-1 disabled:bg-transparent"
                    type="number"
                    value={credit}
                    onChange={(e) => {
                      setCredit(e.target.value);
                    }}
                  />
                  <div className="h-1 mb-1"></div>
                  <input
                    placeholder="Enter Department"
                    className="w-full p-1 disabled:bg-transparent"
                    type="text"
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                  />
                </form>
              ) : (
                <div className="text-4xl pb-2 w-full h-full text-center flex justify-center items-center">
                  +
                </div>
              )}
              {editMode && (
                <div className="absolute bottom-0 right-0 flex items-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCreate(); }}
                    className="py-0 text-xs rounded-none m-0 w-10 h-8 flex justify-center items-center bg-black/50 z-10"
                  >
                    Done
                  </button>
                  <button
                    className="py-0 text-xs rounded-none m-0 w-8 h-8 flex justify-center items-center bg-red-600 z-10"
                    onClick={(e) => { e.stopPropagation(); setEditMode(false); }}
                  >
                    D
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

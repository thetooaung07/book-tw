import React, { useEffect, useState } from "react";
import { EditInput } from "../components/EditInput";
import {
  createNewEntry,
  deleteEntry,
  getAllEntry,
  updateExistingEntry,
} from "../service";

export const AuthorsPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getAllEntry("/author").then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  return (
    <div className="overflow-x-auto">
      {data && (
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-900">id</th>
              <th className="px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="px-4 py-2 font-medium text-gray-900">Dob</th>

              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((author) => (
              <AuthorRow
                key={author.authorId}
                authorId={author.authorId}
                authorName={author.authorName}
                authorDob={author.dob}
                setData={setData}
              ></AuthorRow>
            ))}

            <CreateNewAuthor setData={setData}></CreateNewAuthor>
          </tbody>
        </table>
      )}
    </div>
  );
};

export const AuthorRow = ({ authorId, authorName, authorDob, setData }) => {
  const [name, setName] = useState(authorName);
  const [dob, setdob] = useState(authorDob);
  const [edit, setEdit] = useState();

  function handleEdit() {
    setEdit(!edit);
    if (name == "") setName(authorName);
    if (dob == "") setdob(authorDob);
  }

  const handleUpdate = () => {
    updateExistingEntry("/author/", authorId, {
      authorName: name,
      dob: dob,
    });

    handleEdit();
  };

  const handleDelete = () => {
    deleteEntry("/author/", authorId).then((res) =>
      setData((prevData) => prevData.filter((el) => el.id === authorId))
    );
  };

  return (
    <tr>
      <td className="text-left px-4 py-2 font-medium text-gray-900">
        {authorId}
      </td>
      <td className="text-left py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={name}
          setData={setName}
          placeholder={"Enter Author Name"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={dob}
          setData={setdob}
          placeholder={"Enter Dob"}
        ></EditInput>
      </td>

      {/* View */}
      {/*    <td className="text-left px-4 py-2">
        <Link
          to={`/author/${authorId}`}
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          View
        </Link>
      </td> */}
      {/* Edit */}
      <td className="text-left px-4 py-2">
        {!edit && (
          <button
            onClick={() => {
              console.log("edit");
              setEdit(!edit);
            }}
            className="inline-block rounded bg-black/70 px-4 py-2 text-xs font-medium text-white hover:bg-black/80"
          >
            Edit
          </button>
        )}

        {edit && (
          <button
            onClick={() => handleUpdate()}
            className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-800"
          >
            Save
          </button>
        )}
      </td>

      {/* Delete */}
      <td className="text-left px-4 py-2">
        <button
          onClick={() => handleDelete()}
          className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export const CreateNewAuthor = ({ setData }) => {
  const [name, setName] = useState();
  const [dob, setdob] = useState();

  const [edit, setEdit] = useState(true);

  const clearInput = () => {
    setName("");
    setdob("");
  };

  const handleCreate = () => {
    if (name != "" || dob != "") {
      createNewEntry("/author/", {
        authorName: name,
        dob: dob,
      }).then((res) => {
        setData((prevData) => [...prevData, res]);
        clearInput();
      });
    }
  };

  const handleDelete = () => {
    clearInput();
  };

  return (
    <tr>
      <td className="text-left px-4 py-2 font-medium text-gray-900">+</td>
      <td className="text-left py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={name}
          setData={setName}
          placeholder={"Enter New Name"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={dob}
          setData={setdob}
          placeholder={"Enter New dob"}
        ></EditInput>
      </td>

      {/* Edit */}
      <td className="text-left px-4 py-2">
        <button
          onClick={() => handleCreate()}
          className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-800"
        >
          Add
        </button>
      </td>

      {/* Delete */}
      <td className="text-left px-4 py-2">
        <button
          onClick={handleDelete}
          className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
        >
          Clear
        </button>
      </td>
    </tr>
  );
};

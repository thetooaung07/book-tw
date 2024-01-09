import React, { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { EditInput } from "../components/EditInput";
import {
  createNewEntry,
  deleteEntry,
  getAllEntry,
  updateExistingEntry,
} from "../service";

export const ReadersPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getAllEntry("/reader").then((res) => {
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
              <th className="px-4 py-2 font-medium text-gray-900">Contact</th>

              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((reader) => (
              <ReaderRow
                key={reader.readerId}
                readerId={reader.readerId}
                readerName={reader.readerName}
                readerContact={reader.contact}
                setData={setData}
              ></ReaderRow>
            ))}

            <CreateNewReader setData={setData}></CreateNewReader>
          </tbody>
        </table>
      )}
    </div>
  );
};

export const ReaderRow = ({ readerId, readerName, readerContact, setData }) => {
  const [name, setName] = useState(readerName);
  const [contact, setContact] = useState(readerContact);
  const [edit, setEdit] = useState();

  function handleEdit() {
    setEdit(!edit);
    if (name == "") setName(name);
    if (contact == "") setContact(contact);
  }

  const handleUpdate = () => {
    updateExistingEntry("/reader/", readerId, {
      readerName: name,
      contact: contact,
    });

    handleEdit();
  };

  const handleDelete = () => {
    deleteEntry("/reader/", readerId).then((res) =>
      setData((prevData) => prevData.filter((el) => el.id === readerId))
    );
  };

  return (
    <tr>
      <td className="text-left px-4 py-2 font-medium text-gray-900">
        {readerId}
      </td>
      <td className="text-left py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={name}
          setData={setName}
          placeholder={"Enter New Title"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={contact}
          setData={setContact}
          placeholder={"Enter New ISBN"}
        ></EditInput>
      </td>

      {/* View */}
      {/*    <td className="text-left px-4 py-2">
        <Link
          to={`/reader/${readerId}`}
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

export const CreateNewReader = ({ setData }) => {
  const [name, setName] = useState();
  const [contact, setContact] = useState();

  const [edit, setEdit] = useState(true);

  const clearInput = () => {
    setName("");
    setContact("");
  };

  const handleCreate = () => {
    if (name != "" || contact != "") {
      createNewEntry("/reader/", {
        readerName: name,
        contact: contact,
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
          data={contact}
          setData={setContact}
          placeholder={"Enter New Contact"}
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

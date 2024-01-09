import React, { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { EditInput } from "../components/EditInput";
import {
  createNewEntry,
  deleteEntry,
  getAllEntry,
  updateExistingEntry,
} from "../service";

export const BooksPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getAllEntry("/book").then((res) => {
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
              <th className="px-4 py-2 font-medium text-gray-900">Title</th>
              <th className="px-4 py-2 font-medium text-gray-900">ISBN</th>
              <th className="px-4 py-2 font-medium text-gray-900">rating</th>
              <th className="px-4 py-2 font-medium text-gray-900">genre</th>
              <th className="px-4 py-2 font-medium text-gray-900">
                publishYear
              </th>

              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((book) => (
              <BookRow
                key={book.bookId}
                bookId={book.bookId}
                bookTitle={book.bookTitle}
                bookIsbn={book.isbn}
                bookGenre={book.genre}
                bookPubYear={book.publishYear}
                bookRating={book.rating}
                bookFavourites={book.favourites}
                bookReadBy={book.readBy}
                bookWroteBy={book.wroteBy}
                setData={setData}
              ></BookRow>
            ))}

            <CreateNewBook setData={setData}></CreateNewBook>
          </tbody>
        </table>
      )}
    </div>
  );
};

export const BookRow = ({
  bookId,
  bookTitle,
  bookIsbn,
  bookRating,
  bookGenre,
  bookPubYear,
  bookFavourites,
  bookReadBy,
  bookWroteBy,
  setData,
}) => {
  const [title, setTitle] = useState(bookTitle);
  const [isbn, setIsbn] = useState(bookIsbn);
  const [rating, setRating] = useState(bookRating);
  const [genre, setGenre] = useState(bookGenre);
  const [pubYear, setPubYear] = useState(bookPubYear);

  const [edit, setEdit] = useState();

  function handleEdit() {
    setEdit(!edit);
    if (title == "") setTitle(bookTitle);
    if (isbn == "") setIsbn(bookIsbn);
    if (rating == "") setRating(bookRating);
    if (genre == "") setGenre(bookGenre);
    if (pubYear == "") setPubYear(bookPubYear);
  }

  const handleUpdate = () => {
    updateExistingEntry("/book/", bookId, {
      bookTitle: title,
      isbn: isbn,
      genre: genre,
      publishYear: pubYear,
      rating: rating,
      favourites: bookFavourites,
      readBy: bookReadBy,
      wroteBy: bookWroteBy,
    });

    handleEdit();
  };

  const handleDelete = () => {
    deleteEntry("/book/", bookId).then((res) =>
      setData((prevData) => prevData.filter((el) => el.id === bookId))
    );
  };

  return (
    <tr>
      <td className="text-left px-4 py-2 font-medium text-gray-900">
        {bookId}
      </td>
      <td className="text-left py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={title}
          setData={setTitle}
          placeholder={"Enter New Title"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={isbn}
          setData={setIsbn}
          placeholder={"Enter New ISBN"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={rating}
          setData={setRating}
          placeholder={"Enter Rating"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={genre}
          setData={setGenre}
          placeholder={"Enter Genre"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={pubYear}
          setData={setPubYear}
          placeholder={"Enter Year"}
        ></EditInput>
      </td>

      {/* View */}
      <td className="text-left px-4 py-2">
        <Link
          to={`/book/${bookId}`}
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          View
        </Link>
      </td>
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

export const CreateNewBook = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [pubYear, setPubYear] = useState("");

  const [edit, setEdit] = useState(true);

  const clearInput = () => {
    setTitle("");
    setIsbn("");
    setRating("");
    setGenre("");
    setPubYear("");
  };

  const handleCreate = () => {
    if (
      title != "" ||
      isbn != "" ||
      genre != "" ||
      pubYear != "" ||
      rating != ""
    ) {
      createNewEntry("/book/", {
        bookTitle: title,
        isbn: isbn,
        genre: genre,
        publishYear: pubYear,
        rating: rating,
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
          data={title}
          setData={setTitle}
          placeholder={"Enter New Title"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={isbn}
          setData={setIsbn}
          placeholder={"Enter New ISBN"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={rating}
          setData={setRating}
          placeholder={"Enter New Rating"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={genre}
          setData={setGenre}
          placeholder={"Enter New Genre"}
        ></EditInput>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <EditInput
          edit={edit}
          data={pubYear}
          setData={setPubYear}
          placeholder={"Enter New Year"}
        ></EditInput>
      </td>

      <td></td>

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
          onClick={() => handleDelete()}
          className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
        >
          Clear
        </button>
      </td>
    </tr>
  );
};

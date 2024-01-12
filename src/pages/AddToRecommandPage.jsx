import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllEntry,
  getEntryById,
  updateExistingEntry,
  updateReaderRecomm,
} from "../service";

export const AddToRecommandPage = () => {
  const params = useParams();
  const [books, setBooks] = useState();
  const [reader, setReader] = useState();
  const [selectedData, setSelectedData] = useState([]);

  const [showError, setShowError] = useState(false);
  const [initData, setInitData] = useState();

  useEffect(() => {
    getEntryById("/reader/", params.id).then((res) => setReader(res));
    getAllEntry("/book").then((res) => setBooks(res));
  }, [params.id]);

  useEffect(() => {
    if (reader && reader.recommends && books) {
      const commonElements = reader.recommends.filter((readerBook) =>
        books.some((book) => readerBook.bookId === book.bookId)
      );
      setInitData(commonElements);
      setSelectedData(commonElements.map((el) => ({ bookId: el.bookId })));
    }
  }, [reader, books]);

  const addToRecomm = () => {
    console.log("Comm", initData);
    console.log("Selec", selectedData);

    if (
      !initData.every((item) =>
        selectedData.some((otherItem) => otherItem.bookId === item.bookId)
      )
    ) {
      console.log("result", selectedData);

      updateReaderRecomm(
        `/reader/${params.id}/add/recommends`,
        selectedData
      ).catch((error) => {
        setShowError(true);

        setTimeout(() => {
          setShowError(false);
        }, 3000);
      });
    }
  };

  return (
    <div>
      <div className="m-4 font-bold text-2xl">
        Add to Favourite for Reader -{" "}
      </div>
      {books && reader && (
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-900"></th>
              <th className="px-4 py-2 font-medium text-gray-900">id</th>
              <th className="px-4 py-2 font-medium text-gray-900">Title</th>
              <th className="px-4 py-2 font-medium text-gray-900">ISBN</th>
              <th className="px-4 py-2 font-medium text-gray-900">rating</th>
              <th className="px-4 py-2 font-medium text-gray-900">genre</th>
              <th className="px-4 py-2 font-medium text-gray-900">
                publishYear
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {books.map((book) => {
              return (
                <AddToRecommBookRow
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
                  setData={setBooks}
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                ></AddToRecommBookRow>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="w-full flex justify-end px-4 py-2">
        <button
          onClick={() => addToRecomm()}
          className="rounded bg-gray-600 px-6 py-3 text-xs font-medium text-white hover:bg-gray-700"
        >
          Add to Favourite
        </button>
      </div>

      {showError && (
        <div className="bg-red-500 text-white flex justify-center items-center w-screen">
          Max Capacity for add to Favourite - {selectedData.length}/15
        </div>
      )}
    </div>
  );
};

export const AddToRecommBookRow = ({
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
  setSelectedData,
  selectedData,
}) => {
  const handleSelect = () => {
    const bookData = {
      bookId,
      bookTitle,
      bookIsbn,
      bookRating,
      bookGenre,
      bookPubYear,
      bookFavourites,
      bookReadBy,
      bookWroteBy,
    };

    console.log("bookData", bookData);
    setSelectedData((prevData) => {
      const isAlreadySelected = prevData.some((data) => data.bookId === bookId);

      if (isAlreadySelected) {
        return prevData.filter((data) => data.bookId !== bookId);
      } else {
        return [...prevData, { bookId: bookData.bookId }];
      }
    });
  };

  return (
    <tr onClick={() => handleSelect()}>
      <td className="px-4 py-2">
        <label className="sr-only" htmlFor="Row1">
          Row 1
        </label>
        <input
          className="h-5 w-5 rounded border-gray-300"
          type="checkbox"
          id={`Row${bookId}`}
          onChange={() => {}}
          checked={selectedData.find((el) => el.bookId === bookId) ?? false}
        />
      </td>
      <td className="text-left px-4 py-2 font-medium text-gray-900">
        {bookId}
      </td>
      <td className="text-left py-2 text-gray-700">
        <div> {bookTitle}</div>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <div> {bookIsbn}</div>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <div> {bookRating}</div>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <div> {bookGenre}</div>
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        <div> {bookPubYear}</div>
      </td>
    </tr>
  );
};

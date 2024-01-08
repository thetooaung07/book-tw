import React, { useState } from "react";

export const BooksPage = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-center">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              id
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              ISBN
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              rating
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              genre
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              publishYear
            </th>

            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <BookRow
            id={1}
            title={"HP"}
            isbn={1}
            rating={1}
            genre={1}
            pubYear={2022}
          />
          <BookRow
            id={1}
            title={"HP"}
            isbn={1}
            rating={1}
            genre={1}
            pubYear={2022}
          />
          <BookRow
            id={1}
            title={"HP"}
            isbn={1}
            rating={1}
            genre={1}
            pubYear={2022}
          />
          <BookRow
            id={1}
            title={"HP"}
            isbn={1}
            rating={1}
            genre={1}
            pubYear={2022}
          />
        </tbody>
      </table>
    </div>
  );
};

export const BookRow = ({ id, title, isbn, rating, genre, pubYear }) => {
  return (
    <tr>
      <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900">
        {id}
      </td>
      <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
        {title}
      </td>
      <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
        {isbn}
      </td>
      <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
        {rating}
      </td>
      <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
        {genre}
      </td>
      <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
        {pubYear}
      </td>

      {/* View */}
      <td className="whitespace-nowrap text-center px-4 py-2">
        <a
          href="#"
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          View
        </a>
      </td>
      {/* Edit */}
      <td className="whitespace-nowrap text-center px-4 py-2">
        <a
          href="#"
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          View
        </a>
      </td>

      {/* Delete */}
      <td className="whitespace-nowrap text-center px-4 py-2">
        <a
          href="#"
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          View
        </a>
      </td>
    </tr>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEntryById } from "../service";

export const BookDetailsPage = () => {
  const params = useParams();
  const [data, setData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getEntryById("/book/", params.id).then((res) => setData(res));
  }, [params.id]);

  return (
    <div className=" flex justify-center items-center flex-col">
      <div className="my-20 flow-root">
        {data && (
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Id</dt>
              <dd className="text-gray-700 sm:col-span-2">{data.bookId}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Title</dt>
              <dd className="text-gray-700 sm:col-span-2">{data.bookTitle}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">ISBN</dt>
              <dd className="text-gray-700 sm:col-span-2">{data.isbn}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Published Year</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {data.publishYear}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Genre</dt>
              <dd className="text-gray-700 sm:col-span-2">{data.genre}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Rating</dt>
              <dd className="text-gray-700 sm:col-span-2">{data.rating}</dd>
            </div>
           {data.wroteBy && <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Wrote By</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <span className="font-bold"> {data.wroteBy.authorName}</span>
              </dd>
            </div>}
           { data.readBy && <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Read By</dt>
              <dd className="text-gray-700 sm:col-span-2">
                This book is currently read by
                <span className="font-bold"> {data.readBy.length}&nbsp;</span>
                people
              </dd>
            </div>}
           { data.favourites && <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Favourite</dt>
              <dd className="text-gray-700 sm:col-span-2">
                This book is recently favourited by
                <span className="font-bold">
                  &nbsp;{data.favourites.readerName}&nbsp;
                </span>
              </dd>
            </div>}
          </dl>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="flex justify-center items-center bg-blue-600 text-center text-white px-4 py-2 rounded-md w-20"
      >
        Back
      </button>
    </div>
  );
};

import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthorsPage } from "./pages/AuthorsPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { BooksPage } from "./pages/BooksPage";
import { HomePage } from "./pages/HomePage";
import { ReadersPage } from "./pages/ReadersPage";
import { AddToRecommandPage } from "./pages/AddToRecommandPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/books" element={<BooksPage></BooksPage>}></Route>
      <Route
        path="/book/:id"
        element={<BookDetailsPage></BookDetailsPage>}
      ></Route>

      <Route
        path="/reader/:id/books"
        element={<AddToRecommandPage></AddToRecommandPage>}
      ></Route>
      <Route path="/authors" element={<AuthorsPage></AuthorsPage>}></Route>
      <Route path="/readers" element={<ReadersPage></ReadersPage>}></Route>
    </Routes>
  );
}

export default App;

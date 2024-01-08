import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ReadersPage } from "./pages/ReadersPage";
import { HomePage } from "./pages/HomePage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { BooksPage } from "./pages/BooksPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
     <Route path="/books" element={<BooksPage></BooksPage>}></Route>
     <Route path="/authors" element={<AuthorsPage></AuthorsPage>}></Route>
     <Route path="/readers" element={<ReadersPage></ReadersPage>}></Route>
    </Routes>
  );
}

export default App;

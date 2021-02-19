import React from "react";
import { Link } from "react-router-dom";

import BookShelf from "./book-shelf";

const BookList = ({ books, onUpdate }) => {
    const currentlyReading = books.filter(
        (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf
                    heading="Currently Reading"
                    books={currentlyReading}
                    onUpdate={onUpdate}
                />
                <BookShelf
                    heading="Want To Read"
                    books={wantToRead}
                    onUpdate={onUpdate}
                />
                <BookShelf heading="Read" books={read} onUpdate={onUpdate} />
            </div>

            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    );
};

export default BookList;

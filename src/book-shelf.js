import React from "react";
import Book from "./book";

const BookShelf = ({ heading, books, onUpdate }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{heading}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <Book key={book.id} book={book} onUpdate={onUpdate} />
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BookShelf from "./book-shelf";

const BookList = ({ books, shelves, onUpdate }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map((shelf) => {
                    const filteredBooks = books.filter(
                        (relatedBook) => relatedBook.shelf === shelf.id
                    );

                    return (
                        <BookShelf
                            key={shelf.id}
                            title={shelf.title}
                            books={filteredBooks}
                            onUpdate={onUpdate}
                        />
                    );
                })}
            </div>

            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    );
};

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default BookList;

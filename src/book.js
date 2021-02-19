import React from "react";

const Book = ({ book, onUpdate }) => {
    const { title, shelf, authors, imageLinks } = book;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                                imageLinks && imageLinks.thumbnail
                            })`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select
                            value={shelf ? shelf : "none"}
                            onChange={(e) => onUpdate(book, e.target.value)}
                        >
                            <option value="move" disabled>
                                Move to...
                            </option>

                            <option value="currentlyReading">
                                Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors && authors[0]}</div>
            </div>
        </li>
    );
};

export default Book;

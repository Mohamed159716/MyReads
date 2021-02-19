import React from "react";
import PropTypes from "prop-types";

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
                <div className="book-authors">
                    {authors &&
                        authors.map((author, index) => (
                            <span key={index}>
                                {author}
                                <br />
                            </span>
                        ))}
                </div>
            </div>
        </li>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default Book;

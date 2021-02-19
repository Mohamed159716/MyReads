import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import Book from "./book";

class SearchBooks extends Component {
    state = {
        searchBooks: [],
        query: "",
    };

    // Handle change of input search.
    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value }, () => {
            this.handleSearch();
        });
    };

    // Calling back end to bring the data related to search input.
    handleSearch = async () => {
        const query = this.state.query.trim();

        try {
            query &&
                (await BooksAPI.search(query).then((books) =>
                    this.handleShelf(books)
                ));
        } catch (err) {
            console.log(err);
        }
    };

    // Take all search Books and add [shelf] to books that I own.
    handleShelf = (searchBooks) => {
        const books = this.props.books;

        for (const book of books) {
            const oldBook = searchBooks.find(
                (searchBook) => searchBook.id === book.id
            );

            if (oldBook) {
                const index = searchBooks.indexOf(oldBook);
                searchBooks[index] = {
                    ...searchBooks[index],
                    shelf: book.shelf,
                };
            }
        }

        this.setState({ searchBooks });
    };

    // Update the book with a new shelf.
    updateShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf).then(() =>
            this.addShelfToState(book, shelf)
        );
    };

    // Add the shelf key to the Book on the state.
    addShelfToState = (book, shelf) => {
        const searchBooks = this.state.searchBooks;
        const index = searchBooks.indexOf(book);
        searchBooks[index] = { ...searchBooks[index], shelf: shelf };

        this.setState({ searchBooks });
    };

    render() {
        const { searchBooks } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button
                            className="close-search"
                            onClick={this.props.getAllBooks}
                        >
                            Close
                        </button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            name="query"
                            value={this.state.query}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.query && (
                        <ol className="books-grid">
                            {Array.isArray(searchBooks) &&
                                searchBooks.map((searchBook) => (
                                    <Book
                                        key={searchBook.id}
                                        book={searchBook}
                                        onUpdate={this.updateShelf}
                                    />
                                ))}
                        </ol>
                    )}
                </div>
            </div>
        );
    }
}

export default SearchBooks;

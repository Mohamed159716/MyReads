import React from "react";
import { Route } from "react-router-dom";

import "./App.css";

import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./search-books";
import BookList from "./book-list";

class BooksApp extends React.Component {
    state = {
        books: [],
    };

    getAllBooks = async () => {
        await BooksAPI.getAll().then((books) => this.setState({ books }));
    };

    componentDidMount() {
        this.getAllBooks();
    }

    updateShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf);
        this.getAllBooks();
    };

    render() {
        const SHELVES = [
            {
                title: "Currently Reading",
                id: "currentlyReading",
            },
            {
                title: "Want To Read",
                id: "wantToRead",
            },
            {
                title: "Read",
                id: "read",
            },
        ];

        return (
            <div className="app">
                <Route
                    path="/search"
                    component={() => (
                        <SearchBooks
                            books={this.state.books}
                            getAllBooks={this.getAllBooks}
                        />
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <BookList
                            books={this.state.books}
                            shelves={SHELVES}
                            onUpdate={this.updateShelf}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;

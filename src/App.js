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
                            onUpdate={this.updateShelf}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;

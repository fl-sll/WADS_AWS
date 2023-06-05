import React, { useEffect, useState } from "react";
import Footer from './footer'
import Navbar from './navbar'
import BookList from "./Booklist"
import Under from './under';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Bookpage(){
    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(searchValue);
    }
    
    return(
        <div>
            <Navbar page="/dashboard"></Navbar>
            <Under></Under>
            <form onSubmit={handleSubmit} className='searchBar'>
                <p>Search our collections</p>
                <input type='text' placeholder='Search book title' id='searchInput' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
                <button type='submit' className='searchBtn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
            </form>
            <BookList word={search}></BookList>
            <Footer></Footer>
        </div>
    )
}

export default Bookpage;
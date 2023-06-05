import React , {useState, useEffect}  from "react";
import Navbar from "./navbar";
import "../styles/addBook.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddBook(){
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [link, setLink] = useState("");
    const [valid, setValid] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data ={
            id: id,
            title : title,
            author : author,
            link : link
        }
        
        const token = window.localStorage.getItem("access_token");
        axios
            .post(
                `http://127.0.0.1:8000/addBook/${id}`, data ,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })

            .then((response) => {
                setValid(1)
                console.log(response)
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                  navigate("/error")
                } else {
                  console.log(error)
                }
            })
        }

        useEffect(() => {
            const token = window.localStorage.getItem("access_token");
            axios
              .get(`http://localhost:8000/checkAdmin/`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .catch((error) => {
                if (error.response && error.response.status === 403) {
                  navigate("/error")
                } else {
                  console.log(error)
                }
            });
        }, [navigate]);

    return(
        <div>
            <Navbar page="/adminPage"></Navbar>
            <div className="addContainer">
                <h1>Add Book</h1>
                { valid ? (
                    <p className="warning">Book is added to database</p>
                ):(
                    <p className="warning">Error, book is not added to database :(</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <h4>Book ID: </h4>
                        <input type="text" value={id} className="textBox" onChange={(e) => setId(e.target.value)} placeholder="Insert number here"/>
                    </div>
                    <div className="inputContainer">
                        <h4>Title: </h4>
                        <input type="text" value={title} className="textBox" onChange={(e) => setTitle(e.target.value)} placeholder="Insert title here"/>
                    </div>
                    <div className="inputContainer">
                        <h4>Author: </h4>
                        <input type="text" value={author} className="textBox" onChange={(e) => setAuthor(e.target.value)} placeholder="Insert author here"/>
                    </div>
                    {/* <div className="inputContainer">
                        <h4>Image File: </h4>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div> */}
                    <div className="inputContainer">
                        <h4>Link: </h4>
                        <input type="text" value={link} className="textBox" onChange={(e) => setLink(e.target.value)} placeholder="Insert link here"/>
                    </div>
                    <div>
                        <button className="btn" type="submit" value="Upload">+ Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
};


export default AddBook;
import React ,{useState}  from "react";
import Navbar from "./navbar";
import "../styles/addBook.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faHandsHelping } from "@fortawesome/free-solid-svg-icons";

function AddBook(){    
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [file, setFile] = useState("");
    const [valid, setValid] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log("here")
        e.preventDefault();

        const data ={
            id: id,
            title : title,
            author : author,
            file : file
        }
        console.log(file)
        axios
            .post("http://127.0.0.1:8000/addBook", data,  {
                headers:{
                    "accept" : "application/json",
                    "Content-Type": "multipart/form-data"
                }
            })
    
            .then((response) => {
                // window.localStorage.setItem("access_token", response.data.access_token)
                // console.log(response.data.access_token)
                // navigate("/dashboard")
                setValid(1)
                console.log(response)
            })
            .catch(function(error) {
              console.log(error);
            })
    }

    return(
        <div>
            <Navbar></Navbar>
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
                    <div className="inputContainer">
                        <h4>Image File: </h4>
                        <input value={file} type="file" onChange={(e) => setFile(e.target.value)}/>
                    </div>
                    <div>
                        <button className="btn" type="submit" value="Upload">+ Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBook;
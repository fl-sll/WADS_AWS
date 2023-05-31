import React, { Component } from "react";
import axios from "axios";
// import "../styles/images.css"

class Image extends Component {
  state = {
    image: null,
  };

  componentDidMount() {
    axios.get("http://localhost:8000/displayBook").then((response) => {
      this.setState({ image: response.data });
    });
  }

  render() {
    return (
      <img src={this.state.image} />
    );
  }
}

export default Image;
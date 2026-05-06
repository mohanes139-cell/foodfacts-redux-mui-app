import React, { Component } from "react";

class ClassExample extends Component {
  componentDidMount() {
    console.log("Component mounted");
  }

  componentDidUpdate() {
    console.log("Component updated");
  }

  componentWillUnmount() {
    console.log("Component removed");
  }

  render() {
    return <p>This is a class component example.</p>;
  }
}

export default ClassExample;
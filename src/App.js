import React, { Component } from "react";
import Chessboard from "./Chessboard.js";
import "./App.css";

const types = ["pawn", "rook", "knight", "bishop", "queen", "king"];
const [pw, rw, nw, bw, qw, kw] = types.map(type => ({
  piece: type,
  color: "white"
}));
const [pb, rb, nb, bb, qb, kb] = types.map(type => ({
  piece: type,
  color: "black"
}));

class App extends Component {
  state = {
    current: [
      [rb, nb, bb, qb, kb, bb, nb, rb],
      [pb, pb, pb, pb, pb, pb, pb, pb],
      [{}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}],
      [pw, pw, pw, pw, pw, pw, pw, pw],
      [rw, nw, bw, qw, kw, bw, nw, rw]
    ],
    selected: { row: undefined, column: undefined }
  };

  onClick = field => {
    if (
      this.state.selected.row !== undefined &&
      this.state.selected.column !== undefined
    ) {
      const next = this.state.current;
      if (
        field.row !== this.state.selected.row ||
        field.column !== this.state.selected.column
      ) {
        next[field.row][field.column] = this.state.current[
          this.state.selected.row
        ][this.state.selected.column];
        next[this.state.selected.row][this.state.selected.column] = {};
      }
      this.setState({
        current: next,
        selected: { row: undefined, column: undefined }
      });
    } else if (this.state.current[field.row][field.column].piece) {
      this.setState({ selected: { row: field.row, column: field.column } });
    }
  };

  render() {
    const { current, selected } = this.state;
    return (
      <div className="App">
        <Chessboard
          currentState={current}
          selected={selected}
          handleClick={this.onClick}
        />
      </div>
    );
  }
}

export default App;

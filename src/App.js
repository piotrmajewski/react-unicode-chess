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
const initialPosition = [
  [rb, nb, bb, qb, kb, bb, nb, rb],
  [pb, pb, pb, pb, pb, pb, pb, pb],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [pw, pw, pw, pw, pw, pw, pw, pw],
  [rw, nw, bw, qw, kw, bw, nw, rw]
];

class App extends Component {
  state = {
    currentPosition: initialPosition,
    selected: undefined
  };

  onClick = field => {
    if (this.state.selected !== undefined)
    {
      // there is a piece selected previously,
      // so this is an attempt to move it
      if (
        field.row === this.state.selected.row &&
        field.column === this.state.selected.column
      )
      {
        // the selected pieced was clicked again
        // - unselect it
        this.setState({
          selected: undefined
        });
      }
      else
      {
        const nextPosition = this.state.currentPosition;
        // TODO: validate move
        nextPosition[field.row][field.column] = this.state.currentPosition[
          this.state.selected.row
        ][this.state.selected.column];
        nextPosition[this.state.selected.row][this.state.selected.column] = {};
        this.setState({
          currentPosition: nextPosition,
          selected: undefined
        });
      }
    }
    else if (this.state.currentPosition[field.row][field.column].piece) {
      // a clicked piece should be selected
      this.setState({ selected: { row: field.row, column: field.column } });
    }
  };

  render() {
    const { currentPosition, selected } = this.state;
    return (
      <div className="App">
        <Chessboard
          currentPosition={currentPosition}
          selected={selected}
          handleClick={this.onClick}
        />
      </div>
    );
  }
}

export default App;

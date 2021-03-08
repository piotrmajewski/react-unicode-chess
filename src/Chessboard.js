import React from "react";
import "./Chessboard.css";

const Piece = ({ color, type }) => {
  const pieces = {
    black: {
      pawn: "\u265f",
      king: "\u265a",
      knight: "\u265e",
      bishop: "\u265d",
      rook: "\u265c",
      queen: "\u265b"
    },
    white: {
      pawn: "\u2659",
      king: "\u2654",
      knight: "\u2658",
      bishop: "\u2657",
      rook: "\u2656",
      queen: "\u2655"
    }
  };

  return <div className="Piece">{pieces[color][type]}</div>;
};

const Field = ({
  fieldColor,
  content,
  rowNumber,
  columnNumber,
  selected,
  handleClick
}) => (
  <div
    className={rowNumber === selected.row && columnNumber === selected.column
      ? "Field Field_Selected"
      : fieldColor === "black" ? "Field Field_Black" : "Field Field_White"}
    onClick={() => handleClick({ row: rowNumber, column: columnNumber })}
  >
    {content.piece && <Piece color={content.color} type={content.piece} />}
  </div>
);

const Row = ({ row, rowNumber, selected, handleClick }) => (
  <div className="Row">
    {row.map((content, columnNumber) => (
      <Field
        key={columnNumber}
        fieldColor={(rowNumber + columnNumber) % 2 !== 0 ? "black" : "white"}
        content={content}
        rowNumber={rowNumber}
        columnNumber={columnNumber}
        selected={selected}
        handleClick={handleClick}
      />
    ))}
  </div>
);

const Chessboard = ({ currentState, selected, handleClick }) =>
  currentState.map((row, rowNumber) => {
    return (
      <Row
        key={rowNumber}
        row={row}
        rowNumber={rowNumber}
        selected={selected}
        handleClick={handleClick} />
    );
  });

export default Chessboard;

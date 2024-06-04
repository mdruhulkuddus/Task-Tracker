import React from "react";
// confetti effect
import Confetti from "react-confetti";

const PopupMessage = () => {
  return (
    <div className="popup">
      <div className="congratsDiv">
        <span className="congratsMessage">
          <span className="firstParstMessage">Congrats!</span> You have done another task.
        </span>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
};

export default PopupMessage;

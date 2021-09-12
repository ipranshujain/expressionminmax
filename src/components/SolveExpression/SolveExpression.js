import { useState } from "react";
import InputExpression from "./InputExpression";
import OutputExpression from "./OutputExpression";
import "./solveexpression.css";
import { IoInformationCircleSharp } from "react-icons/io5";
export default function SolveExpression() {
  const [expression, setExpression] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div class="exp">
      {/* <span className="info">i</span> */}
      <span className="about">
        Based on Dynamic Programming with time complexity equal to O(n³)
      </span>
      <IoInformationCircleSharp
        className="info"
        onClick={(e) => setShowInfo(!showInfo)}
      />
      {showInfo && (
        <div className="showinfo">
          <div>
            This web page is build on reactjs. The user is required to give an
            expression (which is numbers and operators) and then click on
            evaluate expression after that the algorithm will find the best
            Parenthesization such that expression value we get is maximumm and
            minimum. The algorithm is based on Dynamic Programming concept of
            Matrix Chain Multiplication. Since Dynamic Programming algorithm is
            like 'old is gold' therefore I thought to create this project. The
            time complexity of computation is O(n³).
          </div>
        </div>
      )}
      <InputExpression
        expression={expression}
        showOutput={showOutput}
        setExpression={setExpression}
        setShowOutput={setShowOutput}
      />
      <OutputExpression
        expression={expression}
        showOutput={showOutput}
        setExpression={setExpression}
        setShowOutput={setShowOutput}
      />
      <span className="author">Created By Pranshu Jain</span>
    </div>
  );
}

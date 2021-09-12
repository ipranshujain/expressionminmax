export default function InputExpression({
  expression,
  showOutput,
  setExpression,
  setShowOutput,
}) {
  return (
    <div className="inp">
      <label for="expression">Enter Expression</label>
      <div className="sm">
        (Enter Expression and compute its maximum and mimimum Parenthesization)
      </div>
      <input
        name="expression"
        type="text"
        placeholder="ex. 11+22*3-4*5/2"
        value={expression}
        onChange={(e) => {
          setExpression(e.target.value);
          // setShowOutput(false);
        }}
      />
      <button
        onClick={(e) => {
          setShowOutput(!showOutput);
        }}
      >
        Evaluate Expression
      </button>
    </div>
  );
}

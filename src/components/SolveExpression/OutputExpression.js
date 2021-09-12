import computeExpression from "./computeExpression";

export default function OutputExpression({
  expression,
  showOutput,
  setExpression,
  setShowOutput,
}) {
  if (showOutput) {
    const {
      stat,
      minValue,
      minParenthesization,
      maxValue,
      maxParenthesization,
    } = computeExpression(expression);
    if (stat) {
      return (
        <div className="result">
          <div className="res">
            Mininum value is:{" "}
            <span className="re2">{Number(minValue.toFixed(3))}</span>
          </div>
          <div className="te">Min Parenthesization is:</div>
          <div className="paren">{minParenthesization}</div>
          <div className="res">
            Maximum value is:{" "}
            <span className="re2">{Number(maxValue.toFixed(3))}</span>
          </div>
          <div className="te">Max Parenthesization is:</div>
          <div className="paren">{maxParenthesization}</div>
        </div>
      );
    } else {
      return <div>Expression is not valid.</div>;
    }
  } else {
    return <div>Computed Parenthesization will display here.</div>;
  }
}

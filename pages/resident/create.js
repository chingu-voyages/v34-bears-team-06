import React from "react";

export default function create() {
  const [value, setValue] = React.useState(0);
  const increaseValue = () => setValue(value + 1);

  return (
    <>
      <h1>{value}</h1>
      <button onClick={increaseValue}>Increase value</button>
    </>
  );
}

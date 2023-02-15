import React from "react";
import "./Button.css"

const Button = ({ text, fixTme }) => {
  return <button onClick={fixTme}>{text}</button>;
};

export default Button;

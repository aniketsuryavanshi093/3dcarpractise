import React, { useEffect, useState } from "react";

function useInput() {
  const [Input, setInput] = useState({
    forward: false,
    bakward: false,
    right: false,
    left: false,
    jump: false,
    shift: false,
    flexing: false,
  });
  const keys = {
    KeyW: "forward",
    KeyF: "flexing",
    KeyS: "backward",
    KeyD: "right",
    KeyA: "left",
    Space: "jump",
    ShiftLeft: "shift",
  };
  const findKey = (key) => keys[key];
  useEffect(() => {
    const handleKeydown = (e) => {
      setInput((i) => ({ ...i, [findKey(e.code)]: true }));
    };
    const handleKeyup = (e) => {
      setInput((i) => ({ ...i, [findKey(e.code)]: false }));
    };
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("keydown");
      document.removeEventListener("keyup");
    };
  }, []);

  return Input;
}

export default useInput;

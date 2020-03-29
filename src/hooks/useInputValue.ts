import { useState } from "react";

export const useInputValue = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);
  const [valueRegExp, setValueRegExp] = useState(new RegExp(null));

  return {
    bind: {
      value,
      onChange: (e: any): void => {
        setValue(e.target.value);
        setValueRegExp(new RegExp(`^(.*?)(${e.target.value})(.*)$`, "i"));
      }
    },
    valueRegExp,
    clear: () => {
      setValue("");
      setValueRegExp(new RegExp(null));
    },
    getNormalizedValue: () => value.trim()
  };
};

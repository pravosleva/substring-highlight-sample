import React from "react";
import { escapeRegExpChars } from "../../utils/escape-regexp-chars";

// BAD EXAMPLE

const upperCaseFirstChar = (str: string): string => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export const HighlightedTextV1: React.FC<{
  inputValue: string;
  comparedValue: string;
  // onRemove: any;
}> = props => {
  const { inputValue, comparedValue } = props;
  const escapedInputValue: string = escapeRegExpChars(inputValue);
  const matchExp: RegExp = new RegExp(`${escapedInputValue}`, "i");

  return (
    <span>
      {!!comparedValue.match(matchExp) ? (
        <span>
          {comparedValue.match(matchExp).index > 0 ? (
            <span>
              <span>
                {comparedValue.slice(0, comparedValue.match(matchExp).index)}
              </span>
              <strong>
                {comparedValue.match(matchExp).index === 1
                  ? inputValue
                  : comparedValue[comparedValue.match(matchExp).index - 1] ===
                    " "
                  ? upperCaseFirstChar(inputValue)
                  : inputValue.toLowerCase()}
              </strong>
            </span>
          ) : (
            <strong>
              {inputValue.charAt(0).toUpperCase()}
              {inputValue.slice(1).toLowerCase()}
            </strong>
          )}
          <span>
            {comparedValue.slice(
              comparedValue.match(matchExp).index + inputValue.length
            )}
          </span>
        </span>
      ) : null}
      {!comparedValue.match(matchExp) && <>{comparedValue}</>}
    </span>
  );
};

// const areEqual = (prevProps: any, nextProps: any) => {
//   return prevProps.inputValue === nextProps.inputValue
// }

import React from "react";

// GOOD EXAMPLE

interface Props {
  inputValueRegExp: RegExp;
  comparedValue: string;
  // onRemove: any;
}

export const HighlightedTextV2: React.FC<Props> = props => {
  const { inputValueRegExp, comparedValue } = props;
  const match = comparedValue.match(inputValueRegExp);

  return (
    <div>
      {match && match.length > 0 ? (
        <span>
          {match[1]}
          <strong>{match[2]}</strong>
          {match[3]}
        </span>
      ) : (
        <span>{comparedValue}</span>
      )}
    </div>
  );
};

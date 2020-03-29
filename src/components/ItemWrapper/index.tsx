import React from "react";

// GOOD EXAMPLE

interface Props {
  cityName: string;
  onRemove: any;
}

export const ItemWrapper: React.FC<Props> = props => {
  const { onRemove, children, cityName } = props;

  return (
    <div className="item-wrapper">
      <div>{children}</div>
      <button className="remove-btn" onClick={() => onRemove(cityName)}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

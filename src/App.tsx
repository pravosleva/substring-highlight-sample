import React, { useState } from "react";
import "./App.css";
import { HighlightedTextV1 } from "./components/HighlightedTextV1/index";
import { HighlightedTextV2 } from "./components/HighlightedTextV2/index";
import { ItemWrapper } from "./components/ItemWrapper/index";
import { useInputValue } from "./hooks/useInputValue";

const defaultList = [
  "Москва",
  "Мо",
  "Можайск",
  "Санкт-Петербург",
  "Уфа",
  "Казань",
  "Тверь",
  "Владимир",
  "Нижний Новгород"
];

function App() {
  const [list, setList] = useState(defaultList);
  const input = useInputValue("");
  // NOTE about RegExp:
  // new RegExp(`^(.*?)(${searchValue})(.*)$` лучше заранее перед передачей в массив
  // остальное в компоненте

  const handleAdd = () => {
    const normalizedValue = input.getNormalizedValue();

    if (!!normalizedValue) {
      if (list.includes(normalizedValue)) {
        alert("Такой город есть в списке");
        return;
      }
      setList([...list, normalizedValue]);
      input.clear();
    }
  };
  const handleKeyPress = e => {
    const normalizedValue = input.getNormalizedValue();

    if (e.key === "Enter") {
      if (list.includes(normalizedValue)) {
        alert("Такой город есть в списке");
        return;
      }
      setList([...list, normalizedValue]);
      input.clear();
    }
  };
  // Обработчики, передаваемые вниз, начинаются с "on"
  const onRemove = (name: string): void => {
    setList(list.filter(e => e !== name));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="simple-box">
          <h2>New City</h2>
          <div>
            <div className="inputBox">
              <input
                value={input.bind.value}
                onChange={input.bind.onChange}
                onKeyPress={handleKeyPress}
                id="cityName"
                name="cityName"
              />
              <label htmlFor="cityName">City name</label>
            </div>
            <div className="inputBox">
              <input type="submit" onClick={handleAdd} value="Add to list" />
            </div>
          </div>
        </div>
        <div className="samples-container">
          <div className="sample-list">
            <em className="likeTitle muted">Bad sample</em>
            {list.map((name, i) => (
              <div key={name}>
                <ItemWrapper onRemove={onRemove} cityName={name}>
                  <HighlightedTextV1
                    inputValue={input.bind.value}
                    comparedValue={name}
                  />
                </ItemWrapper>
              </div>
            ))}
          </div>
          <div className="sample-list">
            <em className="likeTitle muted">Good sample</em>
            {list.map((name, i) => (
              <div key={name}>
                <ItemWrapper onRemove={onRemove} cityName={name}>
                  <HighlightedTextV2
                    inputValueRegExp={input.valueRegExp}
                    comparedValue={name}
                  />
                </ItemWrapper>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

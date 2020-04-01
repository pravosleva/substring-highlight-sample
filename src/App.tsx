import React from 'react'
import './App.css'
import { HighlightedTextV1 } from './components/HighlightedTextV1/index'
import { HighlightedTextV2 } from './components/HighlightedTextV2/index'
import { ItemWrapper } from './components/ItemWrapper/index'
import { useInputValue } from './hooks/useInputValue'
import { useSelector, useDispatch } from 'react-redux'
import { addCity, removeCity, showAsyncToast } from './actions'
import { Toaster } from './components/Toaster'

function App() {
  const input = useInputValue('')
  const list: string[] = useSelector((state) => state.citylist)
  const dispatch = useDispatch()
  const handleAdd = (): void => {
    const normalizedValue = input.getNormalizedValue()

    if (!!normalizedValue) {
      if (list.includes(normalizedValue)) {
        dispatch(showAsyncToast({ text: 'Такой город есть в списке', delay: 3000, type: 'warning' }))
        return
      }
      dispatch(addCity(normalizedValue))
      input.clear()
    }
  }
  const handleKeyPress = (e: any): void => {
    if (e.key === 'Enter') handleAdd()
  }
  const handleRemove = (name: string): void => {
    dispatch(removeCity(name))
  }

  return (
    <div className="App">
      <Toaster />
      <header className="App-header">
        <div className="simple-box">
          <h2>New City</h2>
          <div>
            <div className="inputBox">
              <input
                value={input.bind.value}
                onChange={input.bind.onChange}
                onKeyPress={handleKeyPress}
                name="cityName"
                required
                type="text"
              />
              <label htmlFor="cityName">City name</label>
            </div>
            <div className="inputBox">
              <input className="ripple" type="submit" onClick={handleAdd} value="Add to list" />
            </div>
          </div>
        </div>
        <div className="samples-container">
          <div className="sample-list">
            <em className="likeTitle muted">Bad sample</em>
            {list.map((name, i) => (
              <div key={name}>
                <ItemWrapper onRemove={handleRemove} cityName={name}>
                  <HighlightedTextV1 inputValue={input.bind.value} comparedValue={name} />
                </ItemWrapper>
              </div>
            ))}
          </div>
          <div className="sample-list">
            <em className="likeTitle muted">Good sample</em>
            {list.map((name, i) => (
              <div key={name}>
                <ItemWrapper onRemove={handleRemove} cityName={name}>
                  <HighlightedTextV2 inputValueRegExp={input.valueRegExp} comparedValue={name} />
                </ItemWrapper>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  )
}

export default App

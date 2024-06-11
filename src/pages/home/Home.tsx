import React from 'react'
import { HighlightedTextV1 } from './components/HighlightedTextV1'
import { HighlightedTextV2, HighlightedTextV2Provider } from './components/HighlightedTextV2'
import { ItemWrapper } from './components/ItemWrapper'
import { useInputValue } from './hooks/useInputValue'
import { useSelector, useDispatch } from 'react-redux'
import { addCity, removeCity, showAsyncToast } from '../../actions'
import mainStyles from '../../styles/App.module.scss'
import homeStyles from './Home.module.scss'
import cn from 'classnames'
import { RootStateModel } from '../../store/RootStateModel'

export function Home() {
  const input = useInputValue('')
  const list: string[] = useSelector((state: RootStateModel) => state.citylist)
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
    <div className={mainStyles.container}>
      <header className={homeStyles.header}>
        <div className={homeStyles.simpleBox}>
          <h2>New City</h2>
          <div>
            <div className={homeStyles.inputBox}>
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
            <div className={homeStyles.inputBox}>
              <input className="ripple" type="submit" onClick={handleAdd} value="Add to list" />
            </div>
          </div>
        </div>
        <div className={homeStyles['samples-container']}>
          <div className={homeStyles['samples-container__sample-list']}>
            <em className={cn(homeStyles.likeTitle, homeStyles.muted)}>Bad sample</em>
            {list.map((name) => (
              <div key={name} className={homeStyles['samples-container__sample-list__item-wrapper']}>
                <ItemWrapper onRemove={handleRemove} cityName={name}>
                  <HighlightedTextV1 inputValue={input.bind.value} comparedValue={name} />
                </ItemWrapper>
              </div>
            ))}
          </div>
          <div className={homeStyles['samples-container__sample-list']}>
            <em className={cn(homeStyles.likeTitle, homeStyles.muted)}>Good sample</em>
            <HighlightedTextV2Provider value={input.bind.value}>
              {list.map((name) => (
                <div key={name} className={homeStyles['samples-container__sample-list__item-wrapper']}>
                  <ItemWrapper onRemove={handleRemove} cityName={name}>
                    <div>
                      <HighlightedTextV2>{name}</HighlightedTextV2>
                    </div>
                  </ItemWrapper>
                </div>
              ))}
            </HighlightedTextV2Provider>
          </div>
        </div>
      </header>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mainStyles from '../../../styles/App.module.scss'
import { loadReviewItems, UremontReviewModel, resetReviewItems } from '../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { RootStateModel } from '../../../store/RootStateModel'

const getUniqueKey = (review: UremontReviewModel) => {
  return Object.values(review).join('-')
}

export const Reviews = () => {
  const dispatch = useDispatch()
  const reviews: UremontReviewModel[] = useSelector((state: RootStateModel) => state.uremont.reviews.items)
  const isLoading: boolean = useSelector((state: RootStateModel) => state.uremont.reviews.isLoading)
  const [page, setPage] = useState(1)
  const handleScrollToContent = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: window.innerHeight - 100,
      left: 0,
    })
  }

  useEffect(() => {
    dispatch(
      loadReviewItems({
        page,
        review_rating_from: 1,
        review_rating_to: 10,
      })
    )
  }, [page])

  useEffect(() => {
    handleScrollToContent()
    return () => {
      dispatch(resetReviewItems())
    }
  }, [])

  return (
    <div className={mainStyles.container}>
      <header className={mainStyles.header}>
        <div>
          <em>
            Reviews in progress... <strong>{reviews.length}</strong>
          </em>{' '}
          <Link to="/">Go to homepage</Link>
        </div>
      </header>
      <div>
        {reviews.map((e) => (
          <div key={getUniqueKey(e)}>
            {e.customer_name}
            <br />
            {e.text}
          </div>
        ))}
      </div>
      <div>{isLoading ? <div>Loading...</div> : <button onClick={() => setPage(page + 1)}>PAGE++</button>}</div>
    </div>
  )
}

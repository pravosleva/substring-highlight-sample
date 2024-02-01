import React, { useEffect, useState, useCallback } from 'react'
import mainStyles from 'src/styles/App.module.scss'
import { loadReviewItems, UremontReviewModel, resetReviewItems } from 'src/actions'
import { useSelector, useDispatch } from 'react-redux'
import { RootStateModel } from 'src/store/RootStateModel'
import { useInfiniteScroll } from 'react-infinite-scroll-hook'
import { Loader } from 'src/components/Loader'
import { ReviewsItem } from 'src/components/Uremont/ReviewsItem'
import styles from './Reviews.module.scss'

const getUniqueKey = (review: UremontReviewModel): string => {
  const expectedFields = [
    'appearance_rate',
    'cost',
    'create_time',
    'customer_auto',
    'customer_name',
    'final_cost_rate',
    'location_rate',
    'qualification_rate',
    'raiting',
    'repair_quality_rate',
    'text',
  ]
  const values = []

  for (const key in review) {
    if (expectedFields.includes(key)) {
      values.push(review[key])
    }
  }

  return values.join('-')
}

export const Reviews: React.FC = () => {
  const dispatch = useDispatch()
  const reviews: UremontReviewModel[] = useSelector((state: RootStateModel) => state.uremont.reviews.items)
  const pagesCount: number = useSelector((state: RootStateModel) => state.uremont.reviews.pagination.pagesCount)
  const isLoading: boolean = useSelector((state: RootStateModel) => state.uremont.reviews.isLoading)
  const [page, setPage] = useState(1)
  const handleScrollToContent = useCallback((): void => {
    window?.scrollTo({
      behavior: 'smooth',
      top: window.innerHeight - 100,
      left: 0,
    })
  }, [])

  function handleLoadMore(): void {
    if (pagesCount > page) setPage(page + 1)
  }

  const infiniteRef: React.RefObject<HTMLDivElement> = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: pagesCount > page,
    onLoadMore: handleLoadMore,
    scrollContainer: 'window',
  })

  useEffect(() => {
    dispatch(
      loadReviewItems({
        page,
        review_rating_from: 1,
        review_rating_to: 10,
      })
    )
  }, [page, dispatch])

  useEffect(() => {
    handleScrollToContent()
    dispatch(resetReviewItems())
    return () => dispatch(resetReviewItems())
  }, [dispatch, handleScrollToContent])

  return (
    <div className={mainStyles.container} ref={infiniteRef}>
      <header className={mainStyles.header} />
      <div className={styles.wrapper}>
        {reviews.map((e) => (
          <ReviewsItem key={getUniqueKey(e)} item={e} />
        ))}
      </div>
      <div style={{ minHeight: '100px' }}>{<Loader text={page === 1 || isLoading ? 'Loading...' : 'Done.'} />}</div>
    </div>
  )
}

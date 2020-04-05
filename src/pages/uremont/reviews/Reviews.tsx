import React, { useEffect, useState } from 'react'
import mainStyles from '../../../styles/App.module.scss'
import { loadReviewItems, UremontReviewModel, resetReviewItems } from '../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { RootStateModel } from '../../../store/RootStateModel'
import { useInfiniteScroll } from 'react-infinite-scroll-hook'
import { Loader } from '../../../components/Loader'

const getUniqueKey = (review: UremontReviewModel): string => {
  return Object.values(review).join('-')
}

export const Reviews: React.FC = () => {
  const dispatch = useDispatch()
  const reviews: UremontReviewModel[] = useSelector((state: RootStateModel) => state.uremont.reviews.items)
  const pagesCount: number = useSelector((state: RootStateModel) => state.uremont.reviews.pagination.pagesCount)
  const isLoading: boolean = useSelector((state: RootStateModel) => state.uremont.reviews.isLoading)
  const [page, setPage] = useState(1)
  const handleScrollToContent = (): void => {
    window?.scrollTo({
      behavior: 'smooth',
      top: window.innerHeight - 100,
      left: 0,
    })
  }

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
  }, [dispatch])

  return (
    <div className={mainStyles.container} ref={infiniteRef}>
      <header className={mainStyles.header} />
      <div>
        {reviews.map((e) => (
          <div key={getUniqueKey(e)}>
            {e.customer_name}
            <br />
            {e.text}
          </div>
        ))}
      </div>
      <div style={{ minHeight: '100px' }}>{isLoading && <Loader />}</div>
    </div>
  )
}

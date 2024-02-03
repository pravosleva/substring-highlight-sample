import React, { useState, useCallback, memo, useRef, useMemo } from 'react'
import { useWMState } from '@wrap-mutant/react'
import { UremontReviewModel, showAsyncToast } from 'src/actions'
import { ReviewsItem } from 'src/components/Uremont/ReviewsItem'
import { uremontHttpClient } from 'src/utils/experimental-http-client/v1'
import { useDispatch } from 'react-redux'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import classes from './Sample.module.scss'
import { Loader } from 'src/components/Loader'
import { groupLog } from 'src/utils/groupLog'

import { sequence } from 'src/utils/sequence'

const _isDebugEnabled = true
const _customPagesLimit = null as number | null

const reviewID = sequence()

const recordFactory = () => [] as UremontReviewModel[]

type TUremontPagination = {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export const Sample = memo(() => {
  const dispatch = useDispatch()
  const [records, updateRecords] = useWMState(recordFactory, { bind: true })

  const paginationRef = useRef<TUremontPagination>({
    page: 0, // NOTE: Will be mutated

    // NOTE: Reanonly. Controlled on backend anyway =)
    pageSize: 3,
    pagesCount: 10,
    totalCount: 1,
  })

  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)

  const getListPack = useCallback(
    () =>
      uremontHttpClient.getRevewList<{
        ok: boolean
        reviews: UremontReviewModel[]
        pagination: TUremontPagination
      }>({
        isDebugEnabled: _isDebugEnabled,
        body: {
          page: paginationRef.current.page,
          // pageSize: paginationRef.current.pageSize,
        },
        bodyType: 'formdata',
        cb: {
          onFuckup: (res) => {
            setLoading(false)
            groupLog({
              header: 'Request failed',
              argsArr: [res],
            })
            dispatch(
              showAsyncToast({
                type: 'error',
                text: res.message || 'Request failed, see console',
                delay: 10000,
              })
            )
          },
          onSuccess: (res) => {
            setLoading(false)
            const { reviews, pagination } = res
            for (const review of reviews) review.id = reviewID()
            records.push(...reviews)
            updateRecords()
            // @ts-ignore
            for (const key in pagination) if (key !== 'page') paginationRef.current[key] = pagination[key]

            dispatch(
              showAsyncToast({
                type: 'info',
                text: `+${reviews.length} (page ${paginationRef.current.page}; items ${records.length} of ${paginationRef.current.totalCount})`,
                delay: 3000,
              })
            )

            switch (true) {
              case !!_customPagesLimit:
                // @ts-ignore
                if (_customPagesLimit > paginationRef.current.page) paginationRef.current.page += 1
                // else setLoading(false)
                break
              case paginationRef.current.pagesCount > paginationRef.current.page:
                paginationRef.current.page += 1
                break
              default:
                setHasNextPage(false)
                break
            }
          },
        },
      }),
    [records, updateRecords, setLoading, paginationRef, dispatch]
  )

  const startLoading = useCallback(() => {
    if (loading) return
    setLoading(true)
    getListPack()
  }, [setLoading, getListPack])

  const infiniteRef: React.RefObject<HTMLDivElement> = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: startLoading,
    scrollContainer: 'window',
  })

  const updateItem = useCallback((diff: any) => {
    const idx = records.findIndex((e) => e.id === diff.id)
    const item = records[idx]
    records[idx] = { ...item, ...diff }
    updateRecords()
  }, [])

  const renderedRecords = useMemo(() => {
    // console.log('- mem')
    return records.map((item, index) => <ReviewsItem item={item} key={index} updateItem={updateItem} />)
  }, [records])

  return (
    <div className={classes.stackWrapper} ref={infiniteRef}>
      {renderedRecords}
      <div style={{ minHeight: '100px' }}>
        <Loader text={loading ? 'Loading...' : 'Done.'} />
      </div>
    </div>
  )
})
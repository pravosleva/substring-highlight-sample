import React, { useState, useCallback, useLayoutEffect, memo, useRef, useMemo } from 'react'
import { useWMState } from '@wrap-mutant/react'
import { UremontReviewModel, showAsyncToast } from 'src/actions'
import { ReviewsItem } from 'src/components/Uremont/ReviewsItem'
import { uremontHttpClient } from 'src/utils/experimental-http-client/v1'
import { useDispatch } from 'react-redux'
import classes from './Sample.module.scss'
import { Loader } from 'src/components/Loader'
import { groupLog } from 'src/utils/groupLog'

const _isDebugEnabled = true
const _customPagesLimit: number | null = null

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
  const writeRecord = useCallback(
    (record) => {
      records.push(record)
      updateRecords()
    },
    [records, updateRecords]
  )
  const paginationRef = useRef<TUremontPagination>({
    page: 0, // NOTE: Will be mutated

    // NOTE: Reanonly. Controlled on backend anyway =)
    pageSize: 3,
    pagesCount: 0,
    totalCount: 1,
  })
  const [isDone, setIsDone] = useState<boolean>(false)
  const handleDone = useCallback(() => {
    setIsDone(true)
  }, [])

  useLayoutEffect(() => {
    if (isDone) return
    const getListPack = async () =>
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
            const { reviews, pagination } = res
            for (const review of reviews) writeRecord(review)
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
                if (_customPagesLimit > paginationRef.current.page) paginationRef.current.page += 1
                else handleDone()
                break
              case paginationRef.current.pagesCount > paginationRef.current.page:
                paginationRef.current.page += 1
                break
              default:
                handleDone()
                break
            }
          },
        },
      })

    const interval = setInterval(getListPack, 1000)
    return () => clearInterval(interval) // eslint-disable-next-line
  }, [isDone])

  const renderedRecords = useMemo(() => {
    // console.log('- mem')
    return records.map((item, index) => <ReviewsItem item={item} key={index} />)
  }, [records])

  return (
    <div className={classes.stackWrapper}>
      {renderedRecords}
      <div style={{ minHeight: '100px' }}>
        <Loader text={!isDone ? 'Loading...' : 'Done.'} />
      </div>
    </div>
  )
})

import React from 'react'
import { UremontReviewModel } from '../../../../../actions'
import styles from './ReviewsItem.module.scss'

export const ReviewsItem: React.FC<{
  item: UremontReviewModel
}> = ({ item }) => {
  const {
    customer_image,
    customer_name,
    customer_auto,
    rating,
    // location_rate,
    // qualification_rate,
    // appearance_rate,
    // repair_quality_rate,
    // final_cost_rate,
    service,
    cost,
    text,
    // create_time,
  } = item

  return (
    <div className={styles['item-wrapper']}>
      <div className={styles['item-wrapper__header']}>
        <span className={styles['item-wrapper__header__service-name']}>
          Автосервис: <span>{service.name}</span>
        </span>
        <span className={styles['item-wrapper__header__cost-price']}>Стоимость ремонта: {cost} ₽</span>
      </div>
      <div className={styles['item-wrapper__body']}>
        <div className={styles['item-wrapper__body__info']}>
          <div className={styles['item-wrapper__body__info__car-brand-image']}>
            <img
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt="logo"
              src={!!customer_image ? customer_image : 'https://uremont.com/static/img/default-logo.jpg'}
            />
          </div>
          <div className={styles['item-wrapper__body__info__customer']}>
            <div className={styles['item-wrapper__body__info__customer__name']}>{customer_name}</div>
            <div className={styles['item-wrapper__body__info__customer__auto']}>{customer_auto}</div>
          </div>
        </div>
        <div className={styles['item-wrapper__body__rating']}>{rating}</div>
      </div>
      <div className={styles['item-wrapper__footer']}>{text}</div>
    </div>
  )
}

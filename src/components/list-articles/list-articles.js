import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { fetchData } from '../../redux/actions/action-creators'
import ListArticleItem from '../list-article-item/list-article-item'
import Spinner from '../spin-load/spin-load'
import AlertError from '../alert-error/alert-error'
import styles from './list-articles.module.scss'
// import { generateId } from '../../utilities/utilities'

const ListArticles = () => {
  const reducerArticles = useSelector((state) => state.reducerArticles)
  const { articles, articlesCount, error, loading, statusDelete } =
    reducerArticles

  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData(page))
  }, [dispatch, page, statusDelete])
  return (
    <div>
      <main className={styles.main}>
        {error ? <AlertError message={error} /> : null}
        {loading && !error ? <Spinner /> : null}
        <ul className={styles.main__list}>
          {articles.map((el) => {
            // const id = generateId()
            const { slug } = el
            return <ListArticleItem item={el} key={slug} />
          })}
        </ul>
        <div className={styles.main__pagination}>
          <Pagination
            onChange={(value) => setPage(value)}
            defaultCurrent={1}
            current={page}
            defaultPageSize={5}
            pageSize={5}
            total={articlesCount}
            showSizeChanger={false}
          />
        </div>
      </main>
    </div>
  )
}

export default ListArticles

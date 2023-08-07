import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { fetchData } from '../../redux/actions/actionCreators'
import ListArticleItem from '../ListItemArticle/ListItemArticle'
import Spinner from '../SpinnerLoad/SpinnerLoad'
import AlertError from '../AlertError/AlertError'
import styles from './ListArticles.module.scss'

const ListArticles = () => {
  const reducerArticles = useSelector((state) => state.reducerArticles)
  const { articles, articlesCount, error, loading, statusDelete, statusEdit } =
    reducerArticles

  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData(page))
  }, [dispatch, page, statusDelete, statusEdit])

  return (
    <div>
      <main className={styles.main}>
        {error ? <AlertError message={error} /> : null}
        {loading && !error ? <Spinner /> : null}
        <ul className={styles.main__list}>
          {articles.map((el) => {
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

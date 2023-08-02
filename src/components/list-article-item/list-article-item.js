import React, { useEffect /*, useState*/ } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { formatDate, generateId } from '../../utilities/utilities'
import styles from './list-article-item.module.scss'
// import postFavoriteArticle from '../../service/postFavoriteArticle'
import { useDispatch, useSelector } from 'react-redux'
import { likeArticle, unlikeArticle } from '../../redux/actions/action-creators'
// import { likeArticle } from '../../redux/actions/action-creators'
// import unfavoriteArticle from '../../service/deleteFavoriteArticle'

const ItemListArticle = ({ item }) => {
  const {
    author,
    createdAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
  } = item
  const { username, image } = author
  const isLogin = useSelector((state) => state.reducerUser.isLogin)
  // const token = useSelector((state) => state.reducerUser.user.token)
  // const [countLike, setCountLike] = useState(favoritesCount)
  // const [like, setLike] = useState(favorited)
  const dispatch = useDispatch()

  const handleLike = () => {
    !favorited ? dispatch(likeArticle(slug)) : dispatch(unlikeArticle(slug))
  }
  useEffect(() => {
    // if (favorited || !favorited) {
    //   setLike(favorited)
    // }
    // setCountLike(favoritesCount)
  }, [slug, favorited, favoritesCount]) //, favorited, favoritesCount])
  return (
    <li className={styles.li_item}>
      <div className={styles.li_item__box_info}>
        <div className={styles.li_item__box_title}>
          <Link to={`/articles/${slug}`}>
            <h5 className={styles.li_item__title}>{title}</h5>
          </Link>
          <label className={styles.li_item__label_button}>
            <button
              className={
                // styles.li_item__button_like
                favorited
                  ? styles.li_item__button_like_active
                  : styles.li_item__button_like
              }
              disabled={!isLogin ? true : false}
              onClick={() => {
                console.log('Click')
                // likeArticle()
                handleLike()
              }}
            ></button>
            <p className={styles.li_item__counter_like}>{favoritesCount}</p>
          </label>
        </div>
        <div className={styles.li_item__box_tags}>
          {tagList.map((el) => {
            return (
              <p className={styles.li_item__tag} key={generateId()}>
                {el}
              </p>
            )
          })}
        </div>
        <p className={styles.li_item__description}>{description}</p>
      </div>

      <div className={styles.li_item__box_author}>
        <span className={styles.li_item__span_name_date}>
          <p className={styles.li_item__author_name}>{username}</p>
          <p className={styles.li_item__date_created}>
            {formatDate(createdAt)}
          </p>
        </span>
        <img
          className={styles.li_item__author_avatar}
          src={image}
          alt="user avatar"
        />
        <button onClick={() => console.log('Click')}></button>
      </div>
    </li>
  )
}

export default ItemListArticle

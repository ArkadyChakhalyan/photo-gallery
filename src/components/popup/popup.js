import { useRef, useState } from 'react';
import styles from './popup.module.css';

export const Popup = ({ picture, onClose, setPicture, pictures }) => {
    console.log(picture)

    document.body.style.overflow = 'hidden';

    const [likes, setLikes] = useState(0);
    const [likePressed, setLikePressed] = useState(false);
    const [className, setClassName] = useState(styles.like);

    const onLikeClick = () => {
        if (likePressed) {
            setLikePressed(false);
            setLikes(prevState => prevState - 1);
            setClassName(styles.like);
        } else {
            setLikePressed(true);
            setLikes(prevState => prevState + 1);
            setClassName(`${styles.like} ${styles.pressed}`);
        }
    };

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const commentBox = useRef(null);

    const onCommentChange = (e) => {
        setComment(e.target.value);
    };

    const onPostClick = () => {
        if (comment !== '') {
            setComments(prevState => [
                ...prevState,
                comment
            ]);

            setComment('');

            if (commentBox.current) {
                commentBox.current.scrollTo({ behavior: 'smooth', top: 10000 });
            }
        }
    };

    const onDelete = (id) => {
        const idx = comments.findIndex((item, index) => {
            return index === id;
        });

        const newComments = [
            ...comments.slice(0, idx),
            ...comments.slice(idx + 1)
        ]

        setComments(newComments);
    }

    const onLeftClick = () => {
        setPicture(picture - 1);
    };

    const onRightClick = () => {
        setPicture(picture + 1);
    };

    return (
        <div
            onClick={onClose}
            className={styles.bg}
        >
            <div
                className={styles.popup}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.picture}>
                    {
                        picture === 0 ? null :
                            <button
                                className={styles.left}
                                onClick={onLeftClick}
                            >
                                {'<'}
                            </button>
                    }
                    {picture}
                    {
                        picture === pictures.length - 1 ? null :
                            <button
                                className={styles.right}
                                onClick={onRightClick}
                            >
                                {'>'}
                            </button>
                    }
                </div>
                <span className={styles.likes}>
                    <p className={styles.count}>
                        {
                            likes ? likes : 'Be first to like the picture!'
                        }
                    </p>
                    <button
                        className={className}
                        onClick={onLikeClick}
                    >
                        LIKE
                    </button>
                </span>
                {
                    comments.length > 0 ?
                        <ul className={styles.comments} ref={commentBox}>
                            {
                                comments.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <span className={styles.comment}>
                                                <span className={styles.content}>
                                                    <p className={styles.user}>Guest:</p>
                                                    <p className={styles.text}>{item}</p>
                                                </span>
                                                <button
                                                    className={styles.delete}
                                                    onClick={() => onDelete(index)}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        : null
                }
                <span className={styles.textarea}>
                    <button
                        className={styles.post}
                        onClick={onPostClick}
                    >
                        POST
                    </button>
                    <input
                        className={styles.input}
                        onChange={(e) => onCommentChange(e)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onPostClick();
                        }}
                        value={comment}
                        placeholder='Leave a comment...'
                    />
                </span>
                <div>
                </div>
            </div>
        </div>
    );
};
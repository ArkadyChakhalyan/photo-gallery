import { useState } from 'react';
import { pictures } from '../../pictures';
import { GalleryItem } from '../gallery-item/gallery-item';
import { Popup } from '../popup/popup';
import styles from './photo-gallery.module.css';

export const PhotoGallery = () => {

    const [toShow, setToShow] = useState(19);
    const [loading, setLoading] = useState(false);

    const onButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setToShow(prevState => prevState + 20);
        }, 400);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [picture, setPicture] = useState(null);

    const onClose = () => {
        document.body.style.overflow = 'overlay';
        setShowPopup(false);
    };

    const onPictureClick = (item) => {
        setShowPopup(true);
        setPicture(item);
    };

    const popup = showPopup ? <Popup
        onClose={onClose}
        picture={picture}
        pictures={pictures}
        setPicture={(picture) => setPicture(picture)}
    /> : null;

    return (
        <div className={styles.container}>
            {popup}
            <ul className={styles.gallery}>
                {
                    pictures
                        .filter((item, index) => {
                            return index <= toShow
                        })
                        .map((item) => {
                            return (
                                <li
                                    key={item}
                                    onClick={() => onPictureClick(item)}
                                >
                                    <GalleryItem picture={item} />
                                </li>
                            );
                        })
                }
            </ul>
            {
                toShow >= pictures.length - 1 ? null
                    : loading ?
                        <p className={styles.loading}>
                            Loading...
                        </p>
                        :
                        <button
                            className={styles.button}
                            onClick={onButtonClick}
                        >
                            Show more
                        </button>
            }
        </div>

    )
};
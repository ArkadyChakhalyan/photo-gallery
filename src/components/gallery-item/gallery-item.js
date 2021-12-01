import { Fragment } from 'react/cjs/react.production.min';
import styles from './gallery-item.module.css';

export const GalleryItem = ({ picture }) => {

    return (
        <Fragment>            
            <div className={styles.picture}>
                {picture}
            </div>
        </Fragment>
    );
};
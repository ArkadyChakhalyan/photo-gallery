import { Header } from '../header/header';
import { PhotoGallery } from '../photo-gallery/photo-gallery';
import styles from './app.module.css';

export const App = () => {
    return (
        <div className={styles.container}>
            <Header />
            <PhotoGallery />
        </div>
    );
};
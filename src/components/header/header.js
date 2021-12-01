import styles from './header.module.css';

export const Header = () => {
    return (
        <div className={styles.container}>
            <h1
                className={styles.title}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                Photo Gallery
            </h1>
        </div>
    );
};
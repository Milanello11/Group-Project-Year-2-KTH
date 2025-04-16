import React, { useRef } from "react";
import styles from './Home.module.css';
import FestivalBox from "../components/FestivalBox";

const Home = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -900, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 900, behavior: "smooth" });
        }
    };

    return (
        <div>
            <div className={styles.backgroundPicture}></div>
            <div className={styles.contentWrapper}>
                <h2 className={styles.upcomingEventsHeader}>Upcoming Events</h2>
                <div className={styles.scrollContainerWrapper}>
                    <button className={`${styles.scrollButton} ${styles.left}`} onClick={scrollLeft}>
                        &#8249;
                    </button>
                    <div className={styles.scrollContainer} ref={scrollContainerRef}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div className={styles.flexBoxItem} key={index}>
                                <FestivalBox />
                            </div>
                        ))}
                    </div>
                    <button className={`${styles.scrollButton} ${styles.right}`} onClick={scrollRight}>
                        &#8250;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
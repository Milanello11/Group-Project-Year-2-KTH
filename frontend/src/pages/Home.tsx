import styles from './Home.module.css';
import FestivalBox from "../components/FestivalBox";
import React, { useRef, useEffect, useState } from "react";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

const Home = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -900, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 900, behavior: "smooth" });
    };

    const [festivals, setFestivals] = useState<Festival[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/festival/findall')
            .then((response) => response.json())
            .then((data) => setFestivals(data))
            .catch((error) => console.error('Error fetching festivals:', error));
    }, []);

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
                        {festivals.map((festival) => (
                            <div className={styles.flexBoxItem} key={festival.festivalId}>
                                <FestivalBox
                                    festivalId={festival.festivalId}
                                    festivalName={festival.festivalName}
                                    festivalLocation={festival.festivalLocation}
                                    festivalDate={festival.festivalDate}
                                    ticketsLeft={festival.ticketsLeft}
                                />
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

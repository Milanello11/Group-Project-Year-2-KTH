import {useRef, useState, useEffect} from "react";
import styles from './SlidingWindow.module.css';
import FestivalBox from "./FestivalBox";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

export default function SlidingWindow() {
    const [festivals, setFestivals] = useState<Festival[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -900, behavior: "smooth" });
    };
    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 900, behavior: "smooth" });
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/festival/upcoming')
            .then((response) => response.json())
            .then((data) => setFestivals(data))
            .catch((error) => console.error('Error fetching festivals:', error));
    }, []);

    return (
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
    );
};
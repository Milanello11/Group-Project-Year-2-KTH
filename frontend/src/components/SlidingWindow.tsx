import {useState, useRef, useEffect} from "react";
import styles from "./SlidingWindow.module.css";
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

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.offsetWidth / 3;
        container.scrollBy({left: direction * scrollAmount, behavior: "smooth"});
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/festival/upcoming')
            .then((response) => response.json())
            .then((data) => setFestivals(data))
            .catch((error) => console.error('Error fetching festivals:', error));
    }, []);

    return (
        <div className={styles.body}>
            <h2 className={styles.header}>Upcoming Festivals</h2>
            <div className={styles.wrapper}>
                <button onClick={() => scroll(-1)} className={`${styles.arrowButton} ${styles.left}`}>
                    ◀
                </button>
                <div ref={scrollRef} className={styles.container}>
                    {festivals.map((festival) => (
                        <div key={festival.festivalId} className={styles.festivalBoxItem}>
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
                <button
                    onClick={() => scroll(1)}
                    className={`${styles.arrowButton} ${styles.right}`}>
                    ▶
                </button>
            </div>
        </div>
    );
};
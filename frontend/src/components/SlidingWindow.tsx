import {useState, useRef, useEffect} from "react";
import styles from "./SlidingWindow.module.css";
import FestivalBox from "./FestivalBox";
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    imageUrl: string;
};

export default function SlidingWindow() {
    const [festivals, setFestivals] = useState<Festival[]>([]);

    console.log(festivals)

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.offsetWidth / 3;
        container.scrollBy({left: direction * scrollAmount, behavior: "smooth"});
    }

    useEffect(() => {
        fetch(`${process.env["REACT_APP_API_URL"]}/api/festival/upcoming`)
            .then((response) => response.json())
            .then((data) => setFestivals(data))
            .catch((error) => console.error('Error fetching festivals:', error));
    }, []);

    return (
        <div className={styles.body}>
            <h2 className={styles.header}>Upcoming Festivals</h2>
            <div className={styles.wrapper}>
                <button onClick={() => scroll(-1)} className={`${styles.arrowButton} ${styles.left}`}>
                    <ChevronLeft className={styles.chevron} size={48}/>
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
                                imageUrl={festival.imageUrl}
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll(1)}
                    className={`${styles.arrowButton} ${styles.right}`}>
                    <ChevronRight className={styles.chevron} size={48}/>
                </button>
            </div>
        </div>
    );
};
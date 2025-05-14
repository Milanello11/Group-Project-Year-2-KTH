import {useState, useRef, useEffect} from "react";
import styles from "./SlidingWindow.module.css";
import FestivalBox from "./FestivalBox";
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * `SlidingWindow` is a React functional component that displays a horizontally scrollable list of upcoming festivals.
 * It fetches festival data from a database and allows users to scroll through the list using navigation buttons.
 *
 * Features:
 * - Fetches and displays a list of upcoming festivals.
 * - Provides smooth horizontal scrolling with left and right navigation buttons.
 *
 * @author Max Masuch
 * @author Ismail Mohammed
 * @author Johan Karlsson
 * @author Elias Almlöf
 * @author Milan Hatami
 */

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    imageURL: string;
    festivalDescription: string;
};

export default function SlidingWindow() {
    const [festivals, setFestivals] = useState<Festival[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    /**
     * Scrolls the container horizontally by a specified direction.
     *
     * @param {number} direction - The direction to scroll (-1 for left, 1 for right).
     */
    const scroll = (direction: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.offsetWidth / 3;
        container.scrollBy({left: direction * scrollAmount, behavior: "smooth"});
    }

    /**
     * Fetches the list of upcoming festivals from the database.
     */
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
                                imageURL={festival.imageURL}
                                festivalDescription={festival.festivalDescription}
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
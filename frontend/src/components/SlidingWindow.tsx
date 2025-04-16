import React, { useRef } from "react";
import styles from './SlidingWindow.module.css';
import FestivalBox from "./FestivalBox";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

type SlidingWindowProps = {
    festivals: Festival[];
};

const SlidingWindow: React.FC<SlidingWindowProps> = ({ festivals }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -900, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 900, behavior: "smooth" });
    };

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

export default SlidingWindow;
import React from "react";
import FestivalBox from "../components/FestivalBox";
import styles from "./Feed.module.css";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    imageURL: string;
    festivalDescription: string;
};

type FeedProps = {
    festivals: Festival[];
};

export default function Feed({ festivals }: FeedProps) {
    return (
        <div className={styles.background}>
            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {festivals.map((festival) => (
                        <FestivalBox
                            key={festival.festivalId}
                            festivalId={festival.festivalId}
                            festivalName={festival.festivalName}
                            festivalLocation={festival.festivalLocation}
                            festivalDate={festival.festivalDate}
                            ticketsLeft={festival.ticketsLeft}
                            imageURL={festival.imageURL}
                            festivalDescription={festival.festivalDescription}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

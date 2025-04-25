import React from "react";
import FestivalBox from "../components/FestivalBox";
import styles from "./ProfileFeed.module.css";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

type ProfileFeedProps = {
    festivals: Festival[];
};

export default function ProfileFeed({ festivals }: ProfileFeedProps) {
    return (
        <div className={styles.background}>
            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {festivals.length > 0 ? (
                        festivals.slice(0,3).map((festival) => (
                            <FestivalBox
                                key={festival.festivalId}
                                festivalId={festival.festivalId}
                                festivalName={festival.festivalName}
                                festivalLocation={festival.festivalLocation}
                                festivalDate={festival.festivalDate}
                                ticketsLeft={festival.ticketsLeft}
                            />
                        ))
                    ) : (
                        <div>No festivals booked.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

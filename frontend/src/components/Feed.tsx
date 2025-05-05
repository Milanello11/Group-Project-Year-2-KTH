import React, {useState} from "react";
import FestivalBox from "../components/FestivalBox";
import styles from "./Feed.module.css";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

type FeedProps = {
    festivals: Festival[];
    hideBookingButton?: boolean;
};

export default function Feed({ festivals, hideBookingButton }: FeedProps) {
    return (
        <div>
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
                                hideBookingButton={hideBookingButton}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
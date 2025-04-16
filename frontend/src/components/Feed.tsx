import React from "react";
import FestivalBox from "../components/FestivalBox";
import styles from "./Feed.module.css";
import {Flex} from "@chakra-ui/react";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

type FeedProps = {
    festivals: Festival[];
};

export default function Feed({ festivals }: FeedProps) {
    return (
        <div>
            <div className={styles.background}>
                <div className={styles.grid}>
                    {festivals.map((festival) => (
                        <FestivalBox
                            key={festival.festivalId}
                            festivalId={festival.festivalId}
                            festivalName={festival.festivalName}
                            festivalLocation={festival.festivalLocation}
                            festivalDate={festival.festivalDate}
                            ticketsLeft={festival.ticketsLeft}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}

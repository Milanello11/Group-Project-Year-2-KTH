import React from "react";
import FestivalBox from "../components/FestivalBox";
import styles from "./Feed.module.css";
import {Input, InputGroup, NativeSelect} from "@chakra-ui/react"

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

const DomainSelect = () => (
    <NativeSelect.Root size="xs" variant="plain" width="auto" me="-1">
        <NativeSelect.Field defaultValue=".com" fontSize="sm">
            <option value="Artist">Search by Artist</option>
            <option value="Name">Search by Name</option>
            <option value="Date">Search by Date</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
    </NativeSelect.Root>
)

export default function Feed({ festivals }: FeedProps) {
    return (
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

    );
}
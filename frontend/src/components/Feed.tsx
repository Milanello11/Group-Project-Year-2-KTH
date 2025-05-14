import React from "react";
import FestivalBox from "../components/FestivalBox";
import styles from "./Feed.module.css";

/**
 * `Feed` is a React component that displays a grid of `FestivalBoxes´.
 *
 * It receives a list of upcoming festivals as a prop and renders a `FestivalBox` for each.
 * This component is used to show a scrollable feed of festival events. It is used in both home to
 * display all festivals and in profile to display upcoming and past bookings.
 *
 * @param {Festival} props - The `FestivalBox´ information props.
 * @param {FeedProps[]} props.festivals - An array of festival props.
 * @returns {JSX.Element} A grid layout of clickable festival boxes.
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

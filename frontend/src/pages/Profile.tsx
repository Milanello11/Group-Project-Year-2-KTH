import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import stylesFeed from "./Profile.module.css";
import {Expand, Minimize} from "lucide-react";
import Feed from "../components/Feed";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

const Profile: React.FC = () => {
    const userId =  parseInt(localStorage.getItem("userId") as string);

    const [userFestivals, setUserFestivals] = useState<Festival[]>([]);
    const [userValue] = useState("");

    useEffect(() => {
        const fetchUserFestivals = async () => {
            try {
                const url = userValue
                    ? `http://localhost:8080/api/booking/${userId}/${encodeURIComponent(userValue)}`
                    : `http://localhost:8080/api/booking/${userId}`;

                console.log("Fetching from URL:", url);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch festivals");
                }

                const data = await response.json();
                setUserFestivals(data);
            } catch (err) {
                console.error("Failed to fetch user festivals", err);
            }
        };

        fetchUserFestivals();
    }, [userId, userValue]);

    const [showAllUpcoming, setShowAllUpcoming] = useState(false);
    const [showAllPast, setShowAllPast] = useState(false);

    const HandleExpandUpcoming = () => {
        setShowAllUpcoming(true);
    };

    const HandleMinimizeUpcoming = () => {
        setShowAllUpcoming(false);
    };

    const HandleExpandPast = () => {
        setShowAllPast(true);
    };

    const HandleMinimizePast = () => {
        setShowAllPast(false);
    };

    const currentDate = new Date();
    const upcomingFestivals = userFestivals
        .filter(festival => new Date(festival.festivalDate) >= currentDate);
    const displayedUpcoming = showAllUpcoming ? upcomingFestivals : upcomingFestivals.slice(0, 3);

    const pastFestivals = userFestivals
        .filter(festival => new Date(festival.festivalDate) < currentDate);
    const displayedPast = showAllPast ? pastFestivals : pastFestivals.slice(0, 3);

    return (
        <div className={stylesFeed.layout}>
            <div>
                <div className={stylesFeed.header}>
                    <h2 className={styles.upcomingEventsHeader}>My Upcoming Events</h2>
                    {showAllUpcoming ? (
                        <Minimize className={stylesFeed.maximizeIcon} onClick={HandleMinimizeUpcoming} />
                    ) : (
                        <Expand className={stylesFeed.maximizeIcon} onClick={HandleExpandUpcoming} />
                    )}
                </div>
                <Feed festivals={displayedUpcoming} />
            </div>

            <div>
                <div className={stylesFeed.header}>
                    <h2 className={styles.upcomingEventsHeader}>My Past Events</h2>
                    {showAllPast ? (
                        <Minimize className={stylesFeed.maximizeIcon} onClick={HandleMinimizePast} />
                    ) : (
                        <Expand className={stylesFeed.maximizeIcon} onClick={HandleExpandPast} />
                    )}
                </div>
                <Feed festivals={displayedPast} />
                </div>
        </div>
    );
};

export default Profile;

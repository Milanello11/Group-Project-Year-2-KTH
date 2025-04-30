import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import stylesFeed from "./Profile.module.css";
import ProfileFeed from "../components/ProfileFeed";

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

    return (
        <div className={stylesFeed.layout}>
            <h2 className={styles.upcomingEventsHeader}>My Events</h2>
            <ProfileFeed festivals={userFestivals} />
        </div>
    );
};

export default Profile;

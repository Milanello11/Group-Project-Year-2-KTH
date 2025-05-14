import React, {useEffect, useState} from "react";
import styles from "./Home.module.css";
import stylesFeed from "./Profile.module.css";
import {Expand, Minimize} from "lucide-react";
import Feed from "../components/Feed";
import {useCookies} from "react-cookie";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    imageURL: string;
    festivalDescription: string;
};

const Profile: React.FC = () => {
    const [cookies] = useCookies(["userID"]);
    const [userFestivals, setUserFestivals] = useState<Festival[]>([]);
    const [userValue] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchUserFestivals = async () => {
            try {
                const url = userValue
                    ? `${process.env["REACT_APP_API_URL"]}/api/booking/${cookies.userID}/${encodeURIComponent(userValue)}`
                    : `${process.env["REACT_APP_API_URL"]}/api/booking/${cookies.userID}`;

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

        if (cookies.userID) {
            fetchUserFestivals();
        }
    }, [cookies.userID, userValue]);

    const [showAllUpcoming, setShowAllUpcoming] = useState(false);
    const [showAllPast, setShowAllPast] = useState(false);

    const currentDate = new Date();
    const upcomingFestivals = userFestivals
        .filter(festival => new Date(festival.festivalDate) >= currentDate);
    const displayedUpcoming = showAllUpcoming ? upcomingFestivals : upcomingFestivals.slice(0, 3);

    const pastFestivals = userFestivals
        .filter(festival => new Date(festival.festivalDate) < currentDate);
    const displayedPast = showAllPast ? pastFestivals : pastFestivals.slice(0, 3);

    return (
        <div className={stylesFeed.layout}>
            <div className={stylesFeed.profileFeedContainer}>
                <div className={stylesFeed.header}>
                    <h2 className={styles.upcomingEventsHeader}>My Upcoming Events</h2>
                    <div className={stylesFeed.iconWrapper}>
                        <Minimize
                            className={`${stylesFeed.icon} ${showAllUpcoming ? stylesFeed.visible : stylesFeed.hidden}`}
                            onClick={() => setShowAllUpcoming(false)}
                        />
                        <Expand
                            className={`${stylesFeed.icon} ${!showAllUpcoming ? stylesFeed.visible : stylesFeed.hidden}`}
                            onClick={() => setShowAllUpcoming(true)}
                        />
                    </div>
                </div>
                <div className={stylesFeed.profileFeedBox}>
                    <Feed festivals={displayedUpcoming} />
                </div>
            </div>

            <div className={stylesFeed.profileFeedContainer}>
                <div className={stylesFeed.header}>
                    <h2 className={styles.upcomingEventsHeader}>My Past Events</h2>
                    <div className={stylesFeed.iconWrapper}>
                        <Minimize
                            className={`${stylesFeed.icon} ${showAllPast ? stylesFeed.visible : stylesFeed.hidden}`}
                            onClick={() => setShowAllPast(false)}
                        />
                        <Expand
                            className={`${stylesFeed.icon} ${!showAllPast ? stylesFeed.visible : stylesFeed.hidden}`}
                            onClick={() => setShowAllPast(true)}
                        />
                    </div>
                </div>
                <div className={stylesFeed.profileFeedBox}>
                    <Feed festivals={displayedPast}/>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

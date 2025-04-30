import React, { useEffect, useState } from "react";
import styles from './Home.module.css';
import Feed from "../components/Feed"
import SlidingWindow from "../components/SlidingWindow";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};

const Home = () => {
    const [festivals, setFestivals] = useState<Festival[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/festival/findall')
            .then((response) => response.json())
            .then((data) => setFestivals(data))
            .catch((error) => console.error('Error fetching festivals:', error));
    }, []);

    return (
        <div>
            <div className={styles.backgroundPicture}></div>
            <div>
                <SlidingWindow/>
            </div>
            <div className={styles.feed}>
                <Feed festivals={festivals} />
            </div>
        </div>
    );
};

export default Home;
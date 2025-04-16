import React from "react";
import styles from './Home.module.css';
import FestivalBox from "../components/FestivalBox";

const Home = () => {
    return (
        <div className ="background">
            <div className={styles.backgroundPicture}>
            </div>
            <div>
                <FestivalBox />
            </div>
        </div>
    );
}

export default Home;
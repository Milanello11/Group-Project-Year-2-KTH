import React, {useEffect, useState} from "react";
import './Home.css';
import FestivalBox from "../components/FestivalBox";

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
            .then((data) => setFestivals(data.slice(0, 3)))
            .catch((error) => console.error('Error fetching festivals:', error));
    }, []);

    return (
        <div className ="background">
            <div className ="backgroundPicture">
                {festivals.map((festival) => (
                    <FestivalBox
                        festivalId={festival.festivalId}
                        festivalName={festival.festivalName}
                        festivalLocation={festival.festivalLocation}
                        festivalDate= {festival.festivalDate}
                        ticketsLeft = {festival.ticketsLeft}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
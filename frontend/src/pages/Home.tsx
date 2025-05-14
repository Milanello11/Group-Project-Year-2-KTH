import React, { useEffect, useState } from "react";
import styles from './Home.module.css';
import Feed from "../components/Feed";
import SlidingWindow from "../components/SlidingWindow";
import { Input, InputGroup, NativeSelect } from "@chakra-ui/react";

type Festival = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    imageURL: string;
    festivalDescription: string;
};

type DomainSelectProps = {
    searchType: string;
    setSearchType: (value: string) => void;
};

const Home = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('Name');
    const [searchResults, setSearchResults] = useState<Festival[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const url = searchValue
                ? `${process.env["REACT_APP_API_URL"]}/api/festival/findby${searchType.toLowerCase()}/${encodeURIComponent(searchValue)}`
                : `${process.env["REACT_APP_API_URL"]}/api/festival/findall`;

            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            console.error("Search failed", err);
        }
    };

    useEffect(() => {
        fetch(`${process.env["REACT_APP_API_URL"]}/api/festival/findall`)
            .then((response) => response.json())
            .then((data) => setSearchResults(data))
            .catch((error) => console.error('Error fetching festivals:', error));
    }, []);

    return (
        <div>
            <div className={styles.backgroundPicture}></div>
            <SlidingWindow />
            <div className={styles.feed}>
                <h2 className={styles.upcomingEventsHeader}>All Events</h2>
                <div className={styles.searchBarWrapper}>
                    <InputGroup
                        endElement={<DomainSelect searchType={searchType} setSearchType={setSearchType} />}
                    >
                        <Input
                            ps="4.75em"
                            id="homeSearch"
                            pe="0"
                            placeholder="Search"
                            borderColor="black"
                            onChange={handleChange}
                            value={searchValue}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                        />
                    </InputGroup>
                </div>
                <Feed festivals={searchResults} />
            </div>
        </div>
    );
};

export default Home;

const DomainSelect = ({ searchType, setSearchType }: DomainSelectProps) => (
    <NativeSelect.Root size="xs" variant="plain" width="auto" me="-1">
        <NativeSelect.Field value={searchType} onChange={(e) =>
            setSearchType(e.target.value)} fontSize="sm">
            <option value="Name">Search by Festival Name</option>
            <option value="Artist">Search by Artist</option>
            <option value="Date">Search by Date</option>
            <option value="Location">Search by Location</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
    </NativeSelect.Root>
);

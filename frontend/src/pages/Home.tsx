import React, { useEffect, useState } from "react";
import styles from './Home.module.css';
import Feed from "../components/Feed"
import SlidingWindow from "../components/SlidingWindow";
import {Input, InputGroup, NativeSelect} from "@chakra-ui/react";

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
    const [searchType, setSearchType] = useState('artist');
    const [searchResults, setSearchResults] = useState<Festival[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const url = searchValue
                ? `${process.env["REACT_APP_API_URL"]}/api/festival/findby${searchType.toLowerCase()}/${encodeURIComponent(searchValue)}`
                : `${process.env["REACT_APP_API_URL"]}/api/festival/findall`;

            console.log(url);
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
            <div>
                <SlidingWindow/>
            </div>
            <div className={styles.feed}>
                <InputGroup endElement={
                    <DomainSelect
                        searchType={searchType}
                        setSearchType={setSearchType}/>}>
                    <Input ps="4.75em"
                           pe="0"
                           placeholder="Search"
                           borderColor="black"
                           onChange={handleChange}
                           value={searchValue}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   handleSearch();
                               }
                           }}
                    />
                </InputGroup>
                <Feed festivals={searchResults} />
            </div>
        </div>
    );
};

export default Home;

const DomainSelect = ({searchType, setSearchType}: DomainSelectProps) => (
    <NativeSelect.Root size="xs" variant="plain" width="auto" me="-1">
        <NativeSelect.Field value={searchType} onChange={(e) =>
            setSearchType(e.target.value)} fontSize="sm">
            <option value="Artist">Search by Artist</option>
            <option value="Name">Search by Festival Name</option>
            <option value="Date">Search by Date</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
    </NativeSelect.Root>
)
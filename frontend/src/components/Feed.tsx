import React, {useState} from "react";
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

type DomainSelectProps = {
    searchType: string;
    setSearchType: (value: string) => void;
};

export default function Feed({ festivals }: FeedProps) {
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('artist');
    const [searchResults, setSearchResults] = useState<Festival[]>([]);

    const apiUrl = searchValue
        ? `http://localhost:8080/api/festival/findby${searchType.toLowerCase()}/${encodeURIComponent(searchValue)}`
        : 'http://localhost:8080/api/festival/findall';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const url = searchValue
                ? `http://localhost:8080/api/festival/findby${searchType.toLowerCase()}/${encodeURIComponent(searchValue)}`
                : 'http://localhost:8080/api/festival/findall';

            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            console.error("Search failed", err);
        }
    };

    return (
        <div>
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
            <div className={styles.background}>
                <div className={styles.gridWrapper}>
                    <div className={styles.grid}>
                        {(searchResults.length > 0 ? searchResults : festivals).map((festival) => (
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
            </div>
        </div>
    );
}


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
import styles from "./Admin.module.css"
import {Button, Field, Fieldset, HStack, Input, Stack, Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";

type Artist = {
    artist_name: string;
    age : number
}

type Festival = {
    festivalDate: string;
    festivalLocation: string;
    festivalName: string;
    ticketsLeft: number;
    festivalDescription: string;
    imageURL: string;
    artists: Artist[];
}

const Admin = () => {
    const [adminView , setAdminView] = useState<string|null>(null);
    const [artistSearchResult, setArtistSearchResult] = useState<Artist|null>(null);
    const [searchValue , setSearchValue] = useState('');
    const [inputValue , setInputValue] = useState('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);

    const [festivalInput, setFestivalInput] = useState<Festival>({
        festivalName: '',
        festivalLocation: '',
        festivalDate: '',
        festivalDescription: '',
        imageURL: '',
        ticketsLeft: 0,
        artists: []
    });
    const [artist, setArtist] = useState<Artist>({
       artist_name: '',
        age: 0
    });
    const [artistExists , setArtistExists] = useState<boolean|null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/artist/findall`);
                const data = await response.json();
                setArtists(data);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };
        fetchArtists();
    }, []);

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedNames = Array.from(e.target.selectedOptions, option => option.value);
        const selectedArtists = artists.filter(artist => selectedNames.includes(artist.artist_name));
        setSelectedArtists(selectedArtists);
        console.log("Selected Artists:", selectedArtists);
    };

    const showAdminView = (fieldSet : string) => {
        setSearchValue('');
        setArtistSearchResult(null);
        setAdminView(fieldSet);
    }

    const handleArtistSearch = async () => {
        try {
            if(searchValue !== ""){
                const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/artist/getbyname/${searchValue}`);
                if (response.ok){
                    const text = await response.text();
                    const data = text ? JSON.parse(text) : null;
                    if (data === null) {
                        setArtistSearchResult(null);
                    } else{
                        setArtistSearchResult(data);
                    }
                } else {
                    setArtistSearchResult(null);
                }

            } else {
                setArtistSearchResult(null);
            }
        } catch (error){
            console.log(error);
        }
    }

    const handleUpdateArtist = async () => {
        if(inputValue !== ""){
            await fetch(
                `${process.env["REACT_APP_API_URL"]}/api/artist/updateage/`,{
                    method:"PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({
                        artist_name: artistSearchResult?.artist_name,
                        age: inputValue
                    })
                }
            );
        }
    }

    const handleAddFestival = async () => {
        const body: Festival = {
            ...festivalInput,
            imageURL: "/images/catRave.png",
            artists: selectedArtists,
        };

        await fetch(
            `${process.env["REACT_APP_API_URL"]}/api/festival/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );
    };

    const handleDeleteArtist = async() => {
        try {
            if(artistSearchResult?.artist_name !== ''){
                await fetch(`${process.env["REACT_APP_API_URL"]}/api/artist/delete/${artistSearchResult?.artist_name}`,{
                    method: "DELETE"
                });
            }
        } catch (e){
            console.log(e);
        }
    }

    const handleAddArtist = async() => {
        try{
            const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/artist/exist/${artist.artist_name}`);
            const artistExists = await response.json();
            if(!artistExists){
                await fetch(`${process.env["REACT_APP_API_URL"]}/api/artist/save`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({
                        artist_name: artist.artist_name,
                        age: artist.age
                    })
                });
                setArtistExists(false);
            } else {
                setArtistExists(true);
            }
        } catch (e){
            console.log(e);
        }
    }

    return (
        <div className={styles.adminContainer}>
            <HStack align="center" gap="6">
                <Button className={styles.singleButton} onClick={()=> showAdminView("addArtist")}>Add artist </Button>
                <Button className={styles.singleButton} onClick={()=> showAdminView("updateArtist")}>Update artist </Button>
                <Button className={styles.singleButton} onClick={()=> showAdminView("deleteArtist")}>Delete artist </Button>
                <Button className={styles.singleButton} onClick={()=> showAdminView("addFestival")}>Add festival </Button>
                <Button className={styles.singleButton} onClick={()=> showAdminView("updateFestival")}>Update festival </Button>
                <Button className={styles.singleButton} onClick={()=> showAdminView("deleteFestival")}>Delete festival </Button>

            </HStack>

            {adminView === 'addArtist' && (
                <Fieldset.Root className={styles.fieldSetStyle}>
                    <Stack>
                        <Fieldset.Legend>Add artist</Fieldset.Legend>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root required>
                            <Field.Label>
                                Name
                                <Field.RequiredIndicator/>
                            </Field.Label>
                            <Input  className={styles.inputStyle}
                                    value={artist.artist_name}
                                    onChange={(e)=>
                                        setArtist(prev => ({...prev, artist_name: e.target.value}))
                            }/>
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                Age
                                <Field.RequiredIndicator/>
                            </Field.Label>
                            <Input  className={styles.inputStyle}
                                    onChange={(e)=>
                                        setArtist(prev =>({...prev, age: Number(e.target.value)}))
                            }/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}
                            onClick={handleAddArtist}
                    >Enter</Button>
                    <Field.Root>
                        {artistExists === true &&(
                            <Field.Label>Artist already exist</Field.Label> 
                        )}
                        {artistExists === false &&(
                            <Field.Label>Added</Field.Label>
                        )}

                    </Field.Root>
                </Fieldset.Root>
            )}

            {adminView === 'updateArtist' && (
                <Fieldset.Root className={styles.fieldSetStyle}>
                    <Stack>
                        <Fieldset.Legend>Update artist</Fieldset.Legend>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Search</Field.Label>
                            <Input  className={styles.inputStyle}
                                    value={searchValue}
                                    onChange={(e)=>setSearchValue(e.target.value)}/>
                        </Field.Root>
                        <Button className={styles.enterButton}
                                onClick={handleArtistSearch}
                        >Enter</Button>
                        <Field.Root>
                            {artistSearchResult == null && (
                                <Field.Label>No artist found (Try adding new)</Field.Label>
                                )
                            }
                            {artistSearchResult !== null && (
                                <Field.Label>Artist: {artistSearchResult?.artist_name} Age: {artistSearchResult?.age}</Field.Label>
                                )
                            }
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New age</Field.Label>
                            <Input  className={styles.inputStyle}
                                    value={inputValue}
                                    onChange={(e)=> setInputValue(e.target.value)}/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}
                            onClick={handleUpdateArtist}
                    >Enter</Button>
                </Fieldset.Root>
                )
            }

            {adminView === 'deleteArtist' && (
                <Fieldset.Root className={styles.fieldSetStyle}>
                    <Stack>
                        <Fieldset.Legend>Delete artist</Fieldset.Legend>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Search</Field.Label>
                            <Input className={styles.inputStyle}
                                   value={searchValue}
                                   onChange={(e)=> setSearchValue(e.target.value)}/>
                        </Field.Root>
                        <Button className={styles.enterButton}
                                onClick={handleArtistSearch}
                        >Enter</Button>
                        <Field.Root>
                            <Field.Label>
                                {artistSearchResult == null && (
                                    <Field.Label>No artist found (Try adding new)</Field.Label>
                                )
                                }
                                {artistSearchResult !== null && (
                                    <Field.Label>Artist: {artistSearchResult?.artist_name} Age: {artistSearchResult?.age}</Field.Label>
                                )
                                }
                            </Field.Label>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}
                            onClick={handleDeleteArtist}
                    >Delete</Button>
                </Fieldset.Root>
                )
            }

            {adminView === 'addFestival' && (
                <Fieldset.Root className={styles.fieldSetStyle}>
                    <Stack>
                        <Fieldset.Legend>Add festival</Fieldset.Legend>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input className={styles.inputStyle} onChange={(e)=>
                                setFestivalInput(prev => ({ ...prev, festivalName: e.target.value }))
                            }/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Location</Field.Label>
                            <Input className={styles.inputStyle} onChange={(e) =>
                                setFestivalInput(prev => ({ ...prev, festivalLocation: e.target.value }))
                            }/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Date</Field.Label>
                            <Input className={styles.inputStyle} onChange={(e) =>
                                setFestivalInput(prev => ({ ...prev, festivalDate: e.target.value }))
                            }/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Artist</Field.Label>
                            <Box>
                                <select multiple onChange={handleSelectionChange} style={{ height: "100px" }}>
                                    {artists.map((artist, index) => (
                                        <option key={index} value={artist.artist_name}>
                                            {artist.artist_name}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                            <div>
                                <p>Selected Artists: {selectedArtists.map(a => a.artist_name).join(", ")}</p>
                            </div>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Number of tickets</Field.Label>
                            <Input className={styles.inputStyle}
                                   onChange={(e)=>
                                       setFestivalInput(prev => ({...prev, ticketsLeft: Number(e.target.value)}))
                            }/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Description</Field.Label>
                            <Input className={styles.inputStyle}
                                   onChange={(e)=>
                                       festivalInput.festivalDescription=e.target.value}/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton} onClick={handleAddFestival}>Enter</Button>
                </Fieldset.Root>
                )
            }

            {adminView === 'updateFestival' && (
                <Fieldset.Root className={styles.fieldSetStyle}>
                    <Stack>
                        <Fieldset.Legend>Update festival</Fieldset.Legend>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Search (Festival name)</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Button className={styles.enterButton}>Enter</Button>
                        <Field.Root>
                            <Field.Label>No festival found (Try adding new)</Field.Label>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Artist list</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New description</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}>Enter</Button>
                </Fieldset.Root>
                )
            }

            {adminView === 'deleteFestival' && (
                <Fieldset.Root className={styles.fieldSetStyle}>
                    <Stack>
                        <Fieldset.Legend>Update festival</Fieldset.Legend>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Search (Festival name)</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Button className={styles.enterButton}>Enter</Button>
                        <Field.Root>
                            <Field.Label>No festival found</Field.Label>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Festival Id to remove</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}>Delete</Button>
                </Fieldset.Root>

                )
            }

        </div>
    )
}

export default Admin;
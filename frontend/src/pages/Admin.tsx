import styles from "./Admin.module.css"
import {Button, Field, Fieldset, HStack, Input, Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

type Artist = {
    artist_name: string;
    age : number
}

const Admin = () => {
    const [adminView , setAdminView] = useState<string|null>(null);
    const [artistSearchResult, setArtistSearchResult] = useState<Artist|null>(null);
    const [searchValue , setSearchValue] = useState('');
    const [inputValue , setInputValue] = useState('');
    const [saveArtistName , setSaveArtistName] = useState('');
    const [saveArtistAge , setSaveArtistAge] = useState('');
    const [artistExists , setArtistExists] = useState<boolean|null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const handleSaveArtist = async() => {
        try{
            const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/artist/exist/${saveArtistName}`);
            const artistExists = await response.json();
            if(!artistExists){
                await fetch(`${process.env["REACT_APP_API_URL"]}/api/artist/save`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({
                        artist_name: saveArtistName,
                        age: saveArtistAge
                    })
                });
                setArtistExists(false);
            } else {
                setArtistExists(true);
            }

        } catch (e){
            console.log(e);
        }
        console.log("Name: " + saveArtistName + " Age: " + saveArtistAge);
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
                                    value={saveArtistName}
                                    onChange={(e)=>setSaveArtistName(e.target.value)}
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                Age
                                <Field.RequiredIndicator/>
                            </Field.Label>
                            <Input  className={styles.inputStyle}
                                    value={saveArtistAge}
                                    onChange={(e)=>setSaveArtistAge(e.target.value)}
                            />
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}
                            onClick={handleSaveArtist}
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
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Location</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Date</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Artist</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Description</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}>Enter</Button>
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
import styles from "./Admin.module.css"
import {Button, Field, Fieldset, HStack, Input, Stack} from "@chakra-ui/react";
import {useState} from "react";

const Admin = () => {
    const [adminView , setAdminView] = useState<string|null>(null);

    const showAdminView = (fieldSet : string) => {
        setAdminView(fieldSet);
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
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Age</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}>Enter</Button>
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
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Button className={styles.enterButton}>Enter</Button>
                        <Field.Root>
                            <Field.Label>No artist found</Field.Label>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New name</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New age</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}>Enter</Button>
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
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Button className={styles.enterButton}>Enter</Button>
                        <Field.Root>
                            <Field.Label>No artist found</Field.Label>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button className={styles.enterButton}>Delete</Button>
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
                            <Field.Label>No festival found</Field.Label>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New name</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New location</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New date</Field.Label>
                            <Input className={styles.inputStyle}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>New artist</Field.Label>
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
import {Flex, Box, Spacer} from "@chakra-ui/react";

export default function NavBar() {
    return (
        <Flex bg="gray.300" opacity="0.8">
            <Box w="150px" h="50px" bg="red"> Logo</Box>
            <Spacer></Spacer>
            <Box w="150px" h="50px" bg="blue"> Home</Box>
            <Box w="150px" h="50px" bg="green"> About Us</Box>
            <Box w="150px" h="50px" bg="yellow"> Avatar</Box>
        </Flex>
    )
}

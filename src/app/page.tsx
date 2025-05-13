'use client';

import {Box, Flex, Heading, Text} from "@chakra-ui/react";

export default function Page() {

    return (
        <Box>
            <Flex
                justifyContent="center"
                alignItems="center"
                height="100vh"
                flexDirection="column"
            >
                <Heading as="h1" size="2xl" mb={4}>
                    Welcome to the App!
                </Heading>
                <Text fontSize="xl">
                    This is a simple example of a Chakra UI page.
                </Text>
            </Flex>
        </Box>
    );
}
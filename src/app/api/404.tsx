import { Box, Center } from '@chakra-ui/react';

export default function NotFound() {
    return (
        <Box h="full">
            <Center>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                    bg="primary"
                >
                    <Box fontSize="2xl" fontWeight="bold">
                        404 - Page Not Found
                    </Box>
                    <Box fontSize="lg">
                        The page you are looking for does not exist.
                    </Box>
                </Box>
            </Center>
        </Box>
    );
}

import { Box, Flex, Portal, Spinner } from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';

// DO NOT USE IN NAVBAR! PRODUCES CIRCULAR RENDER
export default function Loading({
    loadingButtons,
}: {
    loadingButtons?: boolean;
}) {
    return (
        <Portal>
            <Box bg="primary" h="100vh">
                <Navbar withHome withProfile loadingButtons={loadingButtons} />
                <Flex
                    justifyContent="center"
                    height="100vh"
                    alignItems="center"
                >
                    <Spinner size="xl" />
                </Flex>
            </Box>
        </Portal>
    );
}

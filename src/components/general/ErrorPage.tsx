import Navbar from '@/components/nav/Navbar';
import { Box } from '@chakra-ui/react';
import Card from '@/components/general/Card';

export default function ErrorPage({ error }: { error: Error }) {
    return (
        <Box>
            <Navbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bg="primary"
            >
                <Card>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={4}
                    >
                        <Box fontSize="2xl" fontWeight="bold">
                            {error.message}
                        </Box>
                        <Box fontSize="lg">
                            Please try again later or contact support.
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}

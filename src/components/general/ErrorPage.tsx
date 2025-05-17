import Navbar from '@/components/nav/Navbar';
import { Box } from '@chakra-ui/react';
import Card from '@/components/general/Card';
import { ApiError } from '@/helpers/api';

export default function ErrorPage({ error }: { error: ApiError }) {
    return (
        <Box>
            <Navbar isLogged={true} withHome withDashboard />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bg="primary"
            >
                <Card w="max-content">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={4}
                    >
                        <Box fontSize="2xl" fontWeight="bold">
                            {error.name}
                        </Box>
                        <Box fontSize="lg">{error.message}</Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}

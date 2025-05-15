import { Box } from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import { useGetDatabase } from '@/helpers/databases';

export default function DatabasePage() {
    const rqDatabase = useGetDatabase();
    return (
        <Box>
            <Navbar withHome withDashboard withProfile />f
        </Box>
    );
}

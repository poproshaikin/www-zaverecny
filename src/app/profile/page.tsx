import Navbar from '@/components/nav/Navbar';
import { Box } from '@chakra-ui/react';

export default function Profile() {
    return (
        <Box>
            <Navbar withDashboard withHome isLogged />
        </Box>
    );
}

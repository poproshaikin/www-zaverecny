import { Box } from '@chakra-ui/react'
import Navbar from '@/components/nav/Navbar'
import { useLoggedUser } from '@/helpers/users'
import { useGetDatabases } from '@/helpers/databases'

export default function Dashboard() {
    const userDatabases = useGetDatabases()

    return (
        <Box bg="primary" h="100vh">
            <Navbar withHome withProfile />
        </Box>
    )
}

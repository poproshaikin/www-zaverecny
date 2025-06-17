'use client';

import { Box, Flex, Heading } from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import Card from '@/components/general/Card';
import { VirtualDb } from '@/types/db/database';

export default function DatabasePage({
    db,
    tables,
}: {
    db: VirtualDb;
    tables: string[];
}) {
    return (
        <Box>
            <Navbar withHome withDashboard withProfile isLogged />
            <Flex height="100vh" direction="column" justifyContent="center">
                <Box>
                    <Card ml={12} p={4}>
                        <Heading>{db.name}</Heading>
                        <Flex direction="column" gap={4} mt={4}></Flex>
                    </Card>
                </Box>
            </Flex>
        </Box>
    );
}

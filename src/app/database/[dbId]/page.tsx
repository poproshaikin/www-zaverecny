'use client';

import { Box, Flex, Heading, Separator } from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import { useGetDatabase } from '@/helpers/databases';
import { useEffect, useState } from 'react';
import { VirtualDb } from '@/types/db/database';
import Loading from '@/components/general/Loading';
import { useParams } from 'next/navigation';
import Card from '@/components/general/Card';

export default function DatabasePage() {
    const { dbId } = useParams();
    const [db, setDb] = useState<VirtualDb | null | Error>(null);
    const rqDatabase = useGetDatabase();
    useEffect(() => {
        rqDatabase.mutateAsync(
            { route: { dbId: dbId as string } },
            {
                onSuccess: (result) => {
                    setDb(result);
                },
                onError: (error) => {
                    console.error('Error fetching database:', error);
                    setDb(error);
                },
            },
        );
    }, []);

    if (rqDatabase.isPending || !db || db instanceof Error) {
        return <Loading loadingButtons />;
    }

    return (
        <Box>
            <Navbar withHome withDashboard withProfile isLogged />
            <Flex height="100vh" direction="column" justifyContent="center">
                <Box>
                    <Card p={4}>
                        <Heading>{db.name}</Heading>
                        <Flex direction="column" gap={4} mt={4}></Flex>
                    </Card>
                </Box>
            </Flex>
        </Box>
    );
}

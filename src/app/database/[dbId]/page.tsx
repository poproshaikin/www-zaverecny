'use client';

import { Box, Flex, Heading, Separator } from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import { useGetDatabase } from '@/helpers/databases';
import { VirtualDb } from '@/types/db/database';
import Loading from '@/components/general/Loading';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/general/Card';
import { useEnsureLoggedInOrRedirect, useEnsureToken } from '@/helpers/auth';
import ErrorPage from '@/components/general/ErrorPage';
import { ApiError } from '@/helpers/api';

export default function DatabasePage() {
    const { isLogged, isLoggingPending } = useEnsureLoggedInOrRedirect();

    const { dbId } = useParams();
    const rqDatabase = useGetDatabase(dbId as string);

    if (rqDatabase.isPending || isLoggingPending) {
        return <Loading loadingButtons />;
    }

    if (rqDatabase.isError) {
        return <ErrorPage error={rqDatabase.error as ApiError} />;
    }

    const db: VirtualDb = rqDatabase.data.data;

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

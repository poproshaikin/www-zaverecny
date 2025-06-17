'use client';

import {
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    Icon,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import { useGetDatabases } from '@/helpers/databases';
import Card from '@/components/general/Card';
import { TbDatabaseOff } from 'react-icons/tb';
import Button from '@/components/general/Button';
import { GoPlus } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/general/Loading';
import ErrorPage from '@/components/general/ErrorPage';
import ClickableCard from '@/components/general/ClickableCard';
import { useEnsureLoggedInOrRedirect } from '@/helpers/auth';
import { VirtualDb } from '@/types/db/database';
import { ApiError } from '@/helpers/api';

export default function Dashboard() {
    const { isLogged, isLoggingPending } = useEnsureLoggedInOrRedirect();

    const router = useRouter();

    const rqUserDatabases = useGetDatabases();

    if (rqUserDatabases.isLoading || isLoggingPending) {
        return <LoadingPage />;
    }
    if (rqUserDatabases.isError) {
        return <ErrorPage error={rqUserDatabases.error as ApiError} />;
    }

    const databases: VirtualDb[] = rqUserDatabases.data!.data;

    return (
        <Box>
            <Navbar withHome withProfile isLogged={true} />
            <Flex justifyContent="center" height="100vh" alignItems="center">
                <Flex h="50vh" w="50vw" mr="10vw" direction="column">
                    <Box w="40%" mb={8}>
                        <Heading fontSize="2xl" fontWeight="bold">
                            Your databases
                        </Heading>
                        <Text mt={2} fontSize="md">
                            We won't steal your data,{' '}
                            <strong>we promise</strong>.
                        </Text>
                        <Button
                            onClick={() => router.push('database/new')}
                            w="max-content"
                            my={6}
                            fontSize="sm"
                        >
                            <Icon as={GoPlus} boxSize={6} color="green.400" />
                            New
                        </Button>
                    </Box>
                    {databases.length === 0 ? (
                        <Card>
                            <Flex direction="column" gap={10}>
                                <Center w="full">
                                    <Icon
                                        as={TbDatabaseOff}
                                        boxSize={16}
                                        color="gray.500"
                                    />
                                </Center>
                                <Heading fontWeight="bold" fontSize="2xl">
                                    Empty :((
                                </Heading>
                                <Text fontWeight="semibold">
                                    Create a new database to get started.
                                </Text>
                                <Button
                                    onClick={() => router.push('/database/new')}
                                >
                                    Create
                                </Button>
                            </Flex>
                        </Card>
                    ) : (
                        <HStack w="60vw" flexWrap="wrap" gap={4}>
                            {databases.map((database) => (
                                <ClickableCard
                                    key={database.id}
                                    onClick={() =>
                                        router.push(`/database/${database.id}`)
                                    }
                                    p={4}
                                    minW="15vw"
                                    w="max-content"
                                >
                                    <Heading fontSize="lg">
                                        {database.name}
                                    </Heading>
                                </ClickableCard>
                            ))}
                        </HStack>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}

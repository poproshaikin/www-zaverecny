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
import { useIsTokenSaved } from '@/helpers/auth/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingPage from '@/components/general/Loading';
import ErrorPage from '@/components/general/ErrorPage';
import ClickableCard from '@/components/general/ClickableCard';

export default function Dashboard() {
    const isLoggedIn = useIsTokenSaved();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn.isReady && !isLoggedIn.result) {
            router.replace('/login');
        }
    }, [isLoggedIn, router]);

    const userDatabases = useGetDatabases();
    if (userDatabases.isLoading || !isLoggedIn.isReady) {
        return <LoadingPage />;
    }
    if (userDatabases.isError) {
        return <ErrorPage error={userDatabases.error} />;
    }
    return (
        <Box>
            <Navbar withHome withProfile />
            <Flex justifyContent="center" height="100vh" alignItems="center">
                <Flex h="50vh" w="50vw" mr="10vw" direction="column">
                    <Box w="40%" mb={8} px={4}>
                        <Heading fontSize="3xl" fontWeight="bold">
                            Your databases
                        </Heading>
                        <Text mt={2}>
                            We won't steal your data,{' '}
                            <strong>we promise</strong>.
                        </Text>
                        <Button
                            onClick={() => router.push('database/new')}
                            w="max-content"
                            my={8}
                        >
                            <Icon as={GoPlus} boxSize={6} color="green.400" />
                            New
                        </Button>
                    </Box>
                    {userDatabases.data?.length === 0 ? (
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
                            {userDatabases.data!.map((database) => (
                                <ClickableCard
                                    onClick={() =>
                                        router.push(`/database/${database.id}`)
                                    }
                                    p={4}
                                    minW="15vw"
                                    w="max-content"
                                >
                                    <Heading>{database.name}</Heading>
                                </ClickableCard>
                            ))}
                        </HStack>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}

'use client'

import {
    Box,
    Center,
    Flex,
    Heading,
    Icon,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react'
import Navbar from '@/components/nav/Navbar'
import { useGetDatabases } from '@/helpers/databases'
import Card from '@/components/general/Card'
import { TbDatabaseOff } from 'react-icons/tb'
import Button from '@/components/general/Button'
import { GoPlus } from 'react-icons/go'

export default function Dashboard() {
    const userDatabases = useGetDatabases()
    if (userDatabases.isLoading) {
        return (
            <Box bg="primary" h="100vh">
                <Navbar withHome withProfile />
                <Flex
                    justifyContent="center"
                    height="100vh"
                    alignItems="center"
                >
                    <Spinner size="xl" />
                </Flex>
            </Box>
        )
    }
    if (userDatabases.isError) {
        return (
            <Box bg="primary" h="100vh">
                <Navbar withHome withProfile />
                <Flex
                    justifyContent="center"
                    height="100vh"
                    alignItems="center"
                >
                    <Card>{userDatabases.error.message}</Card>
                </Flex>
            </Box>
        )
    }
    return (
        <Box bg="primary" h="100vh">
            <Navbar withHome withProfile />
            <Flex justifyContent="center" height="100vh" alignItems="center">
                <Flex h="50vh" w="50vw" mr="10vw" direction="column">
                    <Box borderBottom="1px solid black" w="20vw" mb={8} p={4}>
                        <Heading
                            fontSize="3xl"
                            fontWeight="bold"
                            w="max-content"
                        >
                            Your databases
                        </Heading>
                        <Button h="3.5vh" w="full" mt={8}>
                            <Icon as={GoPlus} boxSize={6} color="green.400" />
                            New
                        </Button>
                    </Box>
                    {userDatabases.data?.length === 0 ? (
                        <Card w="20vw">
                            <VStack gap={10}>
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
                                <Button>Procreate</Button>
                            </VStack>
                        </Card>
                    ) : (
                        <Card>h</Card>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}

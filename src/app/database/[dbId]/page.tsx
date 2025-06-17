'use client';

import { Box, Flex, Heading, Icon, Separator, Text } from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import { useGetDatabase, useGetDatabaseTables } from '@/helpers/databases';
import { VirtualDb } from '@/types/db/database';
import Loading from '@/components/general/Loading';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/general/Card';
import { useEnsureLoggedInOrRedirect, useEnsureToken } from '@/helpers/auth';
import ErrorPage from '@/components/general/ErrorPage';
import { ApiError } from '@/helpers/api';
import InputField from '@/components/general/InputField';
import { useState } from 'react';
import Button from '@/components/general/Button';
import { GoPlus } from 'react-icons/go';
import ClickableList from '@/components/general/ClickableList';
import SearchInput from '@/components/general/SearchInput';

export default function Page() {
    const { dbId } = useParams();
    const router = useRouter();
    const [searchFilter, setSearchFilter] = useState<string>('');
    const { isLogged, isLoggingPending } = useEnsureLoggedInOrRedirect();

    const rqDatabase = useGetDatabase(dbId as string);
    const rqTables = useGetDatabaseTables(dbId as string);

    if (rqDatabase.isPending || isLoggingPending || rqTables.isPending) {
        console.log('cau');
        return <Loading loadingButtons />;
    }

    if (rqDatabase.isError) {
        return <ErrorPage error={rqDatabase.error as ApiError} />;
    }
    if (rqTables.isError) {
        return <ErrorPage error={rqTables.error as ApiError} />;
    }

    const db: VirtualDb = rqDatabase.data.data;
    const tables: string[] = rqTables.data.data;

    return (
        <Box>
            <Navbar withHome withDashboard withProfile isLogged />
            <Flex height="100vh" direction="column" justifyContent="center">
                <Box>
                    <Card ml={12} p={4}>
                        <Heading fontWeight="bold">{db.name}</Heading>
                        <Flex direction="column" gap={4} mt={4}>
                            <Flex direction="column" gap={2}>
                                <Text fontSize="sm">Tables</Text>
                                <SearchInput
                                    h="4vh"
                                    _input={{
                                        placeholder: 'Search table',
                                        _placeholder: { fontSize: 'sm' },
                                    }}
                                    setter={setSearchFilter}
                                />
                                <Separator />
                                {tables.length > 0 ? (
                                    <ClickableList
                                        items={tables
                                            .filter((table) =>
                                                table.includes(searchFilter),
                                            )
                                            .map((table) => (
                                                <Flex
                                                    key={table}
                                                    alignItems="center"
                                                    gap={2}
                                                >
                                                    <Heading fontSize="md">
                                                        {table}
                                                    </Heading>
                                                </Flex>
                                            ))}
                                    />
                                ) : (
                                    <Flex alignItems="center" gap={2}>
                                        <Text fontSize="sm">
                                            No tables found...
                                        </Text>
                                    </Flex>
                                )}
                                <Button
                                    size="2xs"
                                    w="max-content"
                                    fontWeight="normal"
                                    fontSize="md"
                                    onClick={() =>
                                        router.push(
                                            `/database/${dbId}/table/new`,
                                        )
                                    }
                                >
                                    <Icon
                                        as={GoPlus}
                                        color="green.400"
                                        boxSize={6}
                                    />
                                    New
                                </Button>
                                <Separator />
                            </Flex>
                        </Flex>
                    </Card>
                </Box>
            </Flex>
        </Box>
    );
}

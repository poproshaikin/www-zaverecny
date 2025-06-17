'use client';

import {
    Box,
    Center,
    Flex,
    Heading,
    Icon,
    VStack,
    Text,
} from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import { useEnsureLoggedInOrRedirect } from '@/helpers/auth';
import Loading from '@/components/general/Loading';
import Card from '@/components/general/Card';
import InputField from '@/components/general/InputField';
import Button from '@/components/general/Button';
import { TbDatabasePlus } from 'react-icons/tb';
import { CreateColumn, CreateTable } from '@/types/other/dbObjects';
import { useForm } from 'react-hook-form';
import ColumnsDefinitionForm from '@/components/columns/ColumnsDefinitionForm';
import { useState } from 'react';
import { GrTableAdd } from 'react-icons/gr';

export default function NewTable() {
    const { isLogged, isLoggingPending } = useEnsureLoggedInOrRedirect();
    const [columns, setColumns] = useState<CreateColumn[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateTable>();

    if (isLoggingPending) {
        return <Loading loadingButtons />;
    }

    const onSubmit = async (table: CreateTable) => {};

    console.log(columns);

    return (
        <Flex direction="column" h="full" gap={2}>
            <Navbar withHome withDashboard withProfile isLogged={isLogged} />
            <Flex h="full" w="full" alignItems="center" justifyContent="center">
                <Card w="30%">
                    <Flex direction="column" gap={8}>
                        <VStack gap={4}>
                            <Icon
                                as={GrTableAdd}
                                boxSize={20}
                                color="green.400"
                            />
                            <Heading
                                fontSize="2xl"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                Create a new table
                            </Heading>
                        </VStack>
                        <Box>
                            <Text mb={4} fontSize="lg">
                                Enter the <strong>name</strong> of your new
                                table.
                            </Text>
                            <InputField
                                placeholder="e.g. my_table"
                                h="50%"
                                {...register('name', { required: true })}
                            />
                            {errors.name && (
                                <Text color="red.500" fontSize="sm">
                                    {errors.name.message}
                                </Text>
                            )}
                        </Box>
                        <Box>
                            <ColumnsDefinitionForm
                                columnsOuter={columns}
                                setColumnsOuterAction={setColumns}
                            />
                        </Box>
                        <Center>
                            <Button w="30%" onClick={handleSubmit(onSubmit)}>
                                Confirm
                            </Button>
                        </Center>
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    );
}

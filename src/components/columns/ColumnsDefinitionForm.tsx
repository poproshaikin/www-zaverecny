'use client';

import {
    columnDataTypes,
    ColumnDataTypeSchema,
    ColumnInfo,
    CreateColumn,
} from '@/types/other/dbObjects';
import { useState } from 'react';
import {
    Box,
    Center,
    CheckboxGroup,
    Dialog,
    Flex,
    Heading,
    Icon,
    Input,
    Portal,
    Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ColumnDefinitionDialog from '@/components/columns/ColumnDefinitionDialog';

export default function ColumnsDefinitionForm({
    columnsOuter,
    setColumnsOuterAction,
}: {
    columnsOuter: CreateColumn[];
    setColumnsOuterAction: (columns: CreateColumn[]) => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateColumn>();

    return (
        <Flex>
            <Flex
                direction="column"
                w="full"
                maxW="600px"
                p={4}
                borderWidth={1}
                borderRadius="2xl"
                borderColor="gray.200"
            >
                <Heading mb={4}>Columns</Heading>
                <Box>
                    <Flex direction="row" mb={4} gap={4}>
                        {columnsOuter.length === 0 ? (
                            <Flex mb={8}>
                                Add a new column by clicking the button below.
                            </Flex>
                        ) : (
                            columnsOuter.map((column) => (
                                <Flex
                                    key={column.name}
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    p={2}
                                    borderWidth={1}
                                    borderRadius="xl"
                                    borderColor="gray.200"
                                    minW="max-content"
                                    w="20%"
                                >
                                    <Text>{column.name}</Text>
                                    <Text>{column.type}</Text>
                                </Flex>
                            ))
                        )}
                    </Flex>
                    <ColumnDefinitionDialog
                        columnsOuter={columnsOuter}
                        setColumnsOuterAction={setColumnsOuterAction}
                    />
                </Box>
            </Flex>
        </Flex>
    );
}

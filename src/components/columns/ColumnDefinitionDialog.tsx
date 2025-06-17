'use client';

import { Dialog, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Button from '@/components/general/Button';
import InputField from '@/components/general/InputField';
import Select from '@/components/general/Select';
import { columnDataTypes, CreateColumn } from '@/types/other/dbObjects';
import Checkbox from '@/components/general/Checkbox';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

export default function ColumnDefinitionDialog({
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

    const onSubmit = (data: CreateColumn) => {
        setColumnsOuterAction([...columnsOuter, data]);
        reset();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Add Column</Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="100vh"
            >
                <Dialog.Content
                    h="max-content"
                    borderRadius="2xl"
                    p={4}
                    gap={4}
                >
                    <Dialog.Header>
                        <Heading>Add a new column</Heading>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Flex gap={2} direction="column">
                            <Text>Enter the column name</Text>
                            <InputField
                                placeholder="e.g. some_name"
                                {...register('name')}
                            />
                            {errors.name && (
                                <Text color="red.500" fontSize="sm">
                                    {errors.name.message}
                                </Text>
                            )}
                            <Text>Select the column type</Text>
                            <Select
                                {...register('type')}
                                collection={columnDataTypes}
                                placeholder="Select a type"
                            />
                            <Checkbox
                                {...register('isPrimaryKey')}
                                label="Primary key"
                            />
                            <Checkbox
                                {...register('isUnique')}
                                label="Unique"
                            />
                            <Checkbox
                                {...register('isNullable')}
                                label="Not null"
                            />
                            <Checkbox
                                {...register('isForeignKey')}
                                label="Foreign key"
                            />
                        </Flex>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Icon
                                cursor="pointer"
                                as={AiOutlineClose}
                                boxSize={6}
                            />
                        </Dialog.CloseTrigger>
                        <Dialog.ActionTrigger>
                            <Button onClick={handleSubmit(onSubmit)}>
                                Confirm
                            </Button>
                        </Dialog.ActionTrigger>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

'use client';

import {
    Text,
    Box,
    Flex,
    Heading,
    Input,
    VStack,
    Icon,
    Center,
} from '@chakra-ui/react';
import Navbar from '@/components/nav/Navbar';
import Card from '@/components/general/Card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TbDatabasePlus } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { CreateVirtualDb } from '@/types/db/database';
import InputField from '@/components/general/InputField';
import Button from '@/components/general/Button';
import { useCreateVirtualDb } from '@/helpers/databases';
import { errorToast, successToast } from '@/components/utils/toast';

export default function NewDb() {
    const router = useRouter();
    const { mutateAsync, isPending } = useCreateVirtualDb();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateVirtualDb>();

    const onSubmit = async (data: CreateVirtualDb) => {
        await mutateAsync(data, {
            onSuccess: async (data) => {
                successToast('Database created successfully');
                router.push(`/database/${data.id}`);
            },
            onError: async (error) => {
                console.error(error);
                errorToast('Error creating database');
                reset();
            },
        });
    };

    return (
        <Box h="full">
            <Navbar withProfile withDashboard />
            <Flex h="full" w="full" alignItems="center" justifyContent="center">
                <Card w="30%">
                    <Flex direction="column" gap={8}>
                        <VStack gap={4}>
                            <Icon
                                as={TbDatabasePlus}
                                boxSize={20}
                                color="green.400"
                            />
                            <Heading
                                fontSize="2xl"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                Create a new virtual database
                            </Heading>
                        </VStack>
                        <Box>
                            <Text mb={4} fontSize="lg">
                                Enter the <strong>name</strong> of your new
                                virtual database.
                            </Text>
                            <InputField
                                placeholder="e.g. My exes "
                                {...register('name', { required: true })}
                            />
                            {errors.name && (
                                <Text color="red.500" fontSize="sm">
                                    {errors.name.message}
                                </Text>
                            )}
                        </Box>
                        <Box>
                            <Text mb={4} fontSize="lg">
                                Enter the <strong>password</strong> for your new
                                virtual database.
                            </Text>
                            <InputField
                                placeholder="e.g. qwerty123 (dont do that pls)"
                                {...register('password', { required: true })}
                            />
                            {errors.password && (
                                <Text color="red.500" fontSize="sm">
                                    {errors.password.message}
                                </Text>
                            )}
                        </Box>
                        <Center>
                            <Button w="50%" onClick={handleSubmit(onSubmit)}>
                                Confirm
                            </Button>
                        </Center>
                    </Flex>
                </Card>
            </Flex>
        </Box>
    );
}

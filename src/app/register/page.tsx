'use client'

import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import ReturnButton from '@/components/nav/ReturnButton'
import Card from '@/components/general/Card'
import { FaUserCheck } from 'react-icons/fa'
import Button from '@/components/general/Button'
import InputField from '@/components/general/InputField'
import { useForm } from 'react-hook-form'
import { UserRegister } from '@/types/db/user'
import { useLogin, useRegister } from '@/helpers/auth'
import { useEffect } from 'react'
import { saveToken } from '@/helpers/auth/utils'
import { toaster } from '@/components/utils/toaster'

export default function RegisterPage() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<UserRegister>()

    const { mutateAsync } = useRegister()

    const onSubmit = async (data: UserRegister) => {
        await mutateAsync(data, {
            onSuccess: async (data: string) => {
                saveToken(data)
                console.log('he')
                toaster.create({
                    type: 'success',
                    title: 'Registration successful',
                    description: 'You have successfully registered.',
                })
            },
            onError: async (err: Error) => {
                toaster.create({
                    type: 'error',
                    title: 'Error',
                    description: 'We could not register you. Please try again.',
                })
            },
        })
    }

    return (
        <Box>
            <ReturnButton />
            <Flex bg="primary" h="100vh" justify="center" align="center" px={4}>
                <Card w="100%" maxW="960px" h="auto">
                    <Flex direction={{ base: 'column', md: 'row' }} h="full">
                        <Flex
                            flex="1"
                            borderRight={{ base: 'none', md: '1px solid' }}
                            borderColor="gray.200"
                            direction="column"
                            align="center"
                            justify="center"
                            p={8}
                            gap={4}
                        >
                            <Icon as={FaUserCheck} boxSize={20} />
                            <Text fontSize="md" fontWeight="semibold">
                                Already have an account?
                            </Text>
                            <Button onClick={() => router.push('/log-in')}>
                                Log in
                            </Button>
                        </Flex>

                        <Flex
                            flex="1"
                            direction="column"
                            align="center"
                            justify="space-between"
                            p={8}
                            gap={8}
                        >
                            <Heading fontSize="3xl" fontWeight="bold">
                                Register
                            </Heading>

                            <Flex
                                direction="column"
                                w="100%"
                                maxW="320px"
                                gap={4}
                            >
                                <Text fontSize="lg">
                                    Join us! Fill in your details to get
                                    started.
                                </Text>
                                <InputField
                                    placeholder="email@example.com"
                                    type="email"
                                    {...register('email')}
                                />
                                <InputField
                                    placeholder="username"
                                    {...register('username')}
                                />
                                <InputField
                                    placeholder="••••••••"
                                    type="password"
                                    {...register('password')}
                                />
                            </Flex>

                            <Button
                                colorScheme="blue"
                                w="100%"
                                maxW="200px"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Sign up
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Box>
    )
}

'use client'

import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import Card from '@/components/general/Card'
import InputField from '@/components/general/InputField'
import { UserLogin } from '@/types/zod-schemas'
import { useForm } from 'react-hook-form'
import Button from '@/components/general/Button'
import { useRouter } from 'next/navigation'
import ReturnButton from '@/components/nav/ReturnButton'
import { MdWavingHand } from 'react-icons/md'
import { useLogin } from '@/helpers/auth'
import { saveToken } from '@/helpers/auth/utils'
import { toaster } from '@/components/utils/toaster'
import { useEffect } from 'react'

export default function LogInPage() {
    const { register, handleSubmit } = useForm<UserLogin>()

    const router = useRouter()
    const { mutateAsync } = useLogin()

    const onSubmit = async (data: UserLogin) => {
        await mutateAsync(data, {
            onSuccess: async (data) => {
                console.log('received jwt', data)
                saveToken(data)
                toaster.create({
                    type: 'success',
                    title: 'Login successful',
                    description: 'You have successfully logged in.',
                })
                router.push('/dashboard')
            },
            onError: async (error) => {
                toaster.create({
                    type: 'error',
                    title: 'Login failed',
                    description: 'Invalid username or password.',
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
                            direction="column"
                            align="center"
                            justify="space-between"
                            p={8}
                            gap={8}
                        >
                            <Heading fontSize="3xl" fontWeight="bold">
                                Log in
                            </Heading>

                            <Flex
                                direction="column"
                                w="100%"
                                maxW="320px"
                                gap={4}
                            >
                                <Text fontSize="lg">
                                    Welcome back! Please enter your credentials.
                                </Text>
                                <InputField
                                    placeholder="johndoe123"
                                    {...register('username')}
                                />
                                <InputField
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('password')}
                                />
                            </Flex>

                            <Button
                                colorScheme="blue"
                                w="100%"
                                maxW="200px"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Log in
                            </Button>
                        </Flex>

                        <Flex
                            flex="1"
                            borderLeft={{ base: 'none', md: '1px solid' }}
                            borderColor="gray.200"
                            direction="column"
                            align="center"
                            justify="center"
                            p={8}
                            gap={4}
                        >
                            <Icon as={MdWavingHand} boxSize={20} />
                            <Text fontSize="md" fontWeight="semibold">
                                Or begin your journey
                            </Text>
                            <Button onClick={() => router.push('/register')}>
                                Register
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Box>
    )
}

'use client';

import { Flex, Heading, Icon, Spinner } from '@chakra-ui/react';
import React from 'react';
import Button from '../../components/general/Button';
import { useRouter } from 'next/navigation';
import { useEnsureToken } from '@/helpers/auth';

export default function Navbar({
    withHome = false,
    withDashboard = false,
    withProfile = false,
    loadingButtons = false,
}: {
    withHome?: boolean;
    withDashboard?: boolean;
    withProfile?: boolean;
    loadingButtons?: boolean;
}) {
    const { isLogged, isPending } = useEnsureToken();
    const router = useRouter();

    return (
        <Flex
            direction="row"
            width="100vw"
            height={{ base: '30px', md: '60px' }}
            alignItems="center"
            bg="primary"
            justifyContent="space-around"
            position="fixed"
            color="gray.900"
        >
            <Heading
                fontSize={25}
                fontWeight="bold"
                cursor="pointer"
                onClick={() => router.push('/')}
            >
                DeltaCloud
            </Heading>
            <Flex gap={4} flexDirection="row">
                {withHome && (
                    <Button
                        w="6vw"
                        minW="max-content"
                        onClick={() => (loadingButtons ? {} : router.push('/'))}
                    >
                        {loadingButtons ? <Spinner size="sm" /> : 'Home'}
                    </Button>
                )}
                {isLogged ? (
                    <>
                        {withDashboard && (
                            <Button
                                w="6vw"
                                minW="max-content"
                                onClick={() =>
                                    loadingButtons
                                        ? {}
                                        : router.push('/dashboard')
                                }
                            >
                                {loadingButtons ? (
                                    <Spinner size="sm" />
                                ) : (
                                    'Dashboard'
                                )}
                            </Button>
                        )}
                        {withProfile && (
                            <Button
                                w="6vw"
                                minW="max-content"
                                onClick={() =>
                                    loadingButtons
                                        ? {}
                                        : router.push('/profile')
                                }
                            >
                                {loadingButtons ? (
                                    <Spinner size="sm" />
                                ) : (
                                    'Profile'
                                )}
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        <Button
                            w="6vw"
                            minW="max-content"
                            onClick={() =>
                                loadingButtons ? {} : router.push('/login')
                            }
                        >
                            {loadingButtons ? <Spinner size="sm" /> : 'Log in'}
                        </Button>
                        <Button
                            w="6vw"
                            minW="max-content"
                            onClick={() =>
                                loadingButtons ? {} : router.push('/register')
                            }
                        >
                            {loadingButtons ? (
                                <Spinner size="sm" />
                            ) : (
                                'Register'
                            )}
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    );
}

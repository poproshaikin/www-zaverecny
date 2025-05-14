'use client'

import { Flex, Heading, Icon } from '@chakra-ui/react'
import React from 'react'
import Button from '../../components/general/Button'
import { useIsLoggedIn } from '@/helpers/auth/utils'
import { useRouter } from 'next/navigation'

export default function Navbar({
    withHome = false,
    withDashboard = false,
    withProfile = false,
}: {
    withHome?: boolean
    withDashboard?: boolean
    withProfile?: boolean
}) {
    const isLogged = useIsLoggedIn()
    const router = useRouter()

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
            <Heading fontSize={25} fontWeight="bold">
                DeltaCloud
            </Heading>
            <Flex gap={4} flexDirection="row">
                {withHome && (
                    <Button
                        onClick={() => {
                            router.push('/')
                        }}
                    >
                        Home
                    </Button>
                )}
                {isLogged ? (
                    <>
                        {withDashboard && (
                            <Button onClick={() => router.push('/dashboard')}>
                                Dashboard
                            </Button>
                        )}
                        {withProfile && (
                            <Button onClick={() => router.push('/profile')}>
                                Profile
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        <Button onClick={() => router.push('/log-in')}>
                            Log In
                        </Button>
                        <Button onClick={() => router.push('/register')}>
                            Register
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    )
}

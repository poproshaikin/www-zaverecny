import {  Flex, Heading} from "@chakra-ui/react";
import React from "react";
import Button from "../../components/general/Button"
import getIsLogged from "@/auth/getIsLogged";
import {signIn, useSession} from "next-auth/react";


export default function Navbar() {
    const isLogged = getIsLogged();

    const { data: session } = useSession();

    return (
        <Flex
            direction='row'
            width='full' height={{ base: '30px', md: '60px' }}
            alignItems='center'
            bg='primary'
            justifyContent='space-around'
            position='fixed'
            color='gray.900'
        >
            <Heading fontSize={20} fontWeight='bold'>
                Hello, World!
            </Heading>
            <Flex gap={4} flexDirection='row'>
                {isLogged ?
                    <>
                        <Button>
                            Dashboard
                        </Button>
                        <Button>
                            Profile
                        </Button>
                    </>
                :
                    <>
                        <Button onClick={() => signIn()}>
                            Log In
                        </Button>
                        <Button>
                            Sign Up
                        </Button>
                    </>
                }
            </Flex>
        </Flex>
    );
}
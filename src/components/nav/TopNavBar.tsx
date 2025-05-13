import {Button, Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";

function NavButton({children}: {children: React.ReactNode}) {
    return (
        <Button
            background='transparent'
            padding='5px'
            borderRadius='15px'
            width={20}
            height={8}
            boxShadow='sm'
            color='blackAlpha.800'
            fontWeight='bold'
            _hover={{
                boxShadow: 'lg',
                background: 'rgba(255, 255, 255, 0.3)',
            }}
        >
            {children}
        </Button>
    )
}

export default function TopNavBar() {
    return (
        <Flex
            direction='row'
            width='full' height={{ base: '30px', md: '60px' }}
            alignItems='center'
            bg='primary'
            justifyContent='space-between'
            position='fixed'
        >
            <Heading color='blackAlpha.800' pl={12}>
                Hello world
            </Heading>
            <Flex gap={4} pr={12}>
                <NavButton>
                    Home
                </NavButton>
                <NavButton>
                    Profile
                </NavButton>
                <NavButton>
                    Settings
                </NavButton>
            </Flex>
        </Flex>
    );
}
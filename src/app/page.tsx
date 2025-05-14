'use client';

import {Box,  Card, Flex, Heading, Icon, Text} from "@chakra-ui/react";
import { } from 'react-icons'
import Button from '../components/general/Button'
import {FaBoltLightning} from "react-icons/fa6";
import Navbar from "@/components/nav/Navbar";
import LandingCard from "@/components/landing/LandingCard";

export default function Page() {
    return (
        <div>
            <Navbar />
            <Flex
                alignItems="center"
                height="200vh"
                flexDirection="column"
                bg='primary'
            >

                <Flex pt='160px' justifyContent="center" alignItems="center">
                    <Heading fontSize={30} fontWeight="semibold" >
                        Build fast. Query faster. Debug forever.
                    </Heading>
                </Flex>

                <Flex pt='100px'>
                    <LandingCard>
                        <Heading fontWeight="bold" fontSize="xl">
                            Instant Create
                        </Heading>
                        <Text fontSize="lg" textAlign="center" opacity={0.9}>
                            Create your database and run your first query in 30 seconds.
                        </Text>
                        <Icon>
                            <FaBoltLightning size={60} color=''/>
                        </Icon>
                        <Button>
                            Begin
                        </Button>
                    </LandingCard>
                </Flex>
            </Flex>
        </div>
    );
}
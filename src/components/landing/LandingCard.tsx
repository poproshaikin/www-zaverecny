import { Card } from '@chakra-ui/react';
import React from 'react';

export default function LandingCard({children}: { children: React.ReactNode }) {

    return (
        <Card.Root
            bg='secondary'
            boxShadow="2xs"
            borderRadius="xl"
            w="350px"
            p={8}
            minH="250px"
            color='gray.900'
            transition='0.3s ease'
            _hover={{ transform: 'translateY(-5px)' }}
        >
            <Card.Body alignItems='center' gap={8}>
                {children}
            </Card.Body>
        </Card.Root>
    );
}
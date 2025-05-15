'use client';

import * as Chakra from '@chakra-ui/react';
import React from 'react';
import { CardRootProps } from '@chakra-ui/react';

export default function Card({
    children,
    ...rest
}: { children: React.ReactNode } & CardRootProps) {
    return (
        <Chakra.Card.Root
            bg="secondary"
            boxShadow="2xs"
            borderRadius="xl"
            w="350px"
            p={8}
            color="gray.900"
            {...rest}
        >
            <Chakra.Card.Body>{children}</Chakra.Card.Body>
        </Chakra.Card.Root>
    );
}

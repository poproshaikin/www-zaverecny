'use client';

import React from 'react';
import * as Chakra from '@chakra-ui/react';

export default function Button({
    children,
    ...rest
}: { children: React.ReactNode } & Chakra.ButtonProps) {
    return (
        <Chakra.Button
            bg="gray.900"
            borderRadius="xl"
            fontWeight="semibold"
            fontSize="sm"
            minW="max-content"
            p={4}
            _active={{
                background: 'gray.700',
                transform: 'translateY(3px)',
            }}
            {...rest}
        >
            {children}
        </Chakra.Button>
    );
}

'use client'

import React from 'react'
import * as Chakra from '@chakra-ui/react'

export default function Button({
    children,
    ...rest
}: { children: React.ReactNode } & Chakra.ButtonProps) {
    return (
        <Chakra.Button
            bg="gray.900"
            borderRadius="xl"
            fontWeight="semibold"
            minW="5vw"
            fontSize="sm"
            _active={{ background: 'gray.700' }}
            {...rest}
        >
            {children}
        </Chakra.Button>
    )
}

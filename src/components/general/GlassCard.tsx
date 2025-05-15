import React from 'react'
import { Card, CardRootProps } from '@chakra-ui/react'

export default function GlassCard({
    children,
    ...rest
}: { children: React.ReactNode } & CardRootProps) {
    return (
        <Card.Root
            minH="20vh"
            minW="10vw"
            backdropFilter="blur(10px)"
            background="rgba(255, 255, 255, 0.1)"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
            border="1px solid rgba(255,255,255, 0.18)"
            borderRadius="2xl"
            {...rest}
        >
            <Card.Body>{children}</Card.Body>
        </Card.Root>
    )
}

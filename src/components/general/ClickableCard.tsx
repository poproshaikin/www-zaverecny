import React from 'react';
import { Card, CardRootProps } from '@chakra-ui/react';

export default function ClickableCard({
    children,
    onClick,
    ...rest
}: {
    children: React.ReactNode;
} & CardRootProps) {
    return (
        <Card.Root
            background="secondary"
            borderRadius="2xl"
            onClick={onClick}
            transition="0.2s"
            boxShadow="2xs"
            cursor="pointer"
            _hover={{
                transform: 'translateY(-3px)',
                boxShadow: 'none',
            }}
            _active={{
                transform: 'translateY(0px)',
                color: 'black',
                boxShadow: 'none',
            }}
            {...rest}
        >
            <Card.Body>{children}</Card.Body>
        </Card.Root>
    );
}

'use client';

import { Box, Flex, Icon, Input, InputProps } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export default function InputField({
    setter,
    ...rest
}: { setter?: (newValue: string) => void } & InputProps) {
    return (
        <Input
            p={2}
            direction="row"
            bg="primary"
            color="gray.900"
            transition="0.1s ease"
            borderRadius="xl"
            h="full"
            w="full"
            border="none"
            onChange={(e) => setter?.(e.target.value)}
            outline="none"
            _placeholder={{
                color: 'gray.500',
                fontSize: 'sm',
            }}
            {...rest}
        />
    );
}

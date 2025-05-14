'use client';

import {Input, InputProps} from "@chakra-ui/react";

export default function InputField({ ...rest}: {} & InputProps) {
    return (
        <Input
            p={2}
            border='none'
            bg='primary'
            color='gray.900'
            outline='none'
            transition='0.1s ease'
            borderRadius='xl'
            _placeholder={{
                color: 'gray.500',
                fontSize: 'sm',
            }}
            {...rest} />
    )
}
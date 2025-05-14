'use client'

import React from 'react'
import { Box, BoxProps, Icon } from '@chakra-ui/react'
import { IoReturnUpBack } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

export default function ReturnButton({ ...rest }: BoxProps) {
    const router = useRouter()
    return (
        <Box
            mt={5}
            ml={20}
            position="absolute"
            transition="0.03s"
            cursor="pointer"
            _hover={{ transform: 'scale(1.1)' }}
            onClick={router.back}
            {...rest}
        >
            <Icon>
                <IoReturnUpBack size="50px" />
            </Icon>
        </Box>
    )
}

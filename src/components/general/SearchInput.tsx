import {
    ConditionalValue,
    Flex,
    FlexProps,
    Icon,
    Input,
    InputProps,
    SystemStyleObject,
} from '@chakra-ui/react';
import InputField from '@/components/general/InputField';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput({
    setter,
    iconSize = 5,
    _input,
    ...rest
}: {
    setter?: (newValue: string) => void;
    iconSize?: number;
    _input?: InputProps;
} & FlexProps) {
    return (
        <Flex
            direction="row"
            bg="primary"
            color="gray.900"
            transition="0.1s ease"
            borderRadius="xl"
            alignItems="center"
            pr={2}
            {...rest}
        >
            <InputField
                p={2}
                background="transparent"
                w="full"
                h="full"
                {..._input}
            />
            <Icon as={FiSearch} boxSize={iconSize} color="gray.700" />
        </Flex>
    );
}

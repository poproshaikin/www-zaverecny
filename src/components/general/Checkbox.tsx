import * as Chakra from '@chakra-ui/react';

export default function Checkbox({
    label,
    ...rest
}: { label: string } & Chakra.CheckboxRootProps) {
    return (
        <Chakra.Checkbox.Root {...rest}>
            <Chakra.Checkbox.HiddenInput />
            <Chakra.Checkbox.Control borderRadius="2xl" p={0.5} />
            <Chakra.Checkbox.Label>{label}</Chakra.Checkbox.Label>
        </Chakra.Checkbox.Root>
    );
}

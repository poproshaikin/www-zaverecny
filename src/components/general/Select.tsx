import * as Chakra from '@chakra-ui/react';
import React from 'react';
import { Control, FieldValues, useFormContext } from 'react-hook-form';

export type SelectProps = {
    name: string;
    control?: any;
    collection: Chakra.ListCollection<any>;
    placeholder?: string;
} & Omit<Chakra.Select.RootProps, 'onChange' | 'value'>;

export default function Select({
    collection,
    placeholder,
    control,
    ...rest
}: SelectProps) {
    const formContext = useFormContext();
    const formControl: Control<FieldValues, any, FieldValues> =
        control ?? formContext.control;

    return (
        <Chakra.Select.Root
            collection={collection}
            value={value}
            onValueChange={(e) => {
                onChange?.(e.value[0]);
            }}
            {...rest}
        >
            <Chakra.Select.Trigger
                borderRadius="xl"
                border="none"
                bg="primary"
                h="full"
                p={2}
            >
                <Chakra.Select.ValueText placeholder={placeholder} />
            </Chakra.Select.Trigger>
            <Chakra.Select.Content borderRadius="xl">
                {collection.items.map((item, index) => {
                    const node = item as React.ReactNode;
                    return (
                        <Chakra.Select.Item
                            p={2}
                            onClick={() =>
                                setSelectedItem(collection.items[index])
                            }
                            item={item}
                            key={index}
                        >
                            {node}
                        </Chakra.Select.Item>
                    );
                })}
            </Chakra.Select.Content>
        </Chakra.Select.Root>
    );
}

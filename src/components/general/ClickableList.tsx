import React from 'react';
import { List } from '@chakra-ui/react';

export default function ClickableList({ items }: { items: React.ReactNode[] }) {
    return (
        <List.Root>
            {items.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
            ))}
        </List.Root>
    );
}

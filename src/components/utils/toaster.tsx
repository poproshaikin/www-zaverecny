import {
    createToaster,
    Toaster as ChakraToaster,
    Toast,
    Portal,
    Spinner,
    Stack,
} from '@chakra-ui/react'

export const toaster = createToaster({
    max: 3,
    placement: 'top-end',
})

export function Toaster() {
    return (
        <Portal>
            <ChakraToaster toaster={toaster}>
                {(toast) => (
                    <Toast.Root>
                        {toast.type === 'loading' ? (
                            <Spinner size="sm" color="blue.solid" />
                        ) : (
                            <Toast.Indicator />
                        )}
                        <Stack gap="1" flex="1" maxWidth="100%">
                            {toast.title && (
                                <Toast.Title>{toast.title}</Toast.Title>
                            )}
                            {toast.description && (
                                <Toast.Description>
                                    {toast.description}
                                </Toast.Description>
                            )}
                        </Stack>
                        {toast.action && (
                            <Toast.ActionTrigger>
                                {toast.action.label}
                            </Toast.ActionTrigger>
                        )}
                        {toast.meta?.closable && <Toast.CloseTrigger />}
                    </Toast.Root>
                )}
            </ChakraToaster>
        </Portal>
    )
}

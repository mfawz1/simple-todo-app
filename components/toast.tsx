import {
    Toast,
    ToastTitle,
    ToastDescription,
    useToast,
} from '@/components/ui/toast';
import { Pressable } from '@/components/ui/pressable';
import { Icon, CloseIcon, HelpCircleIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { useState, type ComponentProps } from 'react';

// duration is in milliseconds
const useTaskToast = ({ action, title, message, duration = 3000 }: {
    action: ComponentProps<typeof Toast>['action'],
    title: string,
    message: string,
    duration?: number
}) => {
    const toast = useToast();
    const [toastId, setToastId] = useState<number | undefined>(Math.random())
    const handleToast = () => {
        if (toastId != undefined) {
            toast.show({
                id: toastId.toString(),
                placement: 'top',
                duration,
                render: ({ id }) => {
                    const uniqueToastId = 'toast-' + id;
                    return (
                        <Toast
                            action={action}
                            variant="outline"
                            nativeID={uniqueToastId}
                            className={`p-4 gap-6 border-${action}-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between`}
                        >
                            <HStack space="md">
                                <Icon as={HelpCircleIcon} className={`stroke-${action}-500 mt-0.5`} />
                                <VStack space="xs">
                                    <ToastTitle className={`font-semibold text-${action}-500`}>
                                        {
                                            title
                                        }
                                    </ToastTitle>
                                    <ToastDescription size="sm">
                                        {message}
                                    </ToastDescription>
                                </VStack>
                            </HStack>
                            <HStack className="min-[450px]:gap-3 gap-1">
                                {/* <Button variant="link" size="sm" className="px-3.5 self-center"> */}
                                {/*     <ButtonText>Retry</ButtonText> */}
                                {/* </Button> */}
                                <Pressable onPress={() => toast.close(id)}>
                                    <Icon as={CloseIcon} />
                                </Pressable>
                            </HStack>
                        </Toast>
                    );
                },
            });
        }
    }
    return handleToast
}

export { useTaskToast }

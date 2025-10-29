import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from './ui/modal';
import { Button, ButtonText } from './ui/button';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { Icon, TrashIcon } from './ui/icon';
import { Box } from './ui/box';
import { Dispatch, SetStateAction } from 'react';

interface DeleteConfirmationModalParams {
    onConfirm: () => void,
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const DeleteConfirmationModal = ({ showModal, setShowModal, onConfirm }: DeleteConfirmationModalParams) => {
    return (
        <>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            >
                <ModalBackdrop />
                <ModalContent className="max-w-[305px] items-center">
                    <ModalHeader>
                        <Box className="w-[56px] h-[56px] rounded-full bg-background-error items-center justify-center">
                            <Icon as={TrashIcon} className="stroke-error-600" size="xl" />
                        </Box>
                    </ModalHeader>
                    <ModalBody className="mt-0 mb-4">
                        <Heading size="md" className="text-typography-950 mb-2 text-center">
                            Delete task
                        </Heading>
                        <Text size="sm" className="text-typography-500 text-center">
                            Are you sure you want to delete this task? This action cannot be
                            undone.
                        </Text>
                    </ModalBody>
                    <ModalFooter className="w-full">
                        <Button
                            variant="outline"
                            action="secondary"
                            size="sm"
                            onPress={() => {
                                setShowModal(false);
                            }}
                            className="flex-grow"
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            onPress={() => {
                                setShowModal(false);
                                onConfirm()
                            }}
                            size="sm"
                            className="flex-grow"
                        >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export { DeleteConfirmationModal }

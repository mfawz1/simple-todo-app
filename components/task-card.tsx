import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import {
    Checkbox,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxIcon,
} from '@/components/ui/checkbox';
import { CheckIcon, TrashIcon } from '@/components/ui/icon';
import { TaskInterface } from '@/interfaces/task-interface';
import { formatDistanceToNow } from "date-fns";
import { HStack } from './ui/hstack';
import { Button, ButtonIcon, ButtonText } from './ui/button';
import { useTask } from '@/handlers/task-handler';
import { DeleteConfirmationModal } from './delete-confirmation-modal';
import { useState } from 'react';
import { VStack } from './ui/vstack';


interface TaskCardParams {
    task: TaskInterface,
}
const TaskCard = ({ task }: TaskCardParams) => {
    const { title, description, due, estimate, isComplete } = task;

    const { taskUpdate, taskRemove } = useTask()
    const handleTaskChanged = (task: TaskInterface) => {
        taskUpdate(task)
    }

    const handleTaskRemoval = (task: TaskInterface) => {
        taskRemove(task);
    }
    const [showModal, setShowModal] = useState(false);

    return (
        <Card size="md" variant="elevated" className="m-3">
            <HStack>
                <Checkbox onChange={() => { handleTaskChanged({ ...task, isComplete: !task.isComplete, completionDate: new Date() }) }} isDisabled={false} isChecked={isComplete} isInvalid={false} size="md" value={""}>
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                        <VStack>
                            <Heading size="md" className='mb-1' strikeThrough={isComplete}>{title}</Heading>
                            {isComplete && task.completionDate && <Text size="sm" className='mb-1'>completed {formatDistanceToNow(task.completionDate!, { addSuffix: true })}</Text>}
                        </VStack>
                    </CheckboxLabel>
                </Checkbox>
                <Button onPress={() => setShowModal(prev => !prev)} className='ml-auto rounded-full'>
                    <ButtonIcon as={TrashIcon} />
                </Button>
            </HStack>
            <Text size="md" className='p-2'>{description}</Text>
            <Text size='sm'>Due: {formatDistanceToNow(due, { addSuffix: true })}</Text>
            {estimate && estimate > 0 && <Text size='sm'>Takes about: {estimate} min(s)</Text>}
            <DeleteConfirmationModal
                showModal={showModal}
                setShowModal={setShowModal}
                onConfirm={
                    () => {
                        handleTaskRemoval(task)
                    }
                } />
        </Card>
    );
}




export { TaskCard };

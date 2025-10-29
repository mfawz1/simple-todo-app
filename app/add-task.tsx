import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { AddIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading';
import { useState } from 'react';
import { useTaskToast } from '@/components/toast';
import { TaskDateTimePicker } from '@/components/datepicker';
import { taskCreate, useTask } from '@/handlers/task-handler';
import { useRouter } from 'expo-router';



export default function AddTaskScreen() {

    const router = useRouter()
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskEstimate, setTaskEstimate] = useState<number | undefined>(undefined);
    const [taskDue, setTaskDue] = useState<Date | undefined>(new Date());

    const {
        taskAdd
    } = useTask()

    const toastSuccessHandler = useTaskToast(
        {
            action: 'success',
            title: "Task Added!",
            message: "Task added successfully! good luck!"
        }
    )

    const toastErrorHandler = useTaskToast(
        {
            action: 'error',
            title: "Error adding task!",
            message: "Task title and description are required",
            duration: 2000
        }
    )
    // parse estimate as a numeric value otherwise leave it as undefined
    const handleEstimate = (value: string) => {
        const intValue = parseInt(value)
        if (value.length == 0) {
            setTaskEstimate(undefined);
            return;
        }
        if (!isNaN(intValue)) {
            setTaskEstimate(intValue);
            return
        }
    }

    const handleTaskCreation = () => {
        //simple validation for title and description
        if (taskTitle != undefined && taskDescription != undefined) {
            const task = taskCreate({
                title: taskTitle,
                description: taskDescription,
                due: taskDue,
                estimate: taskEstimate,
                isComplete: false,
                completionDate: null
            })
            taskAdd(task);
            router.navigate('/')
            toastSuccessHandler();
        } else {
            toastErrorHandler()
        }
    }

    return (
        <VStack className='gap-5 mx-5 mt-5'>
            <Heading>New Task</Heading>
            <VStack space="xs">
                <Text className="text-typography-500">Task title</Text>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField value={taskTitle} onChangeText={setTaskTitle} placeholder="" />
                </Input>
            </VStack>
            <VStack>
                <Text className="text-typography-500">Task description</Text>
                <Textarea
                    size="md"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                >
                    <TextareaInput value={taskDescription} onChangeText={setTaskDescription} placeholder="" />
                </Textarea>
            </VStack>
            <VStack>
                <Text className="text-typography-500">Task due date: </Text>
                <TaskDateTimePicker selectedDate={taskDue} setSelectedDate={setTaskDue} />
            </VStack>
            <VStack>
                <Text className='text-typography-500'>Task estimate(number in mins): </Text>
                <Input
                    variant='outline'
                    size='md'
                    isDisabled={false}
                    isReadOnly={false}
                    isInvalid={false}
                >
                    <InputField value={taskEstimate?.toString() || ''} onChangeText={handleEstimate} type='text'
                        keyboardType="number-pad" />
                </Input>
            </VStack>
            <Button onPress={handleTaskCreation}>
                <ButtonText>Add task</ButtonText>
                <ButtonIcon as={AddIcon} />
            </Button>
            {/* <TaskToast action='error' title='Error!' message='Please fill in task title and task description' /> */}
            {/* <TaskToast action='success' title='Task Added!' message='All good!' /> */}
        </VStack>
    );
}

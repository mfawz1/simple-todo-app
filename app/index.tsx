import { View, StyleSheet, ScrollView } from "react-native";
import { TaskCard } from "@/components/task-card";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { AddIcon } from "@/components/ui/icon";
import { useRouter } from 'expo-router';
import { useAppContext } from "@/contexts/AppContext";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";



export default function Index() {
    const router = useRouter();
    const context = useAppContext();
    return (
        <View
            style={styles.container}
        >
            <Button size="lg" className="rounded-lg ml-auto mr-3 mt-3" onPress={() => { router.navigate('/add-task') }}>
                <ButtonText>Add task</ButtonText>
                <ButtonIcon as={AddIcon} />
            </Button>

            <Heading className="px-3 pb-3">Tasks:</Heading>

            {
                context.tasks.length > 0 ?
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={true}>
                            {
                                context.tasks.map(task => <TaskCard key={task.id} task={task} />)
                            }
                        </ScrollView>
                    </View>
                    :
                    <Text size="lg" className="mt-10 text-center"> No Tasks to show </Text>
            }
        </View >
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1
        },
    }
)

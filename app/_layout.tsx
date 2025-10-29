import { Stack } from "expo-router";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { AppContextProvider } from "@/contexts/AppContext";

export default function RootLayout() {
    return (
        <GluestackUIProvider mode="light">
            <AppContextProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ title: 'Home' }} />
                    <Stack.Screen name="about" options={{ title: 'About' }} />
                    <Stack.Screen name="add-task" options={{ title: 'Add Task' }} />
                </Stack>
            </AppContextProvider>
        </GluestackUIProvider>
    );
}

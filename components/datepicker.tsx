import { View, Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { CalendarDaysIcon } from './ui/icon';
import { useState } from 'react';
import { Text } from '@/components/ui/text'
import { format } from 'date-fns';

type DateStateType = ReturnType<typeof useState<Date | undefined>>;
const TaskDateTimePicker = ({ selectedDate, setSelectedDate }: { selectedDate: DateStateType[0], setSelectedDate: DateStateType[1] }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setSelectedDate(date);
        hideDatePicker();
    };
    const handleWebDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(new Date(e.target.value));
    }

    return (
        <View>
            {Platform.OS === 'web' ? (
                // Web: Use native HTML5 input
                <input
                    type="datetime-local"
                    value={format(selectedDate ?? new Date(), "yyyy-MM-dd'T'HH:mm")}
                    onChange={handleWebDate}
                    style={{
                        padding: 10,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    }}
                />
            ) : (
                <>
                    <Button onPress={showDatePicker}>
                        <ButtonIcon as={CalendarDaysIcon} />
                        <ButtonText>Pick date & time</ButtonText>
                    </Button>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        date={selectedDate}
                    />
                    <Text>Selected: {selectedDate?.toLocaleDateString()}</Text>
                </>
            )}

        </View>
    );
};


export { TaskDateTimePicker }

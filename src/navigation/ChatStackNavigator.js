import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const Stack = createStackNavigator();

function ChatStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="ChatList">
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
    );
}

export default ChatStackNavigator;

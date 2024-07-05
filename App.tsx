import { UserProvider } from "@/context/userDataContext";
import StackNavigator from "@/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <StackNavigator />
      </UserProvider>
    </NavigationContainer>
  );
}

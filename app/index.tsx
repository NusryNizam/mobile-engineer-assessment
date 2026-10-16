import { View } from "@/src/components/Themed";
import { Spacing } from "@/src/tokens/spacing";
import { StyleSheet, Text } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
});

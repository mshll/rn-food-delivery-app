import { StyleSheet, Text, View } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';

const Explore = () => {
  return (
    <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21" useTopPadding={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Explore</Text>
      </View>
    </CustomStatusBar>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#d3e8d6',
    fontSize: 38,
    fontWeight: '700',
  },
});

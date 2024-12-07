import { useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomStatusBar = ({ children, statusBgColor = '#fff', barStyle = 'default', bgColor = '#fff', useTopPadding = false }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <Fragment>
      <StatusBar backgroundColor={statusBgColor} barStyle={barStyle} />
      <View style={{ flex: 0, backgroundColor: statusBgColor, paddingTop: useTopPadding ? insets.top : 0 }} />
      <View style={{ flex: 1, backgroundColor: bgColor }}>{children}</View>
      {/* <View style={{ flex: 1, backgroundColor: bgColor, paddingBottom: insets.bottom }}>{children}</View> */}
    </Fragment>
  );
};

export default CustomStatusBar;

import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button({ onPress, title, bgColor = '#f7ffae', color = '#1b1d21', children }) {
  return (
    <Pressable style={({ pressed }) => [styles.button, { backgroundColor: bgColor }, pressed && styles.pressed]} onPress={onPress}>
      {children ? children : <Text style={[styles.text, { color }]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 100,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  pressed: {
    opacity: 0.5,
  },
});

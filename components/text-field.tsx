import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label: string;
  helperText?: string;
  errorText?: string;
}

export const TextField = React.forwardRef<TextInput, TextFieldProps>(
  ({ label, helperText, errorText, style, ...props }, ref) => {
    const bottomText = errorText || helperText;
    const bottomStyle = errorText ? styles.errorText : styles.helperText;

    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor="#999"
          {...props}
        />
        <View style={styles.bottomTextContainer}>
          {bottomText ? <Text style={bottomStyle}>{bottomText}</Text> : null}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bottomTextContainer: {
    minHeight: 18,
    marginTop: 4,
  },
  helperText: {
    color: "#666",
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

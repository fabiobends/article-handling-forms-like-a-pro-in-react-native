import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
}

export const Button = ({ label, loading, disabled, ...props }: ButtonProps) => {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      {...props}
      style={[styles.button, isDisabled && styles.buttonDisabled]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A0CFFF",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

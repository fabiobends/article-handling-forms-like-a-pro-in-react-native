import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";

const SuperiorBlock = () => (
  <View style={styles.brand}>
    <MaterialIcons name="bolt" size={48} color="#007AFF" />
    <Text style={styles.brandName}>Acme</Text>
  </View>
);

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules: Record<keyof FormData, (value: string) => string | undefined> = {
  firstName: (value) =>
    value.length === 0 ? "First name is required" : undefined,
  lastName: (value) =>
    value.length === 0 ? "Last name is required" : undefined,
  email: (value) =>
    !emailRegex.test(value) ? "Enter a valid email" : undefined,
  password: (value) =>
    value.length < 8 ? "Password must be at least 8 characters" : undefined,
};

export default function Screen() {
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });

  const onChangeField = (field: keyof FormData) => (value: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: rules[field](value),
    }));
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = () => console.log("submitting to API", data);

  return (
    <View style={styles.centered}>
      <SuperiorBlock />
      <View style={styles.form}>
        <TextField
          label="First Name"
          value={data.firstName}
          errorText={errors.firstName}
          onChangeText={onChangeField("firstName")}
          textContentType="givenName"
          autoComplete="given-name"
        />
        <TextField
          label="Last Name"
          value={data.lastName}
          errorText={errors.lastName}
          onChangeText={onChangeField("lastName")}
          textContentType="familyName"
          autoComplete="family-name"
        />
        <TextField
          label="Email"
          value={data.email}
          errorText={errors.email}
          onChangeText={onChangeField("email")}
          textContentType="emailAddress"
          autoComplete="email"
          keyboardType="email-address"
        />
        <TextField
          label="Password"
          value={data.password}
          errorText={errors.password}
          onChangeText={onChangeField("password")}
          textContentType="password"
          autoComplete="password"
          secureTextEntry
        />
        <Button label="Submit" onPress={onSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  brand: {
    alignItems: "center",
    marginBottom: 24,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007AFF",
    letterSpacing: 2,
  },
  form: {
    gap: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

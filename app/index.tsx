import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";

const SuperiorBlock = () => (
  <View style={styles.brand}>
    <MaterialIcons name="bolt" size={48} color="#007AFF" />
    <Text style={styles.brandName}>Acme</Text>
  </View>
);

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Screen() {
  const [loading, setLoading] = useState(false);

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    console.log("submitting to API", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  });

  return (
    <>
      <SafeAreaView style={styles.safe} edges={["bottom"]}>
        <KeyboardAwareScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          bottomOffset={Platform.OS === "ios" ? 20 : 65}
          keyboardShouldPersistTaps="handled"
        >
          <SuperiorBlock />
          <View style={styles.form}>
            <Controller
              control={control}
              name="firstName"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="First Name"
                  placeholder="John"
                  helperText="As it appears on your ID"
                  errorText={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                  returnKeyType="next"
                  autoComplete="given-name"
                  textContentType="givenName"
                  autoCapitalize="words"
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  ref={lastNameRef}
                  label="Last Name"
                  placeholder="Doe"
                  helperText="As it appears on your ID"
                  errorText={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  returnKeyType="next"
                  autoComplete="family-name"
                  textContentType="familyName"
                  autoCapitalize="words"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  ref={emailRef}
                  label="Email"
                  placeholder="john@example.com"
                  helperText="We'll never share your email"
                  errorText={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  returnKeyType="next"
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  ref={passwordRef}
                  label="Password"
                  placeholder="Minimum 8 characters"
                  helperText="Use letters, numbers and symbols"
                  errorText={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={onSubmit}
                  returnKeyType="done"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
            />
            <Button label="Submit" onPress={onSubmit} loading={loading} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <KeyboardToolbar />
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    gap: 8,
  },
});

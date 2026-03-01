import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import useSignup from './useSignup';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const SignupScreen = ({ navigation }) => {
    const {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading, error, handleSignup,
    } = useSignup();

    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled">

                    {/* Top Icon */}
                    <View style={styles.iconCircle}>
                        <Text style={styles.iconEmoji}>📷</Text>
                    </View>

                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join us to get started</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <AppInput
                        label="Full Name"
                        // icon="👤"
                        value={name}
                        onChangeText={setName}
                        placeholder="John Doe"
                        autoCapitalize="words"
                    />

                    <AppInput
                        label="Email"
                        // icon="✉️"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="your@email.com"
                    />

                    <AppInput
                        label="Password"
                        // icon="🔒"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Min. 8 characters"
                        secureText
                    />

                    <AppInput
                        label="Confirm Password"
                        // icon="🔒"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="••••••••"
                        secureText
                    />

                    <AppButton
                        title="REGISTER"
                        variant="auth"
                        loading={loading}
                        onPress={handleSignup}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.footerLink}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 50,
        paddingBottom: 40,
    },
    iconCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#EEF2FF',
        borderWidth: 3,
        borderColor: colors.authPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconEmoji: { fontSize: 36 },
    title: {
        ...typography.h1,
        color: colors.textPrimary,
        marginBottom: 6,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 28,
    },
    errorText: {
        ...typography.bodySmall,
        color: colors.error,
        marginBottom: 12,
        textAlign: 'center',
    },
    button: {
        marginTop: 8,
        marginBottom: 24,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    footerLink: {
        ...typography.bodySmall,
        fontWeight: '700',
        color: colors.authPrimary,
        letterSpacing: 1,
    },
});

export default SignupScreen;

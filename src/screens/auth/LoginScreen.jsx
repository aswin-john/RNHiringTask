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
import Icon from 'react-native-vector-icons/Ionicons';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import useLogin from './useLogin';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const LoginScreen = ({ navigation }) => {
    const { email, setEmail, password, setPassword, loading, error, handleLogin } = useLogin();

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
                        <Icon name="person-outline" size={40} color={colors.authPrimary} />
                    </View>

                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
                        placeholder="••••••••"
                        secureText
                    />

                    <Text style={styles.forgotText}>Forgot your password?</Text>

                    <AppButton
                        title="LOGIN"
                        variant="auth"
                        loading={loading}
                        onPress={handleLogin}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.footerLink}>REGISTER</Text>
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
        paddingTop: 60,
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
        marginBottom: 24,
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
        marginBottom: 32,
    },
    errorText: {
        ...typography.bodySmall,
        color: colors.error,
        marginBottom: 16,
        textAlign: 'center',
    },
    forgotText: {
        alignSelf: 'flex-end',
        ...typography.bodySmall,
        color: colors.textMuted,
        marginBottom: 32,
    },
    button: {
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

export default LoginScreen;

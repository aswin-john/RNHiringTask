import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

/**
 * AppButton — styled pill-shaped button with loading state.
 *
 * Props:
 *  title       - button label text
 *  onPress     - press handler
 *  loading     - bool: shows spinner when true
 *  variant     - 'primary' (default) | 'auth' (soft blue) | 'outline'
 *  style       - additional container style overrides
 */
const AppButton = ({
    title,
    onPress,
    loading = false,
    variant = 'primary',
    style,
}) => {
    const bg =
        variant === 'auth'
            ? colors.authPrimary
            : variant === 'outline'
                ? 'transparent'
                : colors.primary;

    const textColor =
        variant === 'outline' ? colors.primary : '#FFFFFF';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: bg },
                variant === 'outline' && styles.outline,
                loading && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.85}>
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 100,
        paddingVertical: 16,
        alignItems: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    outline: {
        borderWidth: 2,
        borderColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
    },
    disabled: {
        opacity: 0.7,
    },
    text: {
        ...typography.button,
        letterSpacing: 1.5,
    },
});

export default AppButton;

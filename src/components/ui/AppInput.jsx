import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

/**
 * AppInput — reusable form input with optional password show/hide toggle.
 *
 * Props:
 *  label       - string label shown above the input
 *  icon        - emoji or string shown as a prefix label icon
 *  secureText  - boolean: if true, enables password mode with eye toggle
 *  ...rest     - all other TextInput props (value, onChangeText, etc.)
 */
const AppInput = ({ label, icon, secureText = false, style, ...rest }) => {
    const [isSecure, setIsSecure] = useState(secureText);

    return (
        <View style={[styles.group, style]}>
            {label ? (
                <Text style={styles.label}>
                    {icon ? `${icon}  ` : ''}{label}
                </Text>
            ) : null}
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={isSecure}
                    autoCorrect={false}
                    {...rest}
                />
                {secureText && (
                    <TouchableOpacity
                        onPress={() => setIsSecure(prev => !prev)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Text style={styles.eyeIcon}>{isSecure ? '👁️' : '🙈'}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    group: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        ...typography.label,
        color: colors.textPrimary,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: colors.border,
    },
    input: {
        flex: 1,
        ...typography.body,
        color: colors.textPrimary,
        paddingVertical: 10,
        paddingHorizontal: 0,
    },
    eyeIcon: {
        fontSize: 18,
        paddingLeft: 8,
    },
});

export default AppInput;

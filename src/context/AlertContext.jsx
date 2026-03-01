import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

const AlertContext = createContext(null);

/**
 * Global alert state provider. Wrap your app with this.
 * Use the `useAlert()` hook to show alerts from anywhere.
 */
export const AlertProvider = ({ children }) => {
    const [alertConfig, setAlertConfig] = useState(null);

    const showAlert = useCallback((title, message, buttons = [{ text: 'OK' }]) => {
        setAlertConfig({ title, message, buttons });
    }, []);

    const dismiss = useCallback(() => setAlertConfig(null), []);

    const handleButton = (onPress) => {
        dismiss();
        if (onPress) onPress();
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            <Modal
                visible={!!alertConfig}
                transparent
                animationType="fade"
                statusBarTranslucent
                onRequestClose={dismiss}>
                <Pressable style={styles.backdrop} onPress={dismiss}>
                    <Pressable style={styles.card} onPress={() => { }}>
                        {/* Accent bar */}
                        <View style={styles.accentBar} />

                        <View style={styles.body}>
                            {alertConfig?.title ? (
                                <Text style={styles.title}>{alertConfig.title}</Text>
                            ) : null}
                            {alertConfig?.message ? (
                                <Text style={styles.message}>{alertConfig.message}</Text>
                            ) : null}
                        </View>

                        {/* Buttons */}
                        <View style={styles.divider} />
                        <View style={[
                            styles.buttons,
                            alertConfig?.buttons?.length > 1 && styles.buttonsRow,
                        ]}>
                            {alertConfig?.buttons?.map((btn, i) => {
                                const isDestructive = btn.style === 'destructive';
                                const isCancel = btn.style === 'cancel';
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        style={[
                                            styles.btn,
                                            alertConfig.buttons.length > 1 && styles.btnFlex,
                                            i > 0 && styles.btnBorderLeft,
                                            isDestructive && styles.btnDestructive,
                                        ]}
                                        activeOpacity={0.7}
                                        onPress={() => handleButton(btn.onPress)}>
                                        <Text style={[
                                            styles.btnText,
                                            isDestructive && styles.btnTextDestructive,
                                            isCancel && styles.btnTextCancel,
                                        ]}>
                                            {btn.text}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error('useAlert must be used within AlertProvider');
    return ctx;
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    card: {
        width: '100%',
        backgroundColor: colors.surface,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
    },
    accentBar: {
        height: 4,
        backgroundColor: colors.primary,
    },
    body: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        ...typography.h3,
        color: colors.textPrimary,
        marginBottom: 8,
    },
    message: {
        ...typography.body,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
    },
    buttons: {
        flexDirection: 'column',
    },
    buttonsRow: {
        flexDirection: 'row',
    },
    btn: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnFlex: {
        flex: 1,
    },
    btnBorderLeft: {
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
    },
    btnDestructive: {
        backgroundColor: '#FFF5F5',
    },
    btnText: {
        ...typography.button,
        color: colors.primary,
        fontSize: 15,
    },
    btnTextDestructive: {
        color: colors.error,
    },
    btnTextCancel: {
        color: colors.textSecondary,
        fontWeight: '400',
    },
});

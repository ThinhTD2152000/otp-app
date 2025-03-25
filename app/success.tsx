import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Success() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={require("../assets/images/success.jpg")} style={styles.image} />
                <Text style={styles.title}>Verified</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: "(tabs)" }]
                })}>
                    <Text style={styles.buttonText}>Trang chủ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
    },
    card: {
        backgroundColor: "#fff",
        width: '90%',
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: 300,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#66b1ed",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

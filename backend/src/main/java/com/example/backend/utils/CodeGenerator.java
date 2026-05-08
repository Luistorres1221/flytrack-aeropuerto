package com.example.backend.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class CodeGenerator {

    private static final SecureRandom random = new SecureRandom();
    private static final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static String generateFlightCode() {
        return generateRandomString(6);
    }

    public static String generateBaggageCode() {
        return "EQ" + generateRandomString(8);
    }

    public static String generateNotificationCode() {
        return "NT" + generateRandomString(10);
    }

    private static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(ALPHANUMERIC.charAt(random.nextInt(ALPHANUMERIC.length())));
        }
        return sb.toString();
    }

    public static String generateSecureToken() {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
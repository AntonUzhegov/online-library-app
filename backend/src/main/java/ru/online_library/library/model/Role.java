package ru.online_library.library.model;

public enum Role {
    USER("Обычный пользователь"),
    ADMIN("Администратор");

    private final String value;

    Role(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }

    public static Role fromString(String text) {
        if (text == null) return USER;
        for (Role role : Role.values()) {
            if (role.name().equalsIgnoreCase(text)) {
                return role;
            }
        }
        return USER;
    }
}
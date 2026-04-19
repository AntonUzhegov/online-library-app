package ru.online_library.library.model;

public enum Role {
    ROLE_USER("Обычный пользователь"),
    ROLE_ADMIN("Администратор");

    private final String value;

    Role(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }

    public static Role fromString(String text) {
        if (text == null) return ROLE_USER;
        for (Role role : Role.values()) {
            if (role.name().equalsIgnoreCase(text)) {
                return role;
            }
        }
        return ROLE_USER;
    }
}
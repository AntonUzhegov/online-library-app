package ru.online_library.library.model;

public enum LoanStatus {
    ACTIVE("Активна"),
    RETURNED("Возвращена"),
    OVERDUE("Просрочена");

    private final String description;

    LoanStatus(String description){
        this.description = description;
    }

    public String getDescription(){
        return description;
    }
}
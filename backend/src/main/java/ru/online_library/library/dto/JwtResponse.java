package ru.online_library.library.dto;

public class JwtResponse {
    private String token;
    private String type = "Bearer";

    public JwtResponse(String token){
        this.token=token;
    }
}

package ru.online_library.library.controller;

import ru.online_library.library.dto.JwtResponse;
import ru.online_library.library.dto.LoginRequest;
import ru.online_library.library.dto.MessageResponse;
import ru.online_library.library.dto.RegisterRequest;
import ru.online_library.library.model.User;
import ru.online_library.library.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(@RequestBody RegisterRequest request) {
        User user = authService.register(
                request.getUsername(),
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName()
        );
        return ResponseEntity.ok(new MessageResponse("User registered successfully: " + user.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        String token = authService.authenticate(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
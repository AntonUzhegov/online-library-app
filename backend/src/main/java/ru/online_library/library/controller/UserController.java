package ru.online_library.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.online_library.library.model.User;
import ru.online_library.library.repository.UserRepository;
import ru.online_library.library.service.AuthService;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            User user = authService.getCurrentUser();
            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName(),
                    "role", user.getRole().name(),
                    "registrationDate", user.getRegistrationDate(),
                    "isActive", user.isActive()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String username,
                                            @RequestBody Map<String, String> request) {
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        return userRepository.findByUsername(username)
                .map(user -> {
                    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                        return ResponseEntity.badRequest().body(Map.of("error", "Старый пароль неверен"));
                    }

                    if (newPassword.length() < 6) {
                        return ResponseEntity.badRequest().body(Map.of("error", "Новый пароль должен быть не менее 6 символов"));
                    }

                    user.setPassword(passwordEncoder.encode(newPassword));
                    userRepository.save(user);

                    return ResponseEntity.ok(Map.of("message", "Пароль успешно изменён"));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of("error", "Пользователь не найден")));
    }
}

package ru.online_library.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.online_library.library.repository.UserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String username){
        return userRepository.findByUsername(username)
                .map(user -> ResponseEntity.ok(Map.of(
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "firstName", user.getFirstName(),
                        "lastName", user.getLastName(),
                        "registrationDate", user.getRegistrationDate()
                )))
                .orElse(ResponseEntity.badRequest().body(Map.of("error", "Пользователь не найден")));
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

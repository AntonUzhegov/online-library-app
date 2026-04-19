package ru.online_library.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.online_library.library.dto.ChangePasswordRequest;
import ru.online_library.library.dto.MessageResponse;
import ru.online_library.library.dto.UserDTO;
import ru.online_library.library.model.User;
import ru.online_library.library.repository.UserRepository;
import ru.online_library.library.service.AuthService;
import ru.online_library.library.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(userService.getUserProfile(user));
    }

    @PutMapping("/change-password")
    public ResponseEntity<MessageResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        User currentUser = authService.getCurrentUser();
        userService.changePassword(currentUser, request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok(new MessageResponse("Пароль успешно изменён"));
    }
}

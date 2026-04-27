package ru.online_library.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.online_library.library.dto.UserDTO;
import ru.online_library.library.model.Role;
import ru.online_library.library.model.User;
import ru.online_library.library.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void changePassword(User user, String oldPassword, String newPassword) {
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Старый пароль неверен");
        }
        if (newPassword == null || newPassword.length() < 6) {
            throw new RuntimeException("Новый пароль должен быть не менее 6 символов");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public UserDTO getUserProfile(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().name(),
                user.getRegistrationDate(),
                user.isActive()
        );
    }
    // Список всех пользователей (для админа)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getRole().name(),
                        user.getRegistrationDate(),
                        user.isActive()
                ))
                .collect(Collectors.toList());
    }

    // Изменить роль пользователя
    public UserDTO changeUserRole(Long userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        try {
            Role role = Role.valueOf(newRole);
            user.setRole(role);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Неверная роль: " + newRole + ". Доступны: ROLE_USER, ROLE_ADMIN, ROLE_LIBRARIAN");
        }

        userRepository.save(user);
        return getUserProfile(user);
    }

    // Заблокировать/разблокировать пользователя
    public UserDTO toggleUserActive(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        user.setActive(!user.isActive());
        userRepository.save(user);
        return getUserProfile(user);
    }
}

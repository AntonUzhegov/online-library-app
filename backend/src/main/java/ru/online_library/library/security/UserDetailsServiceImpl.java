package ru.online_library.library.security;


import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.online_library.library.model.User;
import ru.online_library.library.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

        System.out.println("Пользователь: " + username + ", isActive: " + user.isActive());

        if (!user.isActive()) {
            System.out.println("Бросаем DisabledException");
            throw new DisabledException("Ваш аккаунт заблокирован. Обратитесь к администратору.");
        }

        return UserDetailsImpl.build(user);
    }
}

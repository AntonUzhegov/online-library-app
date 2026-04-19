package ru.online_library.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.online_library.library.dto.AuthorDTO;
import ru.online_library.library.model.Author;
import ru.online_library.library.repository.AuthorRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll()
                .stream()
                .map(a -> new AuthorDTO(a.getId(), a.getFirstName(), a.getLastName()))
                .collect(Collectors.toList());
    }

    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }
}

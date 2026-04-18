package ru.online_library.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.online_library.library.dto.BookDTO;
import ru.online_library.library.model.Book;
import ru.online_library.library.model.Category;
import ru.online_library.library.repository.BookRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    private BookDTO convertToDTO(Book book){

        Set<String> authorsNames = book.getAuthors().stream()
                .map(author -> author.getFirstName() + " " + author.getLastName())
                .collect(Collectors.toSet());

        Set<String> categoryNames = book.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toSet());

        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getIsbn(),
                book.getPublicationYear(),
                book.getPublisher(),
                book.getAvailable(),
                book.getCoverImage(),
                authorsNames,
                categoryNames
        );
    }

    public List<BookDTO> getAllBooks(){
        return bookRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
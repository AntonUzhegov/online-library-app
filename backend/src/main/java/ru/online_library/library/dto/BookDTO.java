package ru.online_library.library.dto;

import ru.online_library.library.model.Category;
import java.util.Set;

public class BookDTO {

    private Long id;
    private String title;
    private String isbn;
    private Integer publicationYear;
    private String publisher;
    private boolean available;
    private String coverImage;
    private Set<String> authors;
    private Set<String> categories;
    private String borrowedBy;  // ФИО пользователя, который взял книгу (null если доступна)

    public BookDTO(){}

    public BookDTO(Long id, String title, String isbn,
                   Integer publicationYear, String publisher,
                   boolean available, String coverImage,
                   Set<String> authors, Set<String> categories, String borrowedBy) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.publicationYear = publicationYear;
        this.publisher = publisher;
        this.available = available;
        this.coverImage = coverImage;
        this.authors = authors;
        this.categories = categories;
        this.borrowedBy = borrowedBy;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getPublicationYear() {
        return publicationYear;
    }
    public void setPublicationYear(Integer publicationYear) {
        this.publicationYear = publicationYear;
    }

    public String getPublisher() {
        return publisher;
    }
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public boolean isAvailable() {
        return available;
    }
    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getCoverImage() {
        return coverImage;
    }
    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public Set<String> getAuthors() {
        return authors;
    }
    public void setAuthors(Set<String> authors) {
        this.authors = authors;
    }

    public Set<String> getCategories() {
        return categories;
    }
    public void setCategories(Set<String> categories) {
        this.categories = categories;
    }

    public String getBorrowedBy() {
        return borrowedBy;
    }
    public void setBorrowedBy(String borrowedBy) {
        this.borrowedBy = borrowedBy;
    }
}

package ru.online_library.library.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDTO {
    private Long loanId;
    private Long bookId;
    private String bookTitle;
    private String coverImage;
    private LocalDateTime loanDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;
    private String status;
    private String borrowedBy;
}
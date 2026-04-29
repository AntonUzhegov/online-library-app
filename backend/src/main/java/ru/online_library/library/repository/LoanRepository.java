package ru.online_library.library.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.online_library.library.model.Loan;
import ru.online_library.library.model.LoanStatus;
import ru.online_library.library.model.User;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserAndStatusIn(User user, List<LoanStatus> statuses);

    int countByUserAndStatusIn(User user, List<LoanStatus> statuses);

    boolean existsByUserAndStatus(User user, LoanStatus status);

    Loan findByBook_IdAndStatusIn(Long bookId, List<LoanStatus> statuses);

    List<Loan> findAllByOrderByLoanDateDesc();

    List<Loan> findByStatus(LoanStatus status);

    List<Loan> findByStatusIn(List<LoanStatus> statuses);

    long countByStatus(LoanStatus status);

    List<Loan> findByBook_Id(Long bookId);

    @Query("SELECT b, COUNT(l) FROM Book b LEFT JOIN Loan l ON b = l.book GROUP BY b ORDER BY COUNT(l) DESC")
    List<Object[]> findPopularBooks();

    @Query("SELECT FUNCTION('DATE_FORMAT', l.loanDate, '%Y-%m') as month, " +
            "COUNT(l) as loans, " +
            "SUM(CASE WHEN l.returnDate IS NOT NULL THEN 1 ELSE 0 END) as returns " +
            "FROM Loan l " +
            "GROUP BY FUNCTION('DATE_FORMAT', l.loanDate, '%Y-%m') " +
            "ORDER BY month DESC")
    List<Object[]> getMonthlyStatistics(Pageable pageable);
}
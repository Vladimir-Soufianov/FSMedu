package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book ,Long> {

}

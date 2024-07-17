package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto);
    BookDto getBookById(long bookId);
    List<BookDto> getAllBooks();
    BookDto updateBook(Long bookId, BookDto updatedBook);
    void deleteBook(Long bookId);
}

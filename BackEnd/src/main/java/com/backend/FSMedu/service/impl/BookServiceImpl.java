package com.backend.FSMedu.service.impl;
import com.backend.FSMedu.dto.BookDto;
import com.backend.FSMedu.entity.Book;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.BookMapper;
import com.backend.FSMedu.repository.BookRepository;
import com.backend.FSMedu.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {
    private  BookRepository bookRepository;

    @Override
    public BookDto createBook(BookDto bookDto) {
        Book book = BookMapper.mapToBook(bookDto);
        Book savedBook = bookRepository.save(book);
        return BookMapper.mapToBookDto(savedBook);
    }

    @Override
    public BookDto getBookById(long bookId) {
        Book book =bookRepository.findById(bookId).orElseThrow(
                        ()-> new ResourceNotFoundException("Pas de livres "));
        return BookMapper.mapToBookDto(book);
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream().map((book) -> BookMapper.mapToBookDto(book)).collect(Collectors.toList());
    }

    @Override
    public BookDto updateBook(Long bookId, BookDto updatedBook) {
        Book book =bookRepository.findById(bookId).orElseThrow(()-> new ResourceNotFoundException("Book non existant"));
        book.setTitre(updatedBook.getTitre() != null ? updatedBook.getTitre() : book.getTitre());
        book.setAuteur(updatedBook.getAuteur() != null ? updatedBook.getAuteur() : book.getAuteur());
        book.setCategory(updatedBook.getCategory() != null ? updatedBook.getCategory() : book.getCategory());
        book.setDescription(updatedBook.getDescription() != null ? updatedBook.getDescription() : book.getDescription());
        book.setDispo(updatedBook.isDispo());



        Book updatedBookObj = bookRepository.save(book);
        return BookMapper.mapToBookDto(updatedBookObj);
    }

    @Override
    public void deleteBook(Long bookId) {
        Book book =bookRepository.findById(bookId).orElseThrow(()-> new ResourceNotFoundException("Book non existant"));
        bookRepository.deleteById(bookId);
    }

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}

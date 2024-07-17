package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.BookDto;
import com.backend.FSMedu.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto){
        BookDto savedBook = bookService.createBook(bookDto);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable("id") Long bookId){
       BookDto bookDto = bookService.getBookById((bookId));
        return ResponseEntity.ok(bookDto);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks(){
        List<BookDto> books= bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PostMapping("{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable("id") Long bookId,@RequestBody BookDto updatedBook){
        BookDto bookDto= bookService.updateBook(bookId,updatedBook);
        return ResponseEntity.ok(bookDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBook (@PathVariable("id") Long bookId){
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("Deleted succesfully");
    }

}

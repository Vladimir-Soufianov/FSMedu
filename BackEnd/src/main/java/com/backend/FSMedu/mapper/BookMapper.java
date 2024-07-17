package com.backend.FSMedu.mapper;
import com.backend.FSMedu.dto.BookDto;
import com.backend.FSMedu.entity.Book;

public class BookMapper {
    public static BookDto mapToBookDto(Book book){
        return new BookDto(
                book.getId(),
                book.getTitre(),
                book.getAuteur(),
                book.getDescription(),
                book.getCategory(),
                book.isDispo(),
                book.getCmmnt()
        )
        ;
    }
    public static Book mapToBook(BookDto bookDto){
        return new Book(
                bookDto.getId(),
                bookDto.getTitre(),
                bookDto.getAuteur(),
                bookDto.getDescription(),
                bookDto.getCategory(),
                bookDto.isDispo(),
                bookDto.getCmmnt()
        );
    }
}

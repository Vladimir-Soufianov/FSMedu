package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.RendezvouDto;
import com.backend.FSMedu.service.RendezvousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rendezvous")
public class RendezvousController {

    @Autowired
    private RendezvousService rendezvousService;

    @GetMapping
    public ResponseEntity<List<RendezvouDto>> getAllRendezvous() {
        List<RendezvouDto> rendezvousList = rendezvousService.getAllRendezvous();
        return ResponseEntity.ok(rendezvousList);
    }

    @PostMapping
    public ResponseEntity<RendezvouDto> createRendezvous(@RequestBody RendezvouDto rendezvousDto) {
        RendezvouDto createdRendezvous = rendezvousService.createRendezvous(rendezvousDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRendezvous);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezvouDto> updateRendezvous(
            @PathVariable Long id,
            @RequestBody RendezvouDto updatedRendezvousDto) {
        RendezvouDto updatedRendezvous = rendezvousService.updateRendezvous(id, updatedRendezvousDto);
        return ResponseEntity.ok(updatedRendezvous);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRendezvous(@PathVariable Long id) {
        rendezvousService.deleteRendezvous(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/accept")
    public void acceptRendezvous(@PathVariable long id) {
        rendezvousService.acceptRendezvous(id);
    }

    @PostMapping("/{id}/refuse")
    public void refuseRendezvous(@PathVariable long id) {
        rendezvousService.refuseRendezvous(id);
    }
}

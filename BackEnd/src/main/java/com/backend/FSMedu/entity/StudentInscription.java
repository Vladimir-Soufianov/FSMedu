package com.backend.FSMedu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "inscription")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentInscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private byte[] bac;
    private byte[] cin;
    private byte[] pdp;

    private String region;
    private String obtbac; // anne obtention bac
}

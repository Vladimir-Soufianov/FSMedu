package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.dto.SemestreDto;
import com.backend.FSMedu.entity.*;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.ModMapper;
import com.backend.FSMedu.mapper.SemestreMapper;
import com.backend.FSMedu.repository.*;
import com.backend.FSMedu.service.ModService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ModServiceImpl implements ModService {

    private final ModRepository modRepository;
    private final SemestreRepository semestreRepository;
    private final ProfRepository profRepository;
    private final ChefDepartementRepository chefDepartementRepository;
    private final ChefFiliereRepository chefFiliereRepository;
    private final StudentRepository studentRepository;
    private final FiliereRepository filiereRepository;
    private final SeanceRepository seanceRepository;
    private final NoteRepository noteRepository;
    private final YearRepository yearRepository;

    @Autowired
    public ModServiceImpl(ModRepository modRepository,SemestreRepository semestreRepository,
                          ProfRepository profRepository,ChefDepartementRepository chefDepartementRepository,
                          ChefFiliereRepository chefFiliereRepository, StudentRepository studentRepository,
                          FiliereRepository filiereRepository, SeanceRepository seanceRepository
    ,NoteRepository noteRepository,YearRepository yearRepository) {
        this.modRepository = modRepository;
        this.semestreRepository=semestreRepository;
        this.seanceRepository=seanceRepository;
        this.studentRepository=studentRepository;
        this.profRepository=profRepository;
        this.chefDepartementRepository=chefDepartementRepository;
        this.chefFiliereRepository=chefFiliereRepository;
        this.filiereRepository=filiereRepository;
        this.noteRepository=noteRepository;
        this.yearRepository=yearRepository;
    }

    @Override
    @Transactional
    public ModDto createMod(ModDto newModDto) {
        Mod mod = new Mod();

        // Set fields from ModDto to Mod entity
        mod.setNom(newModDto.getNom());

        if (newModDto.getSemestreId() != null) {
            Semestre semestre = semestreRepository.findById(newModDto.getSemestreId())
                    .orElseThrow(() -> new ResourceNotFoundException("Semestre not found with ID: " + newModDto.getSemestreId()));
            mod.setSemestre(semestre);
        }

        if (newModDto.getChefdepId() != null) {
            ChefDepartement chefdep = chefDepartementRepository.findById(newModDto.getChefdepId())
                    .orElseThrow(() -> new ResourceNotFoundException("Chefdep not found with ID: " + newModDto.getChefdepId()));
            mod.setChefdep(chefdep);
        }

        if (newModDto.getCheffilId() != null) {
            ChefFiliere cheffil = chefFiliereRepository.findById(newModDto.getCheffilId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cheffil not found with ID: " + newModDto.getCheffilId()));
            mod.setCheffil(cheffil);
        }

        if (newModDto.getProfId() != null) {
            Prof prof = profRepository.findById(newModDto.getProfId())
                    .orElseThrow(() -> new ResourceNotFoundException("Prof not found with ID: " + newModDto.getProfId()));
            mod.setProf(prof);
        }

        if (newModDto.getFiliereId() != null ) {
            Filiere filiere = filiereRepository.findById(newModDto.getFiliereId())
                    .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + newModDto.getFiliereId()));
            mod.setFiliere(filiere);
        }

        if (newModDto.getStudentIds() != null && !newModDto.getStudentIds().isEmpty()) {
            List<Student> students = newModDto.getStudentIds().stream()
                    .map(studentId -> studentRepository.findById(studentId)
                            .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId)))
                    .collect(Collectors.toList());
            mod.setStudents(students);

            // Fetch the year by its ID (replace with actual logic)
            Long yearId = 1L; // Replace with the actual ID you want to use
            Year year = yearRepository.findById(yearId)
                    .orElseThrow(() -> new ResourceNotFoundException("Year not found with id: " + yearId));

            // Create notes for each student in the mod
            students.forEach(student -> {
                Note note = new Note();
                note.setMod(mod);
                note.setStudent(student);
                note.setYear(year); // Set the year to the fetched year
                note.setNote(-1); // Set default note value, adjust as needed
                noteRepository.save(note);
            });
        }

        if (newModDto.getSeanceIds() != null && !newModDto.getSeanceIds().isEmpty()) {
            List<Seance> seances = newModDto.getSeanceIds().stream()
                    .map(seanceId -> seanceRepository.findById(seanceId)
                            .orElseThrow(() -> new ResourceNotFoundException("Seance not found with ID: " + seanceId)))
                    .collect(Collectors.toList());
            mod.setSeances(seances);
        } else {
            mod.setSeances(new ArrayList<>()); // Set an empty list if seanceIds is null or empty
        }

        Mod savedMod = modRepository.save(mod);
        return ModMapper.mapToModDto(savedMod);
    }

    @Override
    public ModDto getModById(long id) {
        Mod mod = modRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + id));
        return ModMapper.mapToModDto(mod);
    }

    @Override
    public List<ModDto> getAllMods() {
        List<Mod> mods = modRepository.findAll();
        return mods.stream().map(ModMapper::mapToModDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModDto updateMod(Long id, ModDto updatedMod) {
        // Fetch the existing mod entity by id
        Mod mod = modRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + id));

        // Update fields if provided in ModDto
        if (updatedMod.getNom() != null) {
            mod.setNom(updatedMod.getNom());
        }

        if (updatedMod.getSemestreId() != null) {
            Semestre semestre = semestreRepository.findById(updatedMod.getSemestreId())
                    .orElseThrow(() -> new ResourceNotFoundException("Semestre not found with ID: " + updatedMod.getSemestreId()));
            mod.setSemestre(semestre);
        }

        if (updatedMod.getChefdepId() != null) {
            ChefDepartement chefdep = chefDepartementRepository.findById(updatedMod.getChefdepId())
                    .orElseThrow(() -> new ResourceNotFoundException("Chefdep not found with ID: " + updatedMod.getChefdepId()));
            mod.setChefdep(chefdep);
        }

        // Update Filiere association
        if (updatedMod.getFiliereId() != null) {
            Filiere filiere = filiereRepository.findById(updatedMod.getFiliereId())
                    .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with ID: " + updatedMod.getFiliereId()));


            // Set the new filiere and add the mod to it
            mod.setFiliere(filiere);
            filiere.getMods().add(mod);
        }

        if (updatedMod.getProfId() != null) {
            Prof prof = profRepository.findById(updatedMod.getProfId())
                    .orElseThrow(() -> new ResourceNotFoundException("Prof not found with ID: " + updatedMod.getProfId()));
            mod.setProf(prof);
        }

        // Save the updated mod entity
        Mod updatedModObj = modRepository.save(mod);
        return ModMapper.mapToModDto(updatedModObj);
    }

    @Override
    @Transactional
    public ModDto addStudentToMod(Long modId, Long studentId) {
        Mod mod = modRepository.findById(modId)
                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + modId));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        mod.getStudents().add(student);
        modRepository.save(mod);

        // Fetch the year by its ID (replace with actual logic)
        Long yearId = 1L; // Replace with the actual ID you want to use
        Year year = yearRepository.findById(yearId)
                .orElseThrow(() -> new ResourceNotFoundException("Year not found with id: " + yearId));

        // Create a note for the new student in the mod
        Note note = new Note();
        note.setMod(mod);
        note.setStudent(student);
        note.setYear(year); // Set the year to the fetched year
        note.setNote(-1); // Set default note value, adjust as needed
        noteRepository.save(note);

        return ModMapper.mapToModDto(mod);
    }


    @Override
    public void deleteMod(Long id) {
        Mod mod = modRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + id));
        modRepository.delete(mod);
    }

    @Override
    public SemestreDto getSemestreByModId(Long modId) {
        Mod mod = modRepository.findById(modId)
                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id " + modId));
        Semestre semestre = mod.getSemestre();
        if (semestre == null) {
            throw new ResourceNotFoundException("Semestre not found for Mod with id " + modId);
        }

        return SemestreMapper.mapToSemestreDto(semestre);
    }
}

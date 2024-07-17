package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.dto.SemestreDto;
import com.backend.FSMedu.entity.Mod;

import java.util.List;

public interface ModService {
    ModDto createMod(ModDto modDto);

    ModDto getModById(long id);

    List<ModDto> getAllMods();

    ModDto updateMod(Long id, ModDto updatedMod);

    void deleteMod(Long id);

    SemestreDto getSemestreByModId(Long modId);
    ModDto addStudentToMod(Long modId, Long studentId);
}

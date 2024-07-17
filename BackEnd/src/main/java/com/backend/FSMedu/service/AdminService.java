package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.AdminDto;

import java.util.List;

public interface AdminService {
    AdminDto createAdmin(AdminDto adminDto);
    AdminDto getAdminById(Long adminId);
    List<AdminDto> getAllAdmins();
    AdminDto updateAdmin(Long adminId,AdminDto updatedAdmin);
    void deleteAdmin(Long adminId);
    AdminDto findByCinAndMdp(String cin , String Mdp);
    AdminDto findByCinAndMatricule(String cin, String matricule);
    }


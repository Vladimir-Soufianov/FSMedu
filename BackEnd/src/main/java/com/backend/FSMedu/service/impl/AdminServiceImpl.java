package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.AdminDto;
import com.backend.FSMedu.entity.Admin;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.AdminMapper;
import com.backend.FSMedu.repository.AdminRepository;
import com.backend.FSMedu.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {
    private AdminRepository adminRepository;

    @Override
    public AdminDto findByCinAndMatricule(String cin, String matricule) {
        Admin admin = adminRepository.findByCinAndMatricule(cin, matricule);
        if (admin != null) {
            return AdminMapper.mapToAdminDto(admin);
        }
        return null; // Or throw an exception if required, depending on your application logic
    }

    @Override
    public AdminDto createAdmin(AdminDto adminDto) {
        Admin admin= AdminMapper.mapToAdmin(adminDto);
        Admin savedAdmin=adminRepository.save(admin);
        return AdminMapper.mapToAdminDto(savedAdmin);
    }

    @Override
    public AdminDto getAdminById(Long adminId) {
        Admin admin=adminRepository.findById(adminId)
                .orElseThrow(
                        ()->new ResourceNotFoundException("Pas d'admins")
                );
        return AdminMapper.mapToAdminDto(admin);
    }

    @Override
    public List<AdminDto> getAllAdmins() {
        List<Admin> admins=adminRepository.findAll();
        return admins.stream().map((admin)->AdminMapper.mapToAdminDto(admin)).collect(Collectors.toList());
    }

    @Override
    public AdminDto updateAdmin(Long adminId, AdminDto updatedAdmin) {
        Admin admin=adminRepository.findById(adminId)
                .orElseThrow(
                        ()->new ResourceNotFoundException("Pas d'admins")
                );
        admin.setNom(updatedAdmin.getNom() != null ? updatedAdmin.getNom() : admin.getNom());
        admin.setPrenom(updatedAdmin.getPrenom() != null ? updatedAdmin.getPrenom() : admin.getPrenom());
        admin.setCin(updatedAdmin.getCin() != null ? updatedAdmin.getCin() : admin.getCin());
        admin.setMatricule(updatedAdmin.getMatricule() != null ? updatedAdmin.getMatricule() : admin.getMatricule());
        admin.setRole(updatedAdmin.getRole() != null ? updatedAdmin.getRole() : admin.getRole());
        admin.setEmail(updatedAdmin.getEmail() != null ? updatedAdmin.getEmail() : admin.getEmail());
        admin.setMdp(updatedAdmin.getMdp() != null ? updatedAdmin.getMdp() : admin.getMdp());

        Admin updatedAdminObj = adminRepository.save(admin);
        return AdminMapper.mapToAdminDto(updatedAdminObj);

    }

    @Override
    public void deleteAdmin(Long adminId) {
        Admin admin=adminRepository.findById(adminId)
                .orElseThrow(
                        ()->new ResourceNotFoundException("Pas d'admins")
                );
        adminRepository.deleteById(adminId);
    }

    @Override
    public AdminDto findByCinAndMdp(String cin, String Mdp) {
        Admin admin=adminRepository.findByCinAndMdp(cin, Mdp);
        if(admin!=null){
            AdminDto adminDto=new AdminDto();
            adminDto.setId(admin.getId());
            adminDto.setNom(admin.getNom());
            adminDto.setPrenom(admin.getPrenom());
            adminDto.setCin(admin.getCin());
            adminDto.setMatricule(admin.getMatricule());
            adminDto.setRole(admin.getRole());
            adminDto.setEmail(admin.getEmail());
            adminDto.setMdp(admin.getMdp());
            return adminDto;
        }
        return null;
    }

    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository){
        this.adminRepository=adminRepository;
    }


}








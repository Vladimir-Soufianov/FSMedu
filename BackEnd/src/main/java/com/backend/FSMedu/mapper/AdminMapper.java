package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.AdminDto;
import com.backend.FSMedu.entity.Admin;

public class AdminMapper {
    public static AdminDto mapToAdminDto(Admin admin){
        return new AdminDto(
                admin.getId(),
                admin.getNom(),
                admin.getPrenom(),
                admin.getCin(),
                admin.getMatricule(),
                admin.getRole(),
                admin.getEmail(),
                admin.getMdp()
        );
    }

    public static  Admin mapToAdmin(AdminDto adminDto){
        return new Admin(
                adminDto.getId(),
                adminDto.getNom(),
                adminDto.getPrenom(),
                adminDto.getCin(),
                adminDto.getMatricule(),
                adminDto.getRole(),
                adminDto.getEmail(),
                adminDto.getMdp()
        );
    }

}

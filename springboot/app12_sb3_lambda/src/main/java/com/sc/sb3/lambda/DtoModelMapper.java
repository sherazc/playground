package com.sc.sb3.lambda;

import com.sc.sb3.lambda.dto.EmployeeDto;
import com.sc.sb3.lambda.entity.EmployeeEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DtoModelMapper {
    List<EmployeeDto> entityToDto(List<EmployeeEntity> employee);
    List<EmployeeEntity> dtoToEntity(List<EmployeeDto> employee);
}

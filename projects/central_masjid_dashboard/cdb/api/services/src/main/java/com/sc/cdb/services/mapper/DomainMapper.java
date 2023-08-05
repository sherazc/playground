package com.sc.cdb.services.mapper;


import com.sc.cdb.data.model.prayer.Prayer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DomainMapper {
    Prayer clonePrayer(Prayer prayer);
}

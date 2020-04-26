package com.sc.cdb.services.prayer;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.Jummah;
import com.sc.cdb.data.repository.CentralControlRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import static org.apache.commons.lang3.time.DateUtils.addWeeks;

@Component
public class JummahServiceImpl implements JummahService {

    private static final int JUMMAH_START_WEEKS = -2;
    private static final int JUMMAH_END_WEEKS = 4;


    private CentralControlRepository centralControlRepository;

    public JummahServiceImpl(CentralControlRepository centralControlRepository) {
        this.centralControlRepository = centralControlRepository;
    }

    @Override
    public ServiceResponse<List<Jummah>> schedule(String companyId) {
        ServiceResponse.ServiceResponseBuilder<List<Jummah>> response = ServiceResponse.builder();

        if (!ObjectId.isValid(companyId)) {
            response.message("Invalid companyId. " + companyId);
            return response.build();
        }

        Optional<CentralControl> centralControlOptional = centralControlRepository
                .findByCompanyId(new ObjectId(companyId));

        if (centralControlOptional.isEmpty()) {
            response.message("Can not find by companyId. " + companyId);
            return response.build();
        }

        List<Jummah> allJummahs = centralControlOptional.get().getJummahs();

        List<Jummah> jummahs = filterJummahs(allJummahs);

        sortJummahs(jummahs);

        response.target(jummahs);
        response.successful(true);

        return response.build();
    }

    private List<Jummah> filterJummahs(List<Jummah> allJummahs) {
        Date today = new Date();
        Date displayStartDate = addWeeks(today, JUMMAH_START_WEEKS);
        Date displayEndDate = addWeeks(today, JUMMAH_END_WEEKS);

        return allJummahs.stream()
                .filter(jummah -> jummah.getDate() != null)
                .filter(jummah -> jummah.getEnabled() != null && jummah.getEnabled())
                .filter(jummah -> jummah.getDate().after(displayStartDate))
                .filter(jummah -> jummah.getDate().before(displayEndDate))
                .collect(Collectors.toList());
    }

    private void sortJummahs(List<Jummah> jummahs) {
        Collections.sort(jummahs, (j1, j2) -> {
            int result;
            if (j1.getDate() == null && j2.getDate() == null) {
                result = 0;
            } else if (j1.getDate() == null && j2.getDate() != null) {
                result = 1;
            } else if (j1.getDate() != null && j2.getDate() == null) {
                result = -1;
            } else {
                result = j1.getDate().compareTo(j2.getDate());
            }
            return result;
        });
    }
}

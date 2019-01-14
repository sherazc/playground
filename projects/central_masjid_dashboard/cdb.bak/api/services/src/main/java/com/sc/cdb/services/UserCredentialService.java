package com.sc.cdb.services;

import com.sc.cdb.data.model.Credential;
import com.sc.cdb.services.model.ServiceResponse;

public interface UserCredentialService {
    ServiceResponse<Boolean> reset(Credential credential);
    ServiceResponse<Boolean> update(Credential credential);
}

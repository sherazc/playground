package com.sc.cdb.services.auth;

import com.sc.cdb.data.model.auth.Credential;
import com.sc.cdb.services.model.ServiceResponse;

public interface UserCredentialService {
    ServiceResponse<Boolean> reset(Credential credential);
    ServiceResponse<Boolean> update(Credential credential);
}

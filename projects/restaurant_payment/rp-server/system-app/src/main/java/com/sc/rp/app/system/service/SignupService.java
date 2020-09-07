package com.sc.rp.app.system.service;

import com.sc.rp.app.system.model.SignupRequest;
import com.sc.rp.app.system.model.SignupResponse;

public interface SignupService {
    SignupResponse signup(SignupRequest request);
}

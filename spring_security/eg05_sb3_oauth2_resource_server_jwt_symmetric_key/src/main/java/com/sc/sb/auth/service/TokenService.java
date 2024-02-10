package com.sc.sb.auth.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class TokenService {

    private final JwtEncoder encoder;

    public TokenService(JwtEncoder encoder) {
        this.encoder = encoder;
    }


    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();

        /*
         TODO: https://youtu.be/66DtzkhBlSA?list=PLZV0a2jwt22s5NCKOwSmHVagoDW8nflaC&t=1187
           Watch this video from 19:45.
           Try to understand what he is saying about scope
           In this example
                - "ROLE_" is the role that will assigned to user logged-in using http-basic
                - "SCOPE_" is the role that will be assigned to user logged-in using JWT
           That because: Purpose of the JWT token is to use scope to give access only to the resources that users
           want to use. DO NOT put all the roles/scopes that user has in the JWT.
        */

        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(authority -> !authority.startsWith("ROLE"))
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        var encoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(), claims);
        return this.encoder.encode(encoderParameters).getTokenValue();
    }


}

package com.sc.sb.auth

import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.jose.jws.MacAlgorithm
import org.springframework.security.oauth2.jwt.JwsHeader
import org.springframework.security.oauth2.jwt.JwtClaimsSet
import org.springframework.security.oauth2.jwt.JwtEncoder
import org.springframework.security.oauth2.jwt.JwtEncoderParameters
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.stream.Collectors

@Service
class ScTokenGeneratorService(private val encoder: JwtEncoder) {

    fun generateToken(authentication: Authentication, requestedScopes: Array<String>): String {
        val now = Instant.now()

        val scope = authentication.authorities.stream()
            .map { it.authority }
            .filter { requestedScopes.contains(it) }
            .collect(Collectors.joining(" "))

        val claims = JwtClaimsSet.builder()
            .issuer("self")
            .issuedAt(now)
            .expiresAt(now.plus(1, ChronoUnit.HOURS))
            .subject(authentication.name)
            .claim("scope", scope)
            .build()

        val encoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(), claims)

        return this.encoder.encode(encoderParameters).tokenValue
    }
}
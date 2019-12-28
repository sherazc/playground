package com.sc.cdb.webservices.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthenticationTokenService {
    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationTokenService.class);
    private static final String AUTHORIZATION = "Authorization";
    private static final String PREFIX = "Bearer";

    private String signingKey;
    private long expirationMilliseconds;

    public AuthenticationTokenService(
            @Value("${security.jwt.signing.key}") String signingKey,
            @Value("${security.jwt.expiration.seconds}") int expirationSeconds) {
        this.signingKey = signingKey;
        this.expirationMilliseconds = expirationSeconds * 1000;
    }

    String generateToken(String email, Map<String, Object> claims) {
        if (StringUtils.isBlank(email) || claims == null) {
            LOG.warn("Can not generate token. Invalid email={} or claims={}", email, claims);
        }
        String jwtToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + expirationMilliseconds))
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .compact();
        LOG.debug("Generated token. email={}  token={}", email, jwtToken);
        return jwtToken;
    }

    Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        // LOG.debug("Attempting to authenticate. Token={}", token);
        if (StringUtils.isBlank(token)) {
            // LOG.info("Can not authenticate. Token is missing");
            return null;
        }
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(signingKey)
                    .parseClaimsJws(token.replace(PREFIX, "").trim())
                    .getBody();
        } catch (ExpiredJwtException ex) {
            LOG.warn("Can not authenticate. Token {} is expired. {}", token, ex.getMessage());
            return null;
        }

        if (claims == null) {
            LOG.warn("Can not authenticate. Can not parse claims.");
            return null;
        }

        String email = claims.getSubject();

        if (StringUtils.isNotBlank(email)) {
            List<SimpleGrantedAuthority> roles = ((List<String>) claims.get("roles", List.class)).stream()
                    .map(e -> new SimpleGrantedAuthority(
                            "ROLE_" + e))
                    .collect(Collectors.toList());
            return new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    roles);
        } else {
            return null;
        }
    }
}

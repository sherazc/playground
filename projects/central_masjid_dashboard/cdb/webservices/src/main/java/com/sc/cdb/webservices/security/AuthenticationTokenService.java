package com.sc.cdb.webservices.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthenticationTokenService {
    private static final long EXPIRATION_TIME = 86_400_000;
    private static final String AUTHORIZATION = "Authorization";
    private static final String SIGNING_KEY = "SecretKey";
    private static final String PREFIX = "Bearer";

    String generateToken(String userId, Map<String, Object> claims) {
        String jwtToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(userId)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SIGNING_KEY)
                .compact();

        return jwtToken;
    }

    Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        if (StringUtils.isBlank(token)) {
            return null;
        }
        Claims claims = Jwts.parser()
                .setSigningKey(SIGNING_KEY)
                .parseClaimsJws(token.replace(PREFIX + " ", ""))
                .getBody();

        String username = claims.getSubject();
        Date expiration = claims.getExpiration();
        List<SimpleGrantedAuthority> roles = ((List<String>) claims.get("roles", List.class)).stream()
                .map(e -> new SimpleGrantedAuthority(
                        "ROLE_" + e))
                .collect(Collectors.toList());

        // TODO validate expiration.
        if (StringUtils.isNotBlank(username)) {
            return new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    roles);
        }

        return null;
    }
}

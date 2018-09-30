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
    private static String SIGNING_KEY = "SecretKey";
    private static String PREFIX = "Bearer";


    public String generateToken(String userId, Map<String, Object> claims) {
        String jwtToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(userId)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SIGNING_KEY)
                .compact();

        return jwtToken;
    }

    @Deprecated
    public static void addToken(HttpServletResponse response, String username) {
        // TODO: Add roles to token
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", new String[] {"ROLE_USER"});
        claims.put("firstName", "Sheraz");
        claims.put("lastName", "Chaudhry");
        String jwtToken = Jwts.builder()
                // TODO Fix Claims
                .setClaims(claims)
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SIGNING_KEY)
                .compact();

        response.addHeader(AUTHORIZATION, PREFIX + " " + jwtToken);
        response.addHeader("Access-Control-Expose-Headers", AUTHORIZATION);
    }


    public static Authentication getAuthentication(HttpServletRequest request) {
        // TODO: load roles from token
        String token = request.getHeader(AUTHORIZATION);
        if (StringUtils.isNotBlank(token)) {
            Claims claims = Jwts.parser()
                    .setSigningKey(SIGNING_KEY)
                    .parseClaimsJws(token.replace(PREFIX + " ", ""))
                    .getBody();

            String username = claims.getSubject();
            Date expiration = claims.getExpiration();
            List<SimpleGrantedAuthority> roles = ((List<String>) claims.get("roles", List.class)).stream()
                    .map(e -> new SimpleGrantedAuthority(
                            // "ROLE_" +
                                    e))
                    .collect(Collectors.toList());
            String firstName = claims.get("firstName", String.class);
            String lastName = claims.get("lastName", String.class);

            if (StringUtils.isNotBlank(username)) {
                return new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        roles);
            }
        }
        return null;
    }
}

package com.sc.cdb.webservices.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class AuthenticationService {
    private static final long EXPIRATION_TIME = 86_400_000;
    private static final String AUTHORIZATION = "Authorization";
    private static String SIGNING_KEY = "SecretKey";
    private static String PREFIX = "Bearer";

    public static void addToken(HttpServletResponse response, String username) {
        // TODO: Add roles to token
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", new String[] {"USER"});
        String jwtToken = Jwts.builder()
                // TODO Fix Claims
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

            if (StringUtils.isNotBlank(username)) {
                return new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.emptyList());
            }
        }
        return null;
    }
}

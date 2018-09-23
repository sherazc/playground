package com.sc.cdb.webservices.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.cdb.webservices.model.AccountCredentials;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class LoginFilter extends AbstractAuthenticationProcessingFilter {


    protected LoginFilter(String url, AuthenticationManager authenticationManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest,
                                                HttpServletResponse httpServletResponse)
            throws AuthenticationException, IOException, ServletException {

        AccountCredentials accountCredentials = new ObjectMapper()
                .readValue(httpServletRequest.getInputStream(), AccountCredentials.class);

        return getAuthenticationManager()
                .authenticate(new UsernamePasswordAuthenticationToken(
                        accountCredentials.getUserName(),
                        accountCredentials.getPassword(),
                        Collections.emptyList()
                ));
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        AuthenticationService.addToken(response, authResult.getName());

    }
}

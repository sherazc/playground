package com.sc.sb.auth.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.AdviceMode;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;
import java.util.Arrays;
import java.util.stream.Collectors;

// Followed this tutorial
// https://www.youtube.com/watch?v=66DtzkhBlSA&list=PLZV0a2jwt22s5NCKOwSmHVagoDW8nflaC&index=5

@Configuration
@EnableWebSecurity(
        // debug = true // Works is future releases not in 3.2.2
        // https://github.com/spring-projects/spring-security/issues/14370
)
// @EnableGlobalMethodSecurity  - Deprecated. Use @EnableMethodSecurity instead.
@EnableMethodSecurity(
        jsr250Enabled = true,  // Enables @RolesAllowed, @PermitAll, and @DenyAll. JavaEE/Jakarta auth annotations
        prePostEnabled = true, // Enables @PreAuthorize, @PostAuthorize, @PreFilter, and @PostFilter. Default spring auth annotations
        securedEnabled = false, // Enables @Secured. Spring legacy option. Don't use
        mode = AdviceMode.PROXY // Use AspectJ or Spring AOP
)
public class SecurityConfig {

    @Value("${jwt.key}")
    private String jwtKey;

    /*
    @Bean
    public UserDetailsService userDetailsService() {
        // TODO: get user form database
        return new InMemoryUserDetailsManager(
                User.withUsername("sheraz")
                        .password("{noop}password")
                        .authorities(
                                "READ", // To get access resources user must have READ
                                "ROLE_USER" // To login (login in using http-basic) (obtain token) user must have ROLE_USER
                        )
                        .build());
    }
    */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // this is also required for "/h2-console/**"
                // .authorizeRequests() // In SB3 it has been deprecated replaced with authorizeHttpRequests()
                // TODO: I read few docs on ROLE_ and SCOPE_ prefix but still could not understand.
                // https://curity.io/resources/learn/scopes-and-how-they-relate-to-claims/#the-prefix-scope
                //  Read more docs.
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll()
                        // Removed this because doing method security
                        // .requestMatchers("/api/auth/token").hasRole("USER") // To obtain token it must be a ROLE_USER
                        .anyRequest().authenticated() // All other resources must be authenticated
                )
                .headers((headers) -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                // Disable session.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // TODO: Video shows OAuth2ResourceServerConfigurer.jwt()
                //  OAuth2ResourceServerConfigurer.jwt() is deprecated in favor of .jwt(Customizer.withDefaults())
                //  Not sure why. Figure out the reason.
                //  Stack Overflow say to prefer lambda DSL in spring security.
                //  https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configurers/oauth2/server/resource/OAuth2ResourceServerConfigurer.html#jwt()
                //  https://stackoverflow.com/questions/76339307/spring-security-deprecated-issue
                //  .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                //  Go through this reference doc. But it still had deprecated example
                //  https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html
                // .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(getJwtAuthenticationConverter())))
                .httpBasic(Customizer.withDefaults())
                .build();
    }


    /**
     * If we use this line:
     *  .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
     * Then by default when the request receives Bearer JWT token with scope
     * Then all scopes get the prefix SCOPE_ in the Authorities
     *
     * To avoid above we can create custom
     *
     * @return
     */
    private Converter<Jwt, AbstractAuthenticationToken> getJwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            String scopesString = jwt.getClaim("scope");
            return Arrays.stream(scopesString.split("\\s"))
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

        });
        return converter;
    }


    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(jwtKey.getBytes()));
    }


    @Bean
    public JwtDecoder jwtDecoder() {
        byte[] bytes = jwtKey.getBytes();
        SecretKeySpec originalKey = new SecretKeySpec(bytes, 0, bytes.length, "RSA");
        return NimbusJwtDecoder.withSecretKey(originalKey).macAlgorithm(MacAlgorithm.HS512).build();
    }

}

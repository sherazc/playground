package com.sc.sb.auth.config

import com.nimbusds.jose.jwk.source.ImmutableSecret
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.AdviceMode
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jose.jws.MacAlgorithm
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtEncoder
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import javax.crypto.spec.SecretKeySpec

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
    jsr250Enabled = true,
    prePostEnabled = true,
    securedEnabled = false,
    mode = AdviceMode.PROXY)
class SecurityConfig(
    @Value("\${jwt.key}")
    private val jwtKey: String) {


    fun getJwtAuthenticationConverter(): Converter<Jwt, AbstractAuthenticationToken> {
        val converter = JwtAuthenticationConverter()

        converter.setJwtGrantedAuthoritiesConverter { jwt ->
            val scopesString = jwt.getClaim<String>("scope")
            // Last lambda line has implicit return.
            scopesString.split("\\s")
                .map { scope -> SimpleGrantedAuthority(scope) }
        }

        return converter
    }


    @Bean
    fun jwtEncoder(): JwtEncoder = NimbusJwtEncoder(ImmutableSecret(jwtKey.toByteArray()))

    @Bean
    fun jwtDecoder(): JwtDecoder {
        val key: ByteArray = jwtKey.toByteArray()
        val originalKey = SecretKeySpec(key, 0, key.size, "RSA")
        return NimbusJwtDecoder.withSecretKey(originalKey).macAlgorithm(MacAlgorithm.HS512).build()
    }
}

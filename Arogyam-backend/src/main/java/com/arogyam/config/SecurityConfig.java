package com.arogyam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.arogyam.security.JwtFilter;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(
                session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth

            	    .requestMatchers("/api/auth/login").permitAll()

            	    // PATIENT history (special case)
            	    .requestMatchers("/api/doctor/patient/**")
            	        .hasAnyRole("PATIENT", "DOCTOR")

            	    // PATIENT other APIs (if any)
            	    .requestMatchers("/api/patient/**").hasRole("PATIENT")

            	    // DASHBOARD
            	    .requestMatchers("/api/dashboard/**")
            	        .hasAnyRole("ADMINISTRATOR", "DOCTOR", "RECEPTIONIST")

            	    // OPD
            	    .requestMatchers("/api/opd/**")
            	        .hasAnyRole("ADMINISTRATOR", "RECEPTIONIST")
            	        
            	        .requestMatchers("/api/admin/employees/doctors")
            	        .hasAnyRole("ADMINISTRATOR", "RECEPTIONIST")


            	    // ADMIN
            	    .requestMatchers("/api/admin/**").hasRole("ADMINISTRATOR")

            	    // RECEPTIONIST
            	    .requestMatchers("/api/receptionist/**").hasRole("RECEPTIONIST")

            	    // DOCTOR (keep LAST)
            	    .requestMatchers("/api/doctor/**").hasRole("DOCTOR")

            	    .anyRequest().authenticated()
            	)
;



        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}

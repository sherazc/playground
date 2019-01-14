package com.sc.cdb.services.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceResponse<T> {
    private boolean successful;
    private String message;
    @Builder.Default
    private Map<String, String> fieldErrors = new HashMap<>();
    private T target;

    public ServiceResponse<T> reject(@NotNull String message) {
        this.message = message;
        this.successful = false;
        return this;
    }

    public ServiceResponse<T> accept(@NotNull String message) {
        this.message = message;
        this.successful = true;
        return this;
    }

    public ServiceResponse<T> rejectField(@NotNull String fieldName, @NotNull String message) {
        this.message = "";
        this.successful = false;
        this.fieldErrors.put(fieldName, message);
        return this;
    }

}

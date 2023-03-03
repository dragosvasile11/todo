package com.example.todo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ErrorDTO {
    private int status;
    private String message;
    private List<ErrorDetailDTO> errors;

    public ErrorDTO(int status, String message, List<ErrorDetailDTO> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

}

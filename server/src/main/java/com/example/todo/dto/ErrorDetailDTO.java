package com.example.todo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorDetailDTO {
    private String field;
    private String message;

    public ErrorDetailDTO(String field, String message) {
        this.field = field;
        this.message = message;
    }

}

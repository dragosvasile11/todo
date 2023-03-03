package com.example.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ErrorDTO {
    private int status;
    private String message;
    private List<ErrorDetailDTO> errors;
}

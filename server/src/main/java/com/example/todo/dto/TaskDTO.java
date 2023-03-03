package com.example.todo.dto;

import com.example.todo.model.Type;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TaskDTO {

    @NotNull(message = "Title is required")
    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
    private String name;

    @NotNull(message = "Type must not be null")
    @Enumerated(EnumType.STRING)
    private Type type;

    @NotNull(message = "Deadline date is required")
    @FutureOrPresent(message = "Deadline date must be in the future or present")
    private LocalDate deadlineDate;

    @NotNull(message = "Estimated time is required")
    @PositiveOrZero(message = "Estimated time can't be negative")
    private Long estimatedTime;

}

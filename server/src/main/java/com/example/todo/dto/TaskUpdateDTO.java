package com.example.todo.dto;

import com.example.todo.config.AppConstants;
import com.example.todo.model.Type;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;

@Getter
@Setter
public class TaskUpdateDTO {

    @NotNull(message = AppConstants.TITLE_REQUIRED)
    @NotBlank(message = AppConstants.TITLE_REQUIRED)
    @Size(min = 3, max = 50, message = AppConstants.TITLE_SIZE)
    private String name;

    @NotNull(message = AppConstants.TYPE_NOT_NULL)
    @Enumerated(EnumType.STRING)
    private Type type;

    @NotNull(message = AppConstants.CREATION_DATE_REQUIRED)
    @PastOrPresent(message = AppConstants.CREATION_DATE_PAST_OR_PRESENT)
    private LocalDate creationDate;

    @NotNull(message = AppConstants.DEADLINE_REQUIRED)
    @FutureOrPresent(message = AppConstants.DEADLINE_FUTURE_OR_PRESENT)
    private LocalDate deadlineDate;

    @NotNull(message = AppConstants.ESTIMATED_TIME_REQUIRED)
    @PositiveOrZero(message = AppConstants.ESTIMATED_TIME_POSITIVE_OR_ZERO)
    private Long estimatedTime;

    @NotNull(message = AppConstants.IS_FINAL_REQUIRED)
    private Boolean isFinal;

    @NotNull(message = AppConstants.WORKING_TIME_REQUIRED)
    @PositiveOrZero(message = AppConstants.WORKING_TIME_POSITIVE_OR_ZERO)
    private Long workingTimeToFinish;

    @NotNull(message = AppConstants.FINISH_DATE_REQUIRED)
    private LocalDate finishDate;

}

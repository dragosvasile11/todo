package com.example.todo.advice;

import com.example.todo.dto.ErrorDTO;
import com.example.todo.dto.ErrorDetailDTO;
import com.example.todo.exception.TaskException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        log.info(String.valueOf(ex));
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> handleValidationException(MethodArgumentNotValidException ex) {
        log.info(String.valueOf(ex));
        List<ErrorDetailDTO> errorDetails = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> new ErrorDetailDTO(fieldError.getField(), fieldError.getDefaultMessage()))
                .collect(Collectors.toList());
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.BAD_REQUEST.value(), "Validation failed", errorDetails);
        return ResponseEntity.badRequest().body(errorDTO);
    }

    @ExceptionHandler(TaskException.class)
    public ResponseEntity<String> handleTaskException(TaskException ex) {
        log.error("Task exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //exception

}

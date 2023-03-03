package com.example.todo.service;

import com.example.todo.dto.TaskDTO;
import com.example.todo.dto.TaskUpdateDTO;
import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.executable.ValidateOnExecution;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@ValidateOnExecution
@RequiredArgsConstructor
@Transactional
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final Validator validator;

    public ResponseEntity<Task> getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
        log.info("Task retrieved successfully with ID {}", id);
        return ResponseEntity.ok(task);
    }

    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskRepository.findAll(Sort.by(Sort.Direction.ASC, "creationDate"));
        log.info("{} tasks retrieved successfully.", tasks.size());
        return ResponseEntity.ok(tasks);
    }

    public ResponseEntity<?> createTask(TaskDTO taskDTO) {
        try {
            Task task = new Task();
            task.setName(taskDTO.getName());
            task.setType(taskDTO.getType());
            task.setDeadlineDate(taskDTO.getDeadlineDate());
            task.setEstimatedTime(taskDTO.getEstimatedTime());

            validateTask(task);

            task.setCreationDate(LocalDate.now());
            task.setIsFinal(false);
            taskRepository.save(task);

            log.info("Task created successfully with ID {}", task.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(task);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseEntity<?> updateTask(Long id, TaskUpdateDTO taskUpdateDTO) {
        Task taskToUpdate = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
        if (taskToUpdate.getIsFinal()) return ResponseEntity.badRequest().build();

        try {
            taskToUpdate.setIsFinal(taskUpdateDTO.getIsFinal());
            taskToUpdate.setWorkingTimeToFinish(taskUpdateDTO.getWorkingTimeToFinish());
            taskToUpdate.setFinishDate(taskUpdateDTO.getFinishDate());

            validateTask(taskToUpdate);

            taskRepository.save(taskToUpdate);

            log.info("Task updated successfully with ID {}", taskToUpdate.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(taskToUpdate);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<?> deleteTask(Long id) {
        Task taskToDelete = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));

        if (taskToDelete.getIsFinal()) return ResponseEntity.badRequest().body("Task with ID " + id + " cannot be deleted because it is finished.");

        taskRepository.delete(taskToDelete);
        log.info("Task with ID {} deleted successfully.", id);
        return ResponseEntity.noContent().build();
    }

    private void validateTask(Task task) {
        Set<ConstraintViolation<Task>> violations = validator.validate(task);
        if (!violations.isEmpty()) {
            String errorMessage = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", "));
            throw new IllegalArgumentException(errorMessage);
        }
    }
}


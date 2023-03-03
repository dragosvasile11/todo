package com.example.todo.controller;

import com.example.todo.dto.TaskDTO;
import com.example.todo.dto.TaskUpdateDTO;
import com.example.todo.model.Task;
import com.example.todo.service.TaskService;
import jakarta.validation.Valid;
import jakarta.validation.executable.ValidateOnExecution;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@ValidateOnExecution
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;


    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        log.info("Retrive task for taskId: {}", id);
        return taskService.getTaskById(id);

    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        log.info("Retrive all tasks.");
        return taskService.getAllTasks();
    }

    @PostMapping
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        log.info("Create task.");
        return taskService.createTask(taskDTO);

    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,@Valid @RequestBody TaskUpdateDTO taskUpdateDTO) {
        log.info("Update task.");
        return taskService.updateTask(id, taskUpdateDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        log.info("Remove task for taskId: {}", id);
        return taskService.deleteTask(id);
    }
}


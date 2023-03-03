package com.example.todo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tasks")
@NoArgsConstructor
public class Task {

    @Id
    @SequenceGenerator(name = "task_sequence", sequenceName = "task_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_sequence")
    @Column(updatable = false)
    private Long id;

    @Column
    private String name;

    @Column
    private Type type;

    @Column
    private LocalDate creationDate;

    @Column
    private LocalDate deadlineDate;

    @Column
    private Long estimatedTime;

    @Column
    private Boolean isFinal;

    @Column
    private Long workingTimeToFinish;

    @Column
    private LocalDate finishDate;

}

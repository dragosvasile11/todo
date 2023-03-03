package com.example.todo.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConstants {

    public static final String TITLE_REQUIRED = "Title is required";
    public static final String TITLE_SIZE = "Title must be between 3 and 50 characters";
    public static final String TYPE_NOT_NULL = "Type must not be null";
    public static final String CREATION_DATE_REQUIRED = "Creation date is required";
    public static final String CREATION_DATE_PAST_OR_PRESENT = "Creation date must be in the past or present";
    public static final String DEADLINE_REQUIRED = "Deadline date is required";
    public static final String DEADLINE_FUTURE_OR_PRESENT = "Deadline date must be in the future or present";
    public static final String ESTIMATED_TIME_REQUIRED = "Estimated time is required";
    public static final String ESTIMATED_TIME_POSITIVE_OR_ZERO = "Estimated time can't be negative";
    public static final String IS_FINAL_REQUIRED = "Is Final is required";
    public static final String WORKING_TIME_REQUIRED = "Working time to finish is required";
    public static final String WORKING_TIME_POSITIVE_OR_ZERO = "Working time to finish can't be negative";
    public static final String FINISH_DATE_REQUIRED = "Finish date is required";
}

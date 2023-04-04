package com.student.model;

import com.student.entity.Student;

import io.micrometer.common.lang.NonNull;
import lombok.Data;

@Data
public class SubjectDTO {
	private int id;

	@NonNull
	private String subjectName;

	private Student student;
}

package com.student.model;

import java.util.List;

import com.student.entity.Subject;

import io.micrometer.common.lang.NonNull;
import lombok.Data;

@Data
public class StudentDTO {
	private int id;

	@NonNull
	private String name;

	@NonNull
	private String phoneNo;

	@NonNull
	private String email;

	private List<Subject> subjects;
}

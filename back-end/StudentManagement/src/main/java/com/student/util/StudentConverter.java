package com.student.util;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.student.entity.Student;
import com.student.model.StudentDTO;

@Component
public class StudentConverter {

	// Convert to student
	public Student convertToStudentEntity(StudentDTO studentDto) {
		// Student object
		Student student = new Student();

		// if StudentDto not null
		if (studentDto != null) {
			// than copy
			BeanUtils.copyProperties(studentDto, student);
		}
		// return student
		return student;
	}

	// Convert to StudentDTO
	public StudentDTO convertToStudentDTO(Student student) {
		// StudentDTO object
		StudentDTO studentDto = new StudentDTO();

		// if student not null
		if (student != null) {
			// than copy
			BeanUtils.copyProperties(student, studentDto);
		}
		// return studentDto
		return studentDto;
	}
}
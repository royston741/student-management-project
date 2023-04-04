package com.student.service;

import java.util.List;

import com.student.entity.Student;
import com.student.model.StudentDTO;

public interface StudentService {

	public Boolean createStudent(Student student);

	public Boolean deleteStudent(int id);

	public List<StudentDTO> getAllStudents();

	public Student getStudentById(int id);

	public Boolean updateStudentById(int id, Student student);

}

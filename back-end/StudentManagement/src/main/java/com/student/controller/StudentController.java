package com.student.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.student.entity.Student;
import com.student.model.StudentDTO;
import com.student.service.StudentService;
import com.student.service.SubjectService;
import com.student.util.StudentConverter;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

	@Autowired
	StudentConverter studentConverter;

	@Autowired
	StudentService studentService;

	@Autowired
	SubjectService subjectService;

	@PostMapping("/createStudent")
	public ResponseEntity<Boolean> createStudent(@RequestBody StudentDTO studentDto) {
		Student student = studentConverter.convertToStudentEntity(studentDto);
		System.out.println(student);
		return new ResponseEntity<Boolean>(studentService.createStudent(student), HttpStatus.CREATED);
	}

	@GetMapping("/getAllStudents")
	public ResponseEntity<List<StudentDTO>> getAllStudents() {
		List<StudentDTO> std = studentService.getAllStudents();
		return new ResponseEntity<List<StudentDTO>>(std, HttpStatus.OK);
	}

	@GetMapping("/getStudentById/{id}")
	public ResponseEntity<StudentDTO> getStudentById(@PathVariable("id") int id) {
		StudentDTO std = studentConverter.convertToStudentDTO(studentService.getStudentById(id));
		return new ResponseEntity<StudentDTO>(std, HttpStatus.OK);
	}

	@PutMapping("/updateStudentById/{id}")
	public ResponseEntity<Boolean> updateStudent(@PathVariable("id") int id, @RequestBody StudentDTO studentDto) {
		if (studentDto != null) {
			Student student = studentConverter.convertToStudentEntity(studentDto);
			return new ResponseEntity<Boolean>(studentService.updateStudentById(id, student), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@DeleteMapping("/deleteStudent/{id}")
	public ResponseEntity<Boolean> deleteStudent(@PathVariable("id") int id) {
		return new ResponseEntity<Boolean>(studentService.deleteStudent(id), HttpStatus.OK);
	}
}

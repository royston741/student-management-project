package com.student.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.entity.Student;
import com.student.model.StudentDTO;
import com.student.repository.StudentRepository;
import com.student.service.StudentService;
import com.student.util.StudentConverter;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	StudentRepository studentRepository;

	@Autowired
	StudentConverter studentConverter;

	@Override
	public Boolean createStudent(Student student) {
		if (student != null) {
			studentRepository.save(student);
			return true;
		}
		return false;
	}

	@Override
	public List<StudentDTO> getAllStudents() {

		List<Student> students = studentRepository.findAll();
		List<StudentDTO> studentDTOs = new ArrayList<>();
		// for Each Loop
		for (Student student : students) {
			studentDTOs.add(studentConverter.convertToStudentDTO(student));
		}

		return studentDTOs;
	}

	@Override
	public Boolean deleteStudent(int id) {
		Student s = studentRepository.findById(id).get();
		if (s != null) {
			studentRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public Student getStudentById(int id) {
		Student s = studentRepository.findById(id).get();
		return s;
	}

	@Override
	public Boolean updateStudentById(int id, Student student) {
		Student foundStudent = studentRepository.findById(id).get();
		if (foundStudent != null) {
			foundStudent.setName(student.getName());
			foundStudent.setPhoneNo(student.getPhoneNo());
			foundStudent.setEmail(student.getEmail());
			foundStudent.setSubjects(student.getSubjects());
			studentRepository.save(foundStudent);
			return true;
		}
		return false;
	}

}

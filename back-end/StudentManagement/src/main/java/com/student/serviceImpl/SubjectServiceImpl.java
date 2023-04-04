package com.student.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.entity.Subject;
import com.student.repository.SubjectRepository;
import com.student.service.SubjectService;

@Service
public class SubjectServiceImpl implements SubjectService {

	@Autowired
	SubjectRepository subjectRepository;

	@Override
	public List<Subject> getAllModules() {
		List<Subject> m = subjectRepository.findAll();
		for (Subject i : m) {
			System.out.println(i.getSubjectName());
		}
		return null;
	}

}

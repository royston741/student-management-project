package com.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {

}

package com.student.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.student.entity.User;
import com.student.model.UserDTO;
import com.student.service.UserService;
import com.student.util.UserConverter;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	UserConverter userConverter;

	@PostMapping("/signup")
	public ResponseEntity<Boolean> signUpUser(@RequestBody UserDTO userDto) {
//		System.out.println(userDto.getUserName());
		User user = userConverter.convertToUserEntity(userDto);
		return new ResponseEntity<Boolean>(userService.signUpUser(user), HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<Boolean> logInUser(@RequestBody UserDTO userDto) {
		User user = userConverter.convertToUserEntity(userDto);
		return new ResponseEntity<Boolean>(userService.logInUser(user), HttpStatus.OK);
	}

}

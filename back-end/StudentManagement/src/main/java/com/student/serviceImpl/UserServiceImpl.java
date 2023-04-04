package com.student.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.entity.User;
import com.student.repository.UserRepository;
import com.student.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public Boolean logInUser(User user) {
		User userObj = userRepository.findByUserName(user.getUserName());
		if (userObj != null) {
			if (user.getPassword().equals(userObj.getPassword())) {
				System.out.println("success");
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	@Override
	public Boolean signUpUser(User user) {
		User userObj = userRepository.findByUserName(user.getUserName());
		if (userObj != null) {
			return false;
		}
		if (user != null) {
			userRepository.save(user);
			return true;
		}
		return false;
	}

}

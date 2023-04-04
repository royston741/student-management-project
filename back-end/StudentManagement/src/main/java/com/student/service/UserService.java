package com.student.service;

import com.student.entity.User;

public interface UserService {

	public Boolean logInUser(User user);

	public Boolean signUpUser(User user);
}

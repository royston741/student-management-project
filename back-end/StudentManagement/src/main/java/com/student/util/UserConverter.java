package com.student.util;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.student.entity.User;
import com.student.model.UserDTO;

@Component
public class UserConverter {

	// Convert to user
	public User convertToUserEntity(UserDTO userDto) {
		// User object
		User user = new User();

		// if UserDto not null
		if (userDto != null) {
			// than copy
			BeanUtils.copyProperties(userDto, user);
		}
		// return user
		return user;
	}

	// Convert to UserDTO
	public UserDTO convertToUserDTO(User user) {
		// UserDTO object
		UserDTO userDto = new UserDTO();

		// if user not null
		if (user != null) {
			// than copy
			BeanUtils.copyProperties(user, userDto);
		}
		// return userDto
		return userDto;
	}
}

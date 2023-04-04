package com.student.model;

import io.micrometer.common.lang.NonNull;
import lombok.Data;

@Data
public class UserDTO {

	private int id;

	@NonNull
	private String userName;

	@NonNull
	private String password;
}

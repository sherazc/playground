package com.sc.spring3;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/json")
public class JsonViewController {
	private static final String messageTemplate = "Hello %s!";

	@RequestMapping("/sayhello")
	public @ResponseBody
	HelloWorldModel sayHello(@RequestParam(defaultValue = "world", value = "name", required = false) String name) {
		HelloWorldModel helloWorldModel = new HelloWorldModel();
		helloWorldModel.setName(name);
		helloWorldModel.setMessage(String.format(messageTemplate, name));
		return helloWorldModel;
	}

	private class HelloWorldModel {
		private String name;
		private String message;

		@SuppressWarnings("unused")
		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		@SuppressWarnings("unused")
		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}
}

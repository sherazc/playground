package com.sc.todo.controller;

import com.sc.todo.dto.Todo;
import com.sc.todo.repository.TodoRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/")
    public String form() {
        return "todo-form";
    }

    @PostMapping("/todos")
    public String create(@RequestParam String text) {
        todoRepository.save(text);
        return "redirect:/todos";
    }

    @GetMapping("/todos")
    public String list(HttpSession session, Model model) {
        List<Todo> todos = todoRepository.findAll();
        session.setAttribute("todos", todos);

        model.addAttribute("todos", session.getAttribute("todos"));
        return "todo-list";
    }
}

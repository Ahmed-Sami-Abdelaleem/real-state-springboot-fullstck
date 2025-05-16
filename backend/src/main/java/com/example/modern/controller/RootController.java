// backend/src/main/java/com/example/modern/controller/RootController.java
package com.example.modern.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String index() {
        return "Backend API is running 🎯";
    }
}

package com.example.demo.Controller;


import com.example.demo.Model.Course;
import com.example.demo.Repositories.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CourseController {


    @Autowired
    private CourseRepo courseRepo;



    @GetMapping("/courses")
    public List<Course> getCourses(){
        return courseRepo.findAll();
    }


    @PostMapping("/courses")
    public Course addCourse(@RequestBody Course course){
        return courseRepo.save(course);
    }

    @DeleteMapping("/courses/{id}")
    public void deleteCourse(@PathVariable Long id){
        courseRepo.deleteById(id);
    }

    @PutMapping("/courses/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course){
        Course existingCourse = courseRepo.findById(id).orElse(null);
        existingCourse.setTitle(course.getTitle());
        existingCourse.setPrice(course.getPrice());
        existingCourse.setImage(course.getImage());
        return courseRepo.save(existingCourse);
    }


    @GetMapping("/courses/{id}")
    public Course getCourse(@PathVariable Long id){
        return courseRepo.findById(id).orElse(null);
    }




}

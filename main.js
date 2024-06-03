#!/usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 30000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_blanace() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    show_status() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Name: ${this.name}`);
        console.log(`Student Course: ${this.courses}`);
        console.log(`Student Balance: $${this.balance}`);
    }
}
class Student_Manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} course successfully`);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_blanace();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
async function main() {
    console.log("-".repeat(60));
    console.log("Student Management System");
    console.log("-".repeat(60));
    let student_manager = new Student_Manager();
    while (true) {
        let user = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        switch (user.choice) {
            case "Add Student":
                let add_input = await inquirer.prompt([
                    {
                        name: "std",
                        type: "input",
                        message: "Enter a Student Name: ",
                    },
                ]);
                student_manager.add_student(add_input.std);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID: ",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name: ",
                    },
                ]);
                student_manager.enroll_student(course_input.std_id, course_input.course);
                break;
            case "View Student Balance":
                let std_balance = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID: ",
                    },
                ]);
                student_manager.view_student_balance(std_balance.std_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID: ",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter an amount to pay: ",
                    },
                ]);
                student_manager.pay_student_fees(fees_input.std_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID: ",
                    },
                ]);
                student_manager.show_student_status(status_input.std_id);
                break;
            case "Exit":
                process.exit();
            default:
                console.log("Invalid choice");
                break;
        }
    }
}
main();

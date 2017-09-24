const gulp = require("gulp");

gulp.task("task-a", () => {
    console.log("Running task A");
});

gulp.task("task-b", () => {
    console.log("Running task B");
});

gulp.task("task-all", ["task-a", "task-b"]);
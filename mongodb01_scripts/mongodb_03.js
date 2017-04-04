for (i = 1; i <= 1000; i++) {
    var studentNum = i * 1000;
    var student = {
        studentNum : studentNum,
        name : "Student " + studentNum,
        fee : studentNum + 100,
        subjects : [ "subject_a_" + studentNum, "subject_b_" + studentNum, "subject_c_" + studentNum, ],
        registrationDate : new Date()
    };

    // printjson(student);    db.mydb.students.insert(student);}
// selects all recordsdb.mydb.students.find();
// limits selected recordsdb.mydb.students.find().limit(10);
// selects one recorddb.mydb.students.findOne();

// Giving criteriadb.mydb.students.find({studentNum : 30000});

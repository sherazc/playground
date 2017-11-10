use mydb

// insert 1000 student records
for (i = 1; i <= 1000; i++) {
    var studentNum = i * 1000;
    var student = {
        studentNum : studentNum,
        name : "Student " + studentNum,
        fee : studentNum + 100,
        subjects : [ "subject_a_" + studentNum, "subject_b_" + studentNum, "subject_c_" + studentNum, ],
        registrationDate : new Date()
    };

    // printjson(student);    
    db.students.insert(student);
}
// selects all 
db.students.find();

// limits selected 
db.students.find().limit(10);

// pagination
db.students.find().skip(20).limit(10);

// selects one 
db.students.findOne();

// Criteria
db.students.find({studentNum : 30000});

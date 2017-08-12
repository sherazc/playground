package com.sc.mongodb.process;

import com.sc.mongodb.dao.PersonDao;
import com.sc.mongodb.domain.Person;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringMongoDbMain {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("context.xml");

        PersonDao personDao = context.getBean("personDao", PersonDao.class);

        Person person = new Person(null, "name1", "address 100");
        personDao.insert(person);
        System.out.println("Person inserted and ID generated: " + person.getId());

        Person personFind = personDao.findById(person.getId());

        System.out.println("Person found: " + personFind);

        personFind.setName("name1000");
        personDao.update(personFind);

        personFind = personDao.findById(person.getId());

        System.out.println("Person Updated: " + personFind);

        int count = personDao.deleteById(person.getId());

        System.out.println("Number of person deleted: : " + count);
    }
}

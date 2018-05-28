package com.sc.springboot.controller;

import com.sc.springboot.dao.AddressDao;
import com.sc.springboot.dao.CustomerDao;
import com.sc.springboot.dao.CustomerOrderDao;
import com.sc.springboot.dao.ItemDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Home {

    private ItemDao itemDao;
    private AddressDao addressDao;
    private CustomerDao customerDao;
    private CustomerOrderDao customerOrderDao;

    @Autowired
    public Home(
            @Qualifier("itemDaoJpa") ItemDao itemDao,
            @Qualifier("addressDaoHibernate") AddressDao addressDao,
            @Qualifier("customerDaoJpa") CustomerDao customerDao,
            @Qualifier("customerOrderDaoHibernate") CustomerOrderDao customerOrderDao) {
        this.itemDao = itemDao;
        this.addressDao = addressDao;
        this.customerDao = customerDao;
        this.customerOrderDao = customerOrderDao;
    }

    @RequestMapping(value = {"/", "home"})
    @Transactional
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("home");

        modelAndView.addObject("items", itemDao.findAll());
        modelAndView.addObject("addresses", addressDao.findAll());
        modelAndView.addObject("customers", customerDao.findAll());
        modelAndView.addObject("customerOrders", customerOrderDao.findAll());

        return modelAndView;
    }
}

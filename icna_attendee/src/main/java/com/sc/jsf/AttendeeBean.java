package com.sc.jsf;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.event.ActionEvent;

import org.apache.commons.lang.StringUtils;

import com.sc.dao.AttendeeDao;
import com.sc.dao.StateDao;
import com.sc.dao.ZipDao;
import com.sc.domain.Attendee;
import com.sc.domain.State;
import com.sc.domain.Zip;
import com.sc.services.AttendeeFieldSorter;
import com.sc.services.AttendeePrintService;

@ManagedBean(name = "attendeeBean")
@SessionScoped
public class AttendeeBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private String firstName;
	private String lastName;
	private String city;
	private String state;
	private String zipCode;
	private List<Attendee> attendeeList;
	private boolean reloadAttendees;

	@ManagedProperty("#{zipStaticContext}")
	private ZipDao zipDao;

	@ManagedProperty("#{attendeeDao}")
	private AttendeeDao attendeeDao;

	@ManagedProperty("#{attendeePrintService}")
	private AttendeePrintService attendeePrintService;

	@ManagedProperty("#{attendeeFieldSorter}")
	private AttendeeFieldSorter attendeeFieldSorter;
	
	@ManagedProperty("#{stateStaticContext}")
	private StateDao stateDao;

	public List<Attendee> getAttendeeList() {
		if (reloadAttendees || attendeeList == null) {
			attendeeList = attendeeDao.getAllAttendee();
			reloadAttendees = false;
			this.getAttendeeFieldSorter().setAttendees(attendeeList);
		}
		return attendeeList;
	}

	public String delete(Attendee attendee) {
		if (attendee != null && attendee.getId() != null) {
			attendeeDao.removeById(attendee.getId());
			reloadAttendees = true;
		}
		return null;
	}

	public String edit(Attendee attendee) {
		attendee.setEditable(true);
		return null;
	}

	public void updateListner(ActionEvent event) {
		System.out.println(event);
	}

	public String update() {
		for (Attendee attendee : attendeeList) {
			if (attendee.isEditable()) {
				this.attendeeDao.save(attendee);
				attendee.setEditable(false);
			}
		}
		reloadAttendees = true;
		return null;
	}

	public String resetForm() {
		this.setFirstName(null);
		this.setLastName(null);
		this.setCity(null);
		this.setState(null);
		this.setZipCode(null);
		return null;
	}

	public String saveAndPrintAttendee() {
		Attendee attendee = buildAttendee();
		attendeeDao.save(attendee);
		printAttendee(attendee);
		reloadAttendees = true;
		return null;
	}

	public String print(Attendee attendee) {
		printAttendee(attendee);
		return null;
	}

	public String saveAttendee() {
		Attendee attendee = buildAttendee();
		attendeeDao.save(attendee);
		reloadAttendees = true;
		return null;
	}

	private Attendee buildAttendee() {
		Attendee attendee = new Attendee();
		attendee.setFirstName(this.getFirstName());
		attendee.setLastName(this.getLastName());
		Zip zip = zipDao.getByZipCode(this.getZipCode());
		if (zip == null) {
			attendee.setCity(this.getCity());
			attendee.setState(this.getState());
			attendee.setZipCode(this.getZipCode());
		} else {
			attendee.setCity(zip.getCity());
			if (zip.getState() == null) {
				attendee.setState(this.getState());
			} else {
				attendee.setState(zip.getState().getStateAbr());
			}
			attendee.setZipCode(this.getZipCode());
			this.setCity(attendee.getCity());
			this.setState(attendee.getState());
		}
		attendee.setDmlDate(new Date());
		return attendee;
	}

	private void printAttendee(Attendee attendee) {
		this.attendeePrintService.print(attendee);
	}

	@Deprecated
	private String extractFirstName(String name) {
		String firstName = null;
		if (StringUtils.isNotBlank(name)) {
			name = name.trim();
			String[] nameSplit = name.split(" ");
			if (nameSplit != null && nameSplit.length > 0) {
				firstName = nameSplit[0];
			}
		}
		return firstName;
	}

	@Deprecated
	private String extractLastName(String name) {
		String lastName = null;
		if (StringUtils.isNotBlank(name)) {
			name = name.trim();
			String[] nameSplit = name.split(" ");
			if (nameSplit != null && nameSplit.length > 1) {
				lastName = nameSplit[nameSplit.length - 1];
			}
		}
		return lastName;
	}
	
	public List<State> getAllStates() {
		return this.getStateDao().getAllStates();
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public ZipDao getZipDao() {
		return zipDao;
	}

	public void setZipDao(ZipDao zipDao) {
		this.zipDao = zipDao;
	}

	public AttendeeDao getAttendeeDao() {
		return attendeeDao;
	}

	public void setAttendeeDao(AttendeeDao attendeeDao) {
		this.attendeeDao = attendeeDao;
	}

	public boolean isReloadAttendees() {
		return reloadAttendees;
	}

	public void setReloadAttendees(boolean reloadAttendees) {
		this.reloadAttendees = reloadAttendees;
	}

	public AttendeePrintService getAttendeePrintService() {
		return attendeePrintService;
	}

	public void setAttendeePrintService(AttendeePrintService attendeePrintService) {
		this.attendeePrintService = attendeePrintService;
	}

	public void setAttendeeList(List<Attendee> attendeeList) {
		this.attendeeList = attendeeList;
	}

	public AttendeeFieldSorter getAttendeeFieldSorter() {
		return attendeeFieldSorter;
	}

	public void setAttendeeFieldSorter(AttendeeFieldSorter attendeeFieldSorter) {
		this.attendeeFieldSorter = attendeeFieldSorter;
	}

	public StateDao getStateDao() {
		return stateDao;
	}

	public void setStateDao(StateDao stateDao) {
		this.stateDao = stateDao;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
}

package com.bitsegment.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.bitsegment.domain.StudentData;
import com.bitsegment.services.PaidType;
import com.bitsegment.services.SearchQueryType;
import com.bitsegment.services.SortField;
import com.bitsegment.services.SortOrder;
import com.bitsegment.util.DateUtils;

@Repository("studentDataDao")
public class StudentDataDaoImpl extends BaseDaoImpl<StudentData, Long> implements StudentDataDao {

	private static final Log LOG = LogFactory.getLog(StudentDataDaoImpl.class);

	@Override
	public Class<StudentData> getEntityClass() {
		return StudentData.class;
	}

	@Override
	public long getStudentDataCount() {
		return (Long) getEm().createNamedQuery("studentDataCount").getSingleResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<StudentData> search(PaidType paidType, int year, int month, SearchQueryType searchQueryType,
			String searchQuery, int firstResultIndex, int maxResults, SortField sortField, SortOrder sortOrder) {
		String queryString = "select sd from StudentData sd ";
		Query query = createSearchStudentDataQuery(paidType, year, month, searchQueryType, searchQuery, queryString,
				sortField, sortOrder);
		if (firstResultIndex > -1 && maxResults > -1) {
			query.setFirstResult(firstResultIndex);
			query.setMaxResults(maxResults);
		}
		return query.getResultList();
	}

	@Override
	public long searchCount(PaidType paidType, int year, int month, SearchQueryType searchQueryType, String searchQuery) {
		String queryString = "select count(sd) from StudentData sd ";
		Query query = createSearchStudentDataQuery(paidType, year, month, searchQueryType, searchQuery, queryString,
				SortField.none, SortOrder.asc);
		return (Long) query.getSingleResult();
	}

	private Query createSearchStudentDataQuery(PaidType paidType, int year, int month, SearchQueryType searchQueryType,
			String searchQuery, String queryString, SortField sortField, SortOrder sortOrder) {
		Date registrationAfterDate = DateUtils.createDateByMonthYear(month + 1, year);
		if (paidType == PaidType.paid || paidType == PaidType.unpaid) {
			queryString += " where ";
			if (paidType == PaidType.unpaid) {
				queryString += " not ";
			}
			queryString += " exists (select 'x' from StudentFeePaid sp where sp.feeDate between :dateStart and :dateEnd and sp.studentData.id = sd.id) ";
			// queryString +=
			// " exists (select 'x' from StudentFeePaid sp where sp.studentData.id = sd.id) ";
			// if (searchQueryType == SearchQueryType.searchquery) {
			queryString += " and ";
			// }
		} else {
			queryString += " where ";
		}

		if (searchQueryType == SearchQueryType.searchquery) {
			queryString += " ( ";
			queryString += " lower(sd.firstName) like :firstName or ";
			queryString += " lower(sd.lastName) like :lastName or ";
			queryString += " lower(sd.guardianFirstName) like :guardianFirstName or ";
			queryString += " lower(sd.guardianLastName) like :guardianLastName or ";
			queryString += " sd.phoneNumber like :phoneNumber ";
			queryString += " ) ";
			queryString += " and ";
		}

		queryString += " sd.registrationDate < :registrationDate ";

		if (sortField != null && sortField != SortField.none) {
			queryString += " order by " + sortField.toString() + " ";
			if (sortOrder != null) {
				queryString += " " + sortOrder.toString() + " ";
			}
		}

		LOG.debug("Search query: " + queryString);

		Query query = this.getEm().createQuery(queryString);
		if (searchQueryType == SearchQueryType.searchquery) {
			String searchQueryLower = StringUtils.lowerCase(searchQuery);
			searchQueryLower = "%" + searchQueryLower + "%";
			query.setParameter("firstName", searchQueryLower);
			query.setParameter("lastName", searchQueryLower);
			query.setParameter("guardianFirstName", searchQueryLower);
			query.setParameter("guardianLastName", searchQueryLower);
			query.setParameter("phoneNumber", searchQueryLower);
		}

		if (paidType == PaidType.paid || paidType == PaidType.unpaid) {
			Date monthStartDate = DateUtils.getMonthStartDate(month, year);
			Date monthEndDate = DateUtils.getMonthEndDate(month, year);
			LOG.debug("Month Start Date: " + monthStartDate);
			LOG.debug("Month End Date: " + monthEndDate);
			query.setParameter("dateStart", monthStartDate);
			query.setParameter("dateEnd", monthEndDate);
		}
		query.setParameter("registrationDate", registrationAfterDate);
		return query;
	}

}

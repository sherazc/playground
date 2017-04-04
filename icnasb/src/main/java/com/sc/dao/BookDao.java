package com.sc.dao;

import com.sc.domain.Book;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("bookDao")
public class BookDao extends BaseDao<Book> {

    @Override
    protected Class<Book> getEntityClass() {
        return Book.class;
    }

    public List<Book> findByUserIdAndProcessStatus(String userId, List<Book.ProcessStatus> processStatuses) {
        if (StringUtils.isBlank(userId)) {
            return null;
        }
        Criteria criteria = Criteria.where("userId").is(userId);
        if (processStatuses != null && processStatuses.size() > 0) {
            criteria.andOperator(Criteria.where("processStatus").in(processStatuses));
        }
        return this.find(criteria);
    }

}

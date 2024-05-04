package com.sc.cdb.data.dao;

import com.mongodb.client.result.UpdateResult;
import com.sc.cdb.data.model.auth.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

    /**
     * @param userId
     * @param active successful flag
     * @return
     */
    @Override
    public boolean activateUser(String userId, boolean active) {
        Query query = new Query(Criteria.where("_id").is(new ObjectId(userId)));
        Update update = new Update().set("active", active);
        UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, User.class);
        return updateResult.getMatchedCount() > 0L;
    }

    @Override
    Class getType() {
        return User.class;
    }
}

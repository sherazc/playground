#org.bson.types.ObjectId support for @Id and none @Id fields 

##Model classes
Create setter getting conversion methods.

####e.g. 
```java
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Order {

    @Id
    private ObjectId id;

    private ObjectId userId;

    private String orderName;

    public String getId() {
        return this.id == null ? null : this.id.toHexString();
    }

    public void setId(String id) {
        if (id == null) {
            this.id = null;
        } else {
            this.id = new ObjectId(id);
        }
    }

    public String getUserId() {
        return this.userId == null ? null : this.userId.toHexString();
    }

    public void setUserId(String userId) {
        if (userId  == null) {
            this.userId  = null;
        } else {
            this.userId  = new ObjectId(userId);
        }
    }
}

```


##None @Id fields as ObjectId for making reference

None @Id fields need to be converted to ObjectId before 
passing it to MongoRepository or MongoTemplate


####e.g. MongoRepository
```
List<Order> orders = orderRepository.findByUserId(new ObjectId(userId));
```

####e.g. MongoTemplate
```
public List<OrderUser> findOrderUserByUserId(String userId) {
    LookupOperation lookupOperation = Aggregation
            .lookup("user", "userId", "_id", "user");

    Criteria criteria = Criteria
            .where("userId")
            .is(new ObjectId(userId));
    MatchOperation matchOperation = Aggregation.match(criteria);

    Aggregation aggregation = Aggregation.newAggregation(lookupOperation, matchOperation);

    return mongoTemplate
            .aggregate(aggregation, "order", OrderUser.class)
            .getMappedResults();
}
```


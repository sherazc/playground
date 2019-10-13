package com.sc.cdb.data.model.cc;

import com.sc.cdb.data.model.auth.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Hadith {
  @Id
  private ObjectId id;
  private String text;
  private String reference;

  public String getId() {
    return BaseModel.objectIdToHexString(this.id);
  }

  public void setId(String id) {
    this.id = BaseModel.hexStringToObjectId(id);
  }
}

package com.sc.sm.factory;

import com.sc.sm.services.ChaudhryStringMatch;
import com.sc.sm.services.StringMatch;

/**
 * Created by sheraz on 4/17/16.
 */
public class ChaudhryStringMatchFactory implements StringMatchFactory {
    public StringMatch build(String x, String y) {
        return new ChaudhryStringMatch(x, y);
    }
}

package com.sc.sm.factory;

import com.sc.sm.services.StringMatch;

/**
 * Created by sheraz on 4/17/16.
 */
public interface StringMatchFactory {
    StringMatch build(String x, String y);
}

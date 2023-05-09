package com.ssafy.somefriendgirl.util;

import com.querydsl.core.types.Path;

public class MongoQueryUtil {
    public static String parse(Path path) {
        String s = path.toString();
        return s.substring(s.indexOf(".") + 1);
    }
}

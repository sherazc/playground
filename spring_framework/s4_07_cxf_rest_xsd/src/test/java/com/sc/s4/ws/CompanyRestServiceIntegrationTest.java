package com.sc.s4.ws;

import com.sc.s4.util.CommonUtils;
import com.sc.schema.common.ColumnType;
import com.sc.schema.common.RequestQuery;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

public class CompanyRestServiceIntegrationTest {

    public static void main(String[] args) {
        new CompanyRestServiceIntegrationTest().runApp();
    }

    private void runApp() {

        try {
            RequestQuery requestQuery = createRequestQuery("EMPLOYEE", "id", "300");
            String requestQueryString = CommonUtils.marshallCommon(requestQuery);
            RestTemplate restTemplate = createRestTemplate();
            String response = restTemplate.postForObject("http://localhost:8080/cxf/company/company-service/find",
                    requestQueryString, String.class);
            System.out.println(CommonUtils.prettyXml(response));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private RestTemplate createRestTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
        StringHttpMessageConverter messageConverter = new StringHttpMessageConverter();
        List<MediaType> mediaTypes = new ArrayList<MediaType>();
        mediaTypes.add(MediaType.APPLICATION_XML);
        messageConverter.setSupportedMediaTypes(mediaTypes);
        messageConverters.add(messageConverter);
        restTemplate.setMessageConverters(messageConverters);
        return restTemplate;
    }

    private RequestQuery createRequestQuery(String entityTypeName, String columnName, String columnValue) {
        RequestQuery requestQuery = CommonUtils.OF_COMMON.createRequestQuery();
        requestQuery.setEntityType(entityTypeName);
        ColumnType columnType = CommonUtils.OF_COMMON.createColumnType();
        columnType.setColumnName(columnName);
        columnType.setColumnValue(columnValue);
        requestQuery.getColumnCriteria().add(columnType);
        return requestQuery;
    }
}
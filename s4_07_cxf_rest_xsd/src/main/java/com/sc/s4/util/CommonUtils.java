package com.sc.s4.util;

import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.StringWriter;

public class CommonUtils {

    public static final com.sc.schema.company.ObjectFactory OF_COMPANY = new com.sc.schema.company.ObjectFactory();
    public static final com.sc.schema.common.ObjectFactory OF_COMMON = new com.sc.schema.common.ObjectFactory();
    public static final com.sc.schema.store.ObjectFactory OF_STORE = new com.sc.schema.store.ObjectFactory();
    public static JAXBContext jaxbContextCommon, jaxbContextStore, jaxbContextCompany;
    public static Marshaller marshallerCommon, marshallerStore, marshallerCompany;

    static {
        try {
            jaxbContextCommon = JAXBContext.newInstance("com.sc.schema.common");
            jaxbContextStore = JAXBContext.newInstance("com.sc.schema.store");
            jaxbContextCompany = JAXBContext.newInstance("com.sc.schema.company");

            marshallerCommon = buildMarshaller(jaxbContextCommon);
            marshallerCompany = buildMarshaller(jaxbContextCompany);
            marshallerStore = buildMarshaller(jaxbContextStore);

        } catch (JAXBException e) {
            e.printStackTrace();
        }
    }

    private static Marshaller buildMarshaller(JAXBContext jaxbContext) {
        Marshaller marshaller = null;
        try {
            marshaller = jaxbContext.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return marshaller;
    }

    public static Integer touchInteger(Integer number) {
        if (number == null) {
            return 0;
        } else {
            return number;
        }
    }

    public static Long touchLong(Long number) {
        if (number == null) {
            return 0L;
        } else {
            return number;
        }
    }

    public static String touchString(String string) {
        if (StringUtils.isBlank(string)) {
            return "";
        } else {
            return string;
        }
    }

    public static String marshallCommon(Object object) {
        return marshall(CommonUtils.marshallerCommon, object);
    }

    public static String marshallCompany(Object object) {
        return marshall(CommonUtils.marshallerCompany, object);
    }

    public static String marshallStore(Object object) {
        return marshall(CommonUtils.marshallerStore, object);
    }

    public static String marshall(Marshaller marshaller, Object object) {
        StringWriter stringWriter = new StringWriter();
        try {
            marshaller.marshal(object, stringWriter);
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return stringWriter.toString();
    }

    public static String prettyXml(String stringXml) {
        if (StringUtils.isBlank(stringXml)) {
            return null;
        }
        String xmlString = null;
        try {
            DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            Document document = documentBuilder.parse(new InputSource(new StringReader(stringXml)));

            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            // transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

            StreamResult result = new StreamResult(new StringWriter());
            DOMSource source = new DOMSource(document);
            transformer.transform(source, result);
            xmlString = result.getWriter().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return xmlString;
    }
}
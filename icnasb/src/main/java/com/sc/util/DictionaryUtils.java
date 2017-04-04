package com.sc.util;

import com.sc.domain.dictionary.Definition;
import com.sc.domain.dictionary.DictionaryEntry;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class DictionaryUtils {

    // http://www.dictionaryapi.com
    // user: stariqch@yahoo.com
    // password: password123
    //
    // http://www.dictionaryapi.com/api/v1/references/sd2/xml/screen?key=a7c6c053-934b-43af-b298-69069b243c19
    // http://www.dictionaryapi.com/api/v1/references/collegiate/xml/test?key=bc275b83-91ea-4965-93f7-c6da40a50617
    // http://www.dictionaryapi.com/products/index.htm

//    public static final String LICENSE_KEY_PARAM = "?key=bc275b83-91ea-4965-93f7-c6da40a50617";
//    public static final String API_URL = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/";

    public static final String LICENSE_KEY_PARAM = "?key=a7c6c053-934b-43af-b298-69069b243c19";
    public static final String API_URL = "http://www.dictionaryapi.com/api/v1/references/sd2/xml/";


    public static String makeWordDictionaryUrl(String word) {
        if (StringUtils.isBlank(word)) {
            return null;
        }
        return API_URL + word + LICENSE_KEY_PARAM;
    }

    public static String accessDictionaryApiString(String word) {
        String urlString = makeWordDictionaryUrl(word);
        if (StringUtils.isBlank(urlString)) {
            return null;
        }
        String result = null;
        InputStream inputStream = null;
        try {
            inputStream = new URL(urlString).openStream();

            result = IOUtils.toString(inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                IOUtils.closeQuietly(inputStream);
            }
        }

        return result;
    }

    public static final Document accessDictionaryApiDom(String word) {
        String urlString = makeWordDictionaryUrl(word);
        if (StringUtils.isBlank(urlString)) {
            return null;
        }

        Document document = null;
        InputStream inputStream = null;
        try {
            inputStream = new URL(urlString).openStream();
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
            document = documentBuilder.parse(inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                IOUtils.closeQuietly(inputStream);
            }
        }
        return document;
    }

    public static List<DictionaryEntry> findWordDefinitions(String word) throws Exception {
        List<DictionaryEntry> dictionaryEntries = new ArrayList<DictionaryEntry>();
        Document wordDocument = accessDictionaryApiDom(word);
        NodeList entryListNodeList = wordDocument.getChildNodes();
        if (entryListNodeList == null || entryListNodeList.getLength() < 1) {
            return dictionaryEntries;
        }

        NodeList entryNodeList = entryListNodeList.item(0).getChildNodes();
        XPath xPath = XPathFactory.newInstance().newXPath();

        for (int i = 0; i < entryNodeList.getLength(); i++) {
            Node entryNode = entryNodeList.item(i);
            if ("entry".equals(entryNode.getNodeName())) {

                DictionaryEntry dictionaryEntry = new DictionaryEntry();
                dictionaryEntries.add(dictionaryEntry);

                dictionaryEntry.setWord(xPath.evaluate("hw", entryNode));
                dictionaryEntry.setSound(xPath.evaluate("sound/wav", entryNode));
                dictionaryEntry.setFunctionalLabel(xPath.evaluate("fl", entryNode));
                dictionaryEntry.setPronunciation(xPath.evaluate("pr", entryNode));
                NodeList definitionTextNodeList = (NodeList) xPath.evaluate("def/dt", entryNode, XPathConstants.NODESET);
                populateDefinition(dictionaryEntry, definitionTextNodeList);

            }
        }
        return dictionaryEntries;
    }

    private static void populateDefinition(DictionaryEntry dictionaryEntry, NodeList definitionTextNodeList) {
        if (dictionaryEntry == null || definitionTextNodeList == null) {
            return;
        }

        for (int i = 0; i < definitionTextNodeList.getLength(); i++) {
            Node definitionTextNode = definitionTextNodeList.item(i);
            NodeList definitionTextNodeChildNodes = definitionTextNode.getChildNodes();

            if (definitionTextNodeChildNodes != null && definitionTextNodeChildNodes.getLength() > 0) {
                Definition definition = new Definition();

                String definitionText = StringUtils.remove(definitionTextNodeChildNodes.item(0).getNodeValue(), ":");
                definitionText = StringUtils.trim(definitionText);

                if (StringUtils.isNotBlank(definitionText)) {
                    dictionaryEntry.getDefinitions().add(definition);
                    definition.setText(definitionText);

                    for (int j = 0; j < definitionTextNodeChildNodes.getLength(); j++) {
                        Node variantNode = definitionTextNodeChildNodes.item(j);
                        if ("vi".equals(variantNode.getNodeName()) || "vidk".equals(variantNode.getNodeName())) {
                            definition.getUsages().add(variantNode.getTextContent());
                        }
                    }
                }
            }
        }
    }
}

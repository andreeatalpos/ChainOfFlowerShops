package com.example.server.utils;


import com.example.server.model.FloareFlorarie;
import com.example.server.model.persistenta.PersistentaFlorarie;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;

public class JavaXmlDomWrite {

    private PersistentaFlorarie persistentaFlorarie;
    private String florarie;

    public JavaXmlDomWrite(String florarie, PersistentaFlorarie persistentaFlorarie) {
        this.persistentaFlorarie = persistentaFlorarie;
        this.florarie = florarie;
    }

    public void report() throws ParserConfigurationException,
            TransformerException {

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.newDocument();

        Element root = doc.createElementNS("zetcode.com", "xmlReport");
        doc.appendChild(root);
        for(FloareFlorarie floare: this.persistentaFlorarie.getFlori(this.florarie)) {
            root.appendChild(createItem(doc, floare));
        }

        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transf = transformerFactory.newTransformer();

        transf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        transf.setOutputProperty(OutputKeys.INDENT, "yes");
        transf.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");

        DOMSource source = new DOMSource(doc);

        File myFile = new File("src/main/resources/XMLReport.xml");

        StreamResult console = new StreamResult(System.out);
        StreamResult file = new StreamResult(myFile);

        transf.transform(source, console);
        transf.transform(source, file);
    }

    private static Node createItem(Document doc, FloareFlorarie f) {

       Element floare = doc.createElement("floare");

       floare.appendChild(createFlowerElement(doc, "denumire", f.getDenumire()));
       floare.appendChild(createFlowerElement(doc, "culoare", f.getCuloare()));
       floare.appendChild(createFlowerElement(doc, "pret", f.getPret().toString()));
       floare.appendChild(createFlowerElement(doc, "cantitate", f.getCantitate().toString()));
       floare.appendChild(createFlowerElement(doc, "disponibilitate", f.getDisponibilitate().toString()));

        return floare;
    }

    private static Node createFlowerElement(Document doc, String name,
                                            String value) {

        Element node = doc.createElement(name);
        node.appendChild(doc.createTextNode(value));

        return node;
    }
}

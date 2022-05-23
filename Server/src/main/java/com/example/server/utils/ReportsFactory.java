package com.example.server.utils;

import com.example.server.model.FloareFlorarie;
import com.example.server.model.persistenta.PersistentaFlorarie;
import com.example.server.utils.JavaXmlDomWrite;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.FileWriter;
import java.io.IOException;


public class ReportsFactory {


    private PersistentaFlorarie persistentaFlorarie;

    public ReportsFactory(PersistentaFlorarie persistentaFlorarie) {
        this.persistentaFlorarie = persistentaFlorarie;
    }

    public void createReport(String type, String florarie) {
        if (type.equals("XML")) {
            this.createXMLReport(florarie);
        } else if (type.equals("JSON")) {
            this.createJSONReport(florarie);
        } else if (type.equals("CSV")) {
            this.createCSVReport(florarie);
        }
        System.out.println("report created");
    }

    public void createJSONReport(String florarie) {
        JSONArray flowersList = new JSONArray();
        for (FloareFlorarie f : persistentaFlorarie.getFlori(florarie)) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("denumire", f.getDenumire());
            jsonObject.put("culoare", f.getCuloare());
            jsonObject.put("pret", f.getPret());
            jsonObject.put("cantitate", f.getCantitate());
            jsonObject.put("disponibilitate", f.getDisponibilitate());

            flowersList.add(jsonObject);

            try {
                FileWriter jsonFile = new FileWriter("./jsonReport.json");
                jsonFile.write(flowersList.toJSONString());
                jsonFile.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

    public void createCSVReport(String florarie) {
        StringBuilder sb = new StringBuilder();
        sb.append("denumire");
        sb.append(',');
        sb.append("culoare");
        sb.append(',');
        sb.append("pret");
        sb.append(',');
        sb.append("cantitate");
        sb.append(',');
        sb.append("disponibilitate");
        sb.append('\n');

        for (FloareFlorarie f : persistentaFlorarie.getFlori(florarie)) {
            sb.append(f.getDenumire());
            sb.append(',');
            sb.append(f.getCuloare());
            sb.append(',');
            sb.append(f.getPret());
            sb.append(',');
            sb.append(f.getCantitate());
            sb.append(',');
            sb.append(f.getDisponibilitate());
            sb.append('\n');
        }
        try {
            FileWriter csvFile = new FileWriter("./csvReport.csv");
            csvFile.write(sb.toString());
            csvFile.flush();
            System.out.println("done!");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void createXMLReport(String florarie) {
        JavaXmlDomWrite javaXmlDomWrite = new JavaXmlDomWrite(florarie, this.persistentaFlorarie);
        try {
            javaXmlDomWrite.report();
        } catch (ParserConfigurationException ex) {
            ex.printStackTrace();
        } catch (TransformerException ex) {
            ex.printStackTrace();
        }
    }

}

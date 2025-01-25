package com.sc.cloudflare;
import java.io.*;
import java.net.*;
import java.util.regex.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class DDNSUpdater {
    // The email used to login 'https://dash.cloudflare.com'
    private static final String AUTH_EMAIL = "";
    // Set to "global" for Global API Key or "token" for Scoped API Token
    private static final String AUTH_METHOD = "token";
    // Your API Token or Global API Key
    private static final String AUTH_KEY = "";
    // Can be found in the "Overview" tab of your domain
    private static final String ZONE_IDENTIFIER = "";
    // Which record you want to be synced
    private static final String RECORD_NAME = "";
    // Set the DNS TTL (seconds)
    private static final int TTL = 3600;
    // Set the proxy to true or false
    private static final boolean PROXY = false;
    // Title of site "Example Site"
    private static final String SITE_NAME = "";
    // Slack Channel #example
    private static final String SLACK_CHANNEL = "";
    // URI for Slack WebHook "https://hooks.slack.com/services/xxxxx"
    private static final String SLACK_URI = "";
    // URI for Discord WebHook "https://discordapp.com/api/webhooks/xxxxx"
    private static final String DISCORD_URI = "";

    public static void main(String[] args) throws Exception {
        // Check if we have a public IP
        String ip = getPublicIP();
        if (ip == null) {
            System.err.println("DDNS Updater: Failed to find a valid IP.");
            System.exit(2);
        }

        // Check and set the proper auth header
        String authHeader = AUTH_METHOD.equals("global") ? "X-Auth-Key: " : "Authorization: Bearer ";

        // Seek for the A record
        String record = httpRequest("https://api.cloudflare.com/client/v4/zones/" + ZONE_IDENTIFIER + "/dns_records?type=A&name=" + RECORD_NAME, "GET", authHeader);

        // Check if the domain has an A record
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonRecord = mapper.readTree(record);
        if (jsonRecord.get("result_info").get("count").asInt() == 0) {
            System.err.println("DDNS Updater: Record does not exist, create one first?");
            System.exit(1);
        }

        // Get existing IP
        String oldIp = jsonRecord.get("result").get(0).get("content").asText();
        // Compare if they're the same
        if (ip.equals(oldIp)) {
            System.out.println("DDNS Updater: IP (" + ip + ") for " + RECORD_NAME + " has not changed.");
            System.exit(0);
        }

        // Set the record identifier from result
        String recordId = jsonRecord.get("result").get(0).get("id").asText();
        ObjectNode updateData = mapper.createObjectNode();
        updateData.put("type", "A");
        updateData.put("name", RECORD_NAME);
        updateData.put("content", ip);
        updateData.put("ttl", TTL);
        updateData.put("proxied", PROXY);

        // Change the IP@Cloudflare using the API
        String updateResponse = httpRequest("https://api.cloudflare.com/client/v4/zones/" + ZONE_IDENTIFIER + "/dns_records/" + recordId, "PATCH", authHeader, updateData.toString());

        // Report the status
        JsonNode updateJson = mapper.readTree(updateResponse);
        if (!updateJson.get("success").asBoolean()) {
            System.err.println("DDNS Updater: Failed to update DDNS.");
            notifyServices("Update Failed", ip);
            System.exit(1);
        }
        System.out.println("DDNS Updater: IP updated successfully.");
        notifyServices("Updated", ip);
    }

    private static String getPublicIP() throws IOException {
        String[] services = {"https://api.ipify.org", "https://ipv4.icanhazip.com"};
        for (String service : services) {
            try {
                String ip = httpRequest(service, "GET", null);
                if (ip.matches("\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b")) {
                    return ip;
                }
            } catch (Exception ignored) {}
        }
        return null;
    }

    private static String httpRequest(String urlStr, String method, String authHeader) throws IOException {
        return httpRequest(urlStr, method, authHeader, null);
    }

    private static String httpRequest(String urlStr, String method, String authHeader, String data) throws IOException {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod(method);
        conn.setRequestProperty("Content-Type", "application/json");
        if (authHeader != null) {
            conn.setRequestProperty(authHeader.split(": ")[0], authHeader.split(": ")[1] + AUTH_KEY);
        }
        if (data != null) {
            conn.setDoOutput(true);
            try (OutputStream os = conn.getOutputStream()) {
                os.write(data.getBytes());
            }
        }
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        }
    }

    private static void notifyServices(String status, String ip) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        if (!SLACK_URI.isEmpty()) {
            ObjectNode slackMessage = mapper.createObjectNode();
            slackMessage.put("channel", SLACK_CHANNEL);
            slackMessage.put("text", SITE_NAME + " DDNS " + status + ": " + RECORD_NAME + " IP: " + ip);
            httpRequest(SLACK_URI, "POST", "Content-Type: application/json", slackMessage.toString());
        }
        if (!DISCORD_URI.isEmpty()) {
            ObjectNode discordMessage = mapper.createObjectNode();
            discordMessage.put("content", SITE_NAME + " DDNS " + status + ": " + RECORD_NAME + " IP: " + ip);
            httpRequest(DISCORD_URI, "POST", "Content-Type: application/json", discordMessage.toString());
        }
    }
}

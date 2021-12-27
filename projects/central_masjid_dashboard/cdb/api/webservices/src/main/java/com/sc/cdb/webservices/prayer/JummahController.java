package com.sc.cdb.webservices.prayer;

import java.nio.charset.StandardCharsets;
import java.util.List;

import com.sc.cdb.data.model.cc.Jummah;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.JummahService;
import com.sc.cdb.webservices.utils.JsonpService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/jummah", produces = MediaType.APPLICATION_JSON_VALUE)
public class JummahController {

    private JummahService jummahService;
    private JsonpService jsonpService;

    public JummahController(JummahService jummahService, JsonpService jsonpService) {
        this.jummahService = jummahService;
        this.jsonpService = jsonpService;
    }

    @GetMapping("companyId/{companyId}")
    public ResponseEntity<?> schedule(@PathVariable String companyId,
            @RequestParam(value = "cb", required = false) String cb) {

        ServiceResponse<List<Jummah>> responseObject = jummahService.schedule(companyId);

        if (jsonpService.validCallback(cb)) {
            return ResponseEntity
                    .ok()
                    .contentType(new MediaType("application", "javascript", StandardCharsets.UTF_8))
                    .body(jsonpService.makeJsonpScript(cb, responseObject));
        } else {
            return ResponseEntity.ok(responseObject);

        }
    }
}


package com.police.emuddamal.controllers;

import com.police.emuddamal.objects.Muddemaal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/muddemaal")
public class MuddemalController {

    // In-memory list to simulate a database for demonstration
    private List<Muddemaal> muddemaalList = new ArrayList<>();

    // GET all muddemaal items
    @GetMapping
    public ResponseEntity<List<Muddemaal>> getAllMuddemaals() {
        return ResponseEntity.ok(muddemaalList);
    }

    // GET a single muddemaal item by serial number	
    public ResponseEntity<List<Muddemaal>> getMuddemaalBySerialNumber(@PathVariable int serialNumber) {
        List<Muddemaal> filteredMuddemaals = muddemaalList.stream()
                .filter(m -> m.getSerialNumber() == serialNumber)
                .collect(Collectors.toList());

        if (filteredMuddemaals.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(filteredMuddemaals);
    }

    // POST to create a new muddemaal item
    @PostMapping
    public ResponseEntity<Muddemaal> createMuddemaal(@RequestBody Muddemaal muddemaal) {
        muddemaalList.add(muddemaal);
        return ResponseEntity.status(HttpStatus.CREATED).body(muddemaal);
    }

    // PUT to update an existing muddemaal item by serial number
    @PutMapping("/{serialNumber}")
    public ResponseEntity<Muddemaal> updateMuddemaal(@PathVariable int serialNumber, @RequestBody Muddemaal muddemaal) {
        for (int i = 0; i < muddemaalList.size(); i++) {
            if (muddemaalList.get(i).getSerialNumber() == serialNumber) {
                muddemaalList.set(i, muddemaal);
                return ResponseEntity.ok(muddemaal);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // DELETE a muddemaal item by serial number
    @DeleteMapping("/{serialNumber}")
    public ResponseEntity<Void> deleteMuddemaal(@PathVariable int serialNumber) {
        boolean removed = muddemaalList.removeIf(m -> m.getSerialNumber() == serialNumber);
        if (removed) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
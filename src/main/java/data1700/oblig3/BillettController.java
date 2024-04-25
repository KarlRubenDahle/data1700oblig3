package data1700.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//Code based on Cosmins example code

@RestController
public class BillettController {

    @Autowired
    BillettRepository billettRepository;
    @GetMapping("/heiverden") // hello world test
    public String heiVerden (String navn){
        return "Hei Verden, "+navn;
    }


    @PostMapping("/submitdata") // sends data to java anf prints it
    public String submitData(@RequestBody Billett billett) {
        // Handle the submitted data
        System.out.println("mottatt: " + billett.toString());
//      Billett billett1 = new Billett();
        return "Data submitted successfully: " + billett;
    }


    @GetMapping("/getBilletterFromDB")
    public List <Billett> getStudentsFromDB(){
        return billettRepository.findAll();
    }

    @PostMapping("/insertBillettInDB")
    public void insertBillettInDb(Billett billett){
        billettRepository.insertBillettInDB(billett);
        System.out.println("mottatt: " + billett);
    }

    @DeleteMapping("/deleteBillett")
    public String deleteBillett(@RequestParam Long id){
        billettRepository.deleteBillett(id);
        System.out.println("Billett deleted");
        return "deleted";
    }

}

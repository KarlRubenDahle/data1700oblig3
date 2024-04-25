package data1700.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository billettRepository;
    @GetMapping("/heiverden") // hello world test
    public String heiVerden (String navn){
        return "Hei Verden, "+navn;
    }

    @GetMapping("/kinobillett") //returns premade billett
    public Billett showBillett(){
        Billett billett1 = new Billett("Titanic 2", 2, "Andre", "Hestvoll",
                "23456789", "kr.kr@kr.kr");
        return billett1;
    }

    @GetMapping("/kinobilletter") // returns list with two premade billett
    public List<Billett> showBilletter(){
        Billett Billett1 = new Billett("Deep Blue Ocean", 5, "Even", "Harr",
                "12345678", "no@no.no");
        Billett Billett2 = new Billett("Titanic 2", 7, "Thorvald", "Tønnesen",
                "11223344", "se@se.se");
        List<Billett> billettList = new ArrayList<>();
        billettList.add(Billett1);
        billettList.add(Billett2);

        return billettList;
    }


    @PostMapping("/senddudes") //test for postmapping
    public void motattInfo(@RequestBody Billett billett){
        System.out.println("Jeg fikk akkurat dudes. Her er de: ");
        System.out.println(billett.toString());
    }

    @PostMapping("/submitdata") // sends data to java anf prints it
    public String submitData(@RequestBody Billett billett) {
        // Handle the submitted data
        System.out.println("mottatt: " + billett.toString());
//      Billett billett1 = new Billett();
        return "Data submitted successfully: " + billett;

    }


//    @GetMapping("/getBilletterFromDB")
//    public Billett getStudentsFromDB(@RequestParam Long id){
//        return billettRepository.findAll();
//    }

    @GetMapping("/getBilletterFromDB")
    public List <Billett> getStudentsFromDB(){
        return billettRepository.findAll();
    }

    @PostMapping("/insertBillettInDB")
    public void insertBillettInDb(Billett billett){
        billettRepository.insertBillettInDB(billett);
        System.out.println("mottatt: " + billett);
    }



}

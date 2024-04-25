package data1700.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


//Code based on Cosmins example code

@Repository
public class BillettRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    class BillettRowMapper implements RowMapper < Billett > {
        @Override
        public Billett mapRow(ResultSet rs, int rowNum) throws SQLException {
            Billett billett = new Billett();
            billett.setId(rs.getLong("id"));
            billett.setFilm(rs.getString("film"));
            billett.setAntall(rs.getInt("antall"));
            billett.setFornavn(rs.getString("fornavn"));
            billett.setEtternavn(rs.getString("etternavn"));
            billett.setTelefonnr(rs.getString("telefonnr"));
            billett.setEpost(rs.getString("epost"));
            return billett;
        }
    }

//    public Billett findById(long id) {
//        return jdbcTemplate.queryForObject("select * from billett where id=?", new BillettRowMapper(), id);
////        return jdbcTemplate.queryForObject("select * from billett", new BillettRowMapper(), id);
//
//    }

    public List<Billett> findAll(){
        return jdbcTemplate.query("SELECT * FROM billett ORDER BY etternavn", new BillettRowMapper());
    }

    public int insertBillettInDB(Billett billett) {  // Inserts billett into database
        String sql = "INSERT INTO billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?)";
        System.out.println(billett + "sent to database");
        return jdbcTemplate.update(sql, billett.getFilm(),billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
    }

//    public int updateBillett(Billett billett) { //updates billet information
//        String sql = "UPDATE billett SET film = ?, antall =?, fornavn =?, etternavn =?, telefonnr =?, epost =? where id= ?";
//        return jdbcTemplate.update(sql, billett.getFilm(),billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost(), billett.getId());
//    }

    public int deleteBillett(Long id){
        String sql = "delete from billett where id = ?";
        return jdbcTemplate.update(sql,new Object[]{
                id
        });
    }
}

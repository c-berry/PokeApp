package com.personal.pokeapp.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "type")
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToMany(mappedBy = "type")
    private List<Pokemon> pokemon;

//    @OneToOne(cascade = CascadeType.ALL)
//    private Pokemon pokemon;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeNormal normal;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeBug bug;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeDark dark;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeDragon dragon;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeElectric electric;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeFairy fairy;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeFighting fighting;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeFire fire;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeFlying flying;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private TypeGhost ghost;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private

    public Type(){}

    public Type(List<Pokemon> pokemon) {
        this.pokemon = pokemon;
    }

    public Type(String name) {
        this.name = name;
    }

    public Type(String name, List<Pokemon> pokemon) {
        this.name = name;
        this.pokemon = pokemon;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Pokemon> getPokemon() {
        return pokemon;
    }

    public void setPokemon(List<Pokemon> pokemon) {
        this.pokemon = pokemon;
    }
}

package com.personal.pokeapp.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pokemon",
        uniqueConstraints = @UniqueConstraint(columnNames = {"apiId", "name"}))
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private long apiId;

    @Column
    private String name;

    @Column
    private int weight;

    @Column
    private int height;

    @Column
    private String officialArt;

    @Column
    private String sprite;

    @Column
    private String spriteShiny;
//
//    @Column
//    private String type;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "pokemon_type",
            joinColumns = {@JoinColumn(name = "pokemon_id")},
            inverseJoinColumns = {@JoinColumn(name = "type_id")}
    )
    private List<Type> type = new ArrayList<>();


//    @Column
//    private String ability;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "pokemon_ability",
            joinColumns = {@JoinColumn(name = "pokemon_id")},
            inverseJoinColumns = {@JoinColumn(name = "ability_id")}
    )
    private List<Ability> ability = new ArrayList<>();

    public Pokemon(){}

    public Pokemon(long apiId, String name, int weight, int height, String officialArt, String sprite, String spriteShiny, List<Type> type, List<Ability> ability) {
        this.apiId = apiId;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.officialArt = officialArt;
        this.sprite = sprite;
        this.spriteShiny = spriteShiny;
        this.type = type;
        this.ability = ability;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getApiId() {
        return apiId;
    }

    public void setApiId(long apiId) {
        this.apiId = apiId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

//    public String getType() {
//        return type;
//    }
//
//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public String getAbility() {
//        return ability;
//    }
//
//    public void setAbility(String ability) {
//        this.ability = ability;
//    }

        public List<Type> getType() {
        return type;
    }

    public void setType(List<Type> type) {
        this.type = type;
    }

    public List<Ability> getAbility() {
        return ability;
    }

    public void setAbility(List<Ability> ability) {
        this.ability = ability;
    }

    public String getOfficialArt() {
        return officialArt;
    }

    public void setOfficialArt(String officialArt) {
        this.officialArt = officialArt;
    }

    public String getSprite() {
        return sprite;
    }

    public void setSprite(String sprite) {
        this.sprite = sprite;
    }

    public String getSpriteShiny() {
        return spriteShiny;
    }

    public void setSpriteShiny(String spriteShiny) {
        this.spriteShiny = spriteShiny;
    }
}

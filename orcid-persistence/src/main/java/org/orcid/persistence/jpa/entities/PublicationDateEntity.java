package org.orcid.persistence.jpa.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.orcid.jaxb.model.message.FuzzyDate;

@Embeddable
public class PublicationDateEntity extends FuzzyDateEntity {

    public PublicationDateEntity(FuzzyDate fuzzyDate) {
        super(fuzzyDate);
    }

    public PublicationDateEntity() {
    }

    public PublicationDateEntity(Integer year, Integer month, Integer day) {
        super(year, month, day);
    }

    @Override
    @Column(name = "publication_year")
    public Integer getYear() {
        return super.getYear();
    }

    @Override
    public void setYear(Integer year) {
        super.setYear(year);
    }

    @Override
    @Column(name = "publication_month")
    public Integer getMonth() {
        return super.getMonth();
    }

    @Override
    public void setMonth(Integer month) {
        super.setMonth(month);
    }

    @Override
    @Column(name = "publication_day")
    public Integer getDay() {
        return super.getDay();
    }

    @Override
    public void setDay(Integer day) {
        super.setDay(day);
    }

}
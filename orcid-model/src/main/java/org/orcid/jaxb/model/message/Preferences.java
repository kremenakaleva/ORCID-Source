/**
 * =============================================================================
 *
 * ORCID (R) Open Source
 * http://orcid.org
 *
 * Copyright (c) 2012-2014 ORCID, Inc.
 * Licensed under an MIT-Style License (MIT)
 * http://orcid.org/open-source-license
 *
 * This copyright and license information (including a link to the full license)
 * shall be included in its entirety in all copies or substantial portion of
 * the software.
 *
 * =============================================================================
 */
//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vJAXB 2.1.10 in JDK 6 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2013.01.15 at 12:09:14 PM GMT 
//

package org.orcid.jaxb.model.message;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>
 * Java class for anonymous complex type.
 * 
 * <p>
 * The following schema fragment specifies the expected content contained within
 * this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{http://www.orcid.org/ns/orcid}send-email-frequency-days"/>
 *         &lt;element ref="{http://www.orcid.org/ns/orcid}send-change-notifications"/>
 *         &lt;element ref="{http://www.orcid.org/ns/orcid}send-orcid-news"/>
 *         &lt;element ref="{http://www.orcid.org/ns/orcid}send-orcid-feature-announcements"/>
 *         &lt;element ref="{http://www.orcid.org/ns/orcid}activities-visibility-default"/>
 *         &lt;element ref="{http://www.orcid.org/ns/orcid}developer-tools-enabled" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "sendEmailFrequencyDays", "sendChangeNotifications", "sendOrcidNews", "sendOrcidFeatureAnnouncements", "activitiesVisibilityDefault",
        "workVisibilityDefault", "developerToolsEnabled" })
@XmlRootElement(name = "preferences")
public class Preferences implements Serializable {

    private final static long serialVersionUID = 1L;
    @XmlElement(name = "send-email-frequency-days")
    protected String sendEmailFrequencyDays;
    @XmlElement(name = "send-change-notifications", required = true)
    protected SendChangeNotifications sendChangeNotifications;
    @XmlElement(name = "send-orcid-news", required = true)
    protected SendOrcidNews sendOrcidNews;
    @XmlElement(name = "send-orcid-feature-announcements", required = true)
    protected Boolean sendOrcidFeatureAnnouncements;
    // as of 1.2_rc4 WorkVisibilityDefault is replaced by
    // ActivitiesVisibilityDefault
    @XmlElement(name = "work-visibility-default")
    protected WorkVisibilityDefault workVisibilityDefault;
    @XmlElement(name = "activities-visibility-default")
    private ActivitiesVisibilityDefault activitiesVisibilityDefault;
    @XmlElement(name = "developer-tools-enabled")
    private DeveloperToolsEnabled developerToolsEnabled;
    @XmlTransient
    private boolean notificationsEnabled;

    /**
     * Gets the value of the sendEmailFrequencyDays property.
     * 
     */
    public String getSendEmailFrequencyDays() {
        return sendEmailFrequencyDays;
    }

    /**
     * Sets the value of the sendEmailFrequencyDays property.
     * 
     */
    public void setSendEmailFrequencyDays(String value) {
        this.sendEmailFrequencyDays = value;
    }

    /**
     * Gets the value of the sendChangeNotifications property.
     * 
     * @return possible object is {@link SendChangeNotifications }
     * 
     */
    public SendChangeNotifications getSendChangeNotifications() {
        return sendChangeNotifications;
    }

    /**
     * Sets the value of the sendChangeNotifications property.
     * 
     * @param value
     *            allowed object is {@link SendChangeNotifications }
     * 
     */
    public void setSendChangeNotifications(SendChangeNotifications value) {
        this.sendChangeNotifications = value;
    }

    /**
     * Gets the value of the sendOrcidNews property.
     * 
     * @return possible object is {@link SendOrcidNews }
     * 
     */
    public SendOrcidNews getSendOrcidNews() {
        return sendOrcidNews;
    }

    /**
     * Sets the value of the sendOrcidNews property.
     * 
     * @param value
     *            allowed object is {@link SendOrcidNews }
     * 
     */
    public void setSendOrcidNews(SendOrcidNews value) {
        this.sendOrcidNews = value;
    }

    public Boolean getSendOrcidFeatureAnnouncements() {
        return sendOrcidFeatureAnnouncements;
    }

    public void setSendOrcidFeatureAnnouncements(Boolean sendOrcidFeatureAnnouncements) {
        this.sendOrcidFeatureAnnouncements = sendOrcidFeatureAnnouncements;
    }

    /**
     * Gets the value of the workVisibilityDefault property.
     * 
     * @deprecated use             {@getActivitiesVisibilityDefault
     * 
     * 
     * 
     * 
     * } instead.
     * 
     */
    public WorkVisibilityDefault getWorkVisibilityDefault() {
        return workVisibilityDefault;
    }

    /**
     * Sets the value of the workVisibilityDefault property.
     * 
     * @deprecated use {@setActivitiesVisibilityDefault} instead.
     * 
     */
    public void setWorkVisibilityDefault(WorkVisibilityDefault value) {
        this.workVisibilityDefault = value;
    }

    public ActivitiesVisibilityDefault getActivitiesVisibilityDefault() {
        return activitiesVisibilityDefault;
    }

    public void setActivitiesVisibilityDefault(ActivitiesVisibilityDefault activitiesVisibilityDefault) {
        this.activitiesVisibilityDefault = activitiesVisibilityDefault;
    }

    public DeveloperToolsEnabled getDeveloperToolsEnabled() {
        return developerToolsEnabled;
    }

    public void setDeveloperToolsEnabled(DeveloperToolsEnabled developerToolsEnabled) {
        this.developerToolsEnabled = developerToolsEnabled;
    }

    public boolean isNotificationsEnabled() {
        return notificationsEnabled;
    }

    public void setNotificationsEnabled(boolean notificationsEnabled) {
        this.notificationsEnabled = notificationsEnabled;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((sendChangeNotifications == null) ? 0 : sendChangeNotifications.hashCode());
        result = prime * result + ((sendOrcidNews == null) ? 0 : sendOrcidNews.hashCode());
        result = prime * result + ((workVisibilityDefault == null) ? 0 : workVisibilityDefault.hashCode());
        result = prime * result + ((activitiesVisibilityDefault == null) ? 0 : activitiesVisibilityDefault.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Preferences other = (Preferences) obj;
        if (sendChangeNotifications == null) {
            if (other.sendChangeNotifications != null)
                return false;
        } else if (!sendChangeNotifications.equals(other.sendChangeNotifications))
            return false;
        if (sendOrcidNews == null) {
            if (other.sendOrcidNews != null)
                return false;
        } else if (!sendOrcidNews.equals(other.sendOrcidNews))
            return false;
        if (workVisibilityDefault == null) {
            if (other.workVisibilityDefault != null)
                return false;
        } else if (!workVisibilityDefault.equals(other.workVisibilityDefault))
            return false;
        if (activitiesVisibilityDefault == null) {
            if (other.activitiesVisibilityDefault != null)
                return false;
        } else if (!activitiesVisibilityDefault.equals(other.activitiesVisibilityDefault))
            return false;
        return true;
    }

}

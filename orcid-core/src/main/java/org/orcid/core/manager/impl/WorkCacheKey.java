package org.orcid.core.manager.impl;

import java.io.Serializable;

/**
 * 
 * @author Will Simpson
 * 
 */
public class WorkCacheKey implements Serializable {

    private static final long serialVersionUID = 1L;

    private long id;
    private String releaseName;

    public WorkCacheKey(Long id, String releaseName) {
        this.id = id;
        this.releaseName = releaseName;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((releaseName == null) ? 0 : releaseName.hashCode());
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
        WorkCacheKey other = (WorkCacheKey) obj;
        if (id != other.id)
            return false;
        if (releaseName == null) {
            if (other.releaseName != null)
                return false;
        } else if (!releaseName.equals(other.releaseName))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "WorkCacheKey [id=" + id + ", releaseName=" + releaseName + "]";
    }
}

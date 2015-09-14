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
package org.orcid.persistence.dao;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.annotation.Resource;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.orcid.persistence.jpa.entities.InternalSSOEntity;
import org.orcid.test.DBUnitTest;
import org.orcid.test.OrcidJUnit4ClassRunner;
import org.springframework.test.context.ContextConfiguration;

/**
 * @author Angel Montenegro
 */
@RunWith(OrcidJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:orcid-persistence-context.xml" })
public class InternalSSODaoTest extends DBUnitTest {
    @Resource
    private InternalSSODao internalSSODao;

    private static final List<String> DATA_FILES = Arrays.asList("/data/SecurityQuestionEntityData.xml", "/data/SourceClientDetailsEntityData.xml",
            "/data/ProfileEntityData.xml");

    private final String ORCID = "4444-4444-4444-4441";

    @BeforeClass
    public static void initDBUnitData() throws Exception {
        initDBUnitData(DATA_FILES);
    }

    @AfterClass
    public static void removeDBUnitData() throws Exception {
        List<String> reversedDataFiles = new ArrayList<String>(DATA_FILES);
        Collections.reverse(reversedDataFiles);
        removeDBUnitData(reversedDataFiles);
    }

    @Test
    public void internalSSODaoTest() {
        String token = "Token_" + System.currentTimeMillis();
        // Create token
        InternalSSOEntity entity = internalSSODao.insert(ORCID, token);
        assertNotNull(entity);        
        // Check the token is not expired yet
        assertTrue(internalSSODao.verify(ORCID, token, 1));
        // Update it
        assertTrue(internalSSODao.update(ORCID, token));
        // Wait and make it expire
        try {
            Thread.sleep(60 * 1000);
        } catch (Exception e) {
        }
        // Assert that it is expired
        assertFalse(internalSSODao.verify(ORCID, token, 1));

        // Create an invalid token
        String updatedToken = token + "!";
        // Cannot update invalid token
        assertFalse(internalSSODao.update(ORCID, updatedToken));
        // Cannot verify invalid token
        assertFalse(internalSSODao.verify(ORCID, updatedToken, 1));
    }
}

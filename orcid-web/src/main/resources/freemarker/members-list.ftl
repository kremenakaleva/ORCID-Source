<#--

    =============================================================================

    ORCID (R) Open Source
    http://orcid.org

    Copyright (c) 2012-2014 ORCID, Inc.
    Licensed under an MIT-Style License (MIT)
    http://orcid.org/open-source-license

    This copyright and license information (including a link to the full license)
    shall be included in its entirety in all copies or substantial portion of
    the software.

    =============================================================================

-->
<@public classes=['home'] nav="members-list">
    <div class="row">        
        <div class="col-md-9 col-md-offset-3 col-sm-12 col-xs-12">
            <h1>ORCID Member Organizations</h1>
            <p>ORCID is a non-profit organization supported by a global community of organizational members, including research organizations, publishers, funders, professional associations, and other stakeholders in the research ecosystem. Interested in becoming a member? <a href="<@orcid.rootPath '/about/membership'/>">Learn more about membership</a></p>
            <div ng-controller="MembersListController">
                <div ng-hide="membersListSrvc.membersList != null" class="text-center">
                    <i class="glyphicon glyphicon-refresh spin x4 green" id="spinner"></i>
                    <!--[if lt IE 8]>
                        <img src="${staticCdn}/img/spin-big.gif" width="85" height ="85"/>
                    <![endif]-->
                </div>
                <div ng-show="membersListSrvc.membersList">
                    <p>There are {{membersListSrvc.membersList.length}} ORCID members</p>
                    <div class="member" ng-repeat="member in membersListSrvc.membersList | orderBy : 'name'">
                        <h2>{{member.name}}</h2>
                        <p>{{member.researchCommunity}} | {{member.country}}</p>
                        <p>
                        	<img class="member-logo" ng-hide="member.logoUrl == null" src="{{member.logoUrl}}">
                        	<span ng-bind-html="renderHtml(member.description)" ng-show="member.description"></span>
                        </p>
						<div class="clear-fix">
							<a class="toggle-text" href="" ng-click="toggleDisplayMoreDetails(member.id, member.consortiumLeadId)">Member details
								<i class="glyphicon x075" ng-class="displayMoreDetails[member.id] ? 'glyphicon-chevron-down' : 'glyphicon-chevron-right'"></i>
							</a>
							
						</div>

                        <div ng-show="displayMoreDetails[member.id]">
                        	<hr>
                            <p><b>Consortium/Parent Organization: </b> 
                            <span ng-show="membersListSrvc.memberDetails[member.id].parentOrgName">{{membersListSrvc.memberDetails[member.id].parentOrgName}}</span>
                            <span ng-hide="membersListSrvc.memberDetails[member.id].parentOrgName">None</span>
                            <h3>Integrations</h3>
                            <div ng-show="membersListSrvc.memberDetails[member.id].integrations" ng-repeat="integration in membersListSrvc.memberDetails[member.id].integrations">
                                <p><b>{{integration.name}}</b> <em>{{integration.stage}}</em></p>
                                <p>
                                	<span ng-bind-html="renderHtml(integration.description)" ng-show="integration.description">
	                                	
	                                </span>
	                           </p>
	                           <p>
	                                <span ng-show="integration.resourceUrl">
	                                	<a href="{{integration.resourceUrl}}" target="_blank">Learn more about this integration</a>
	                                </span>
                                </p>
                            </div>
                            <div ng-hide="membersListSrvc.memberDetails[member.id].integrations.length"> 
                                <p>This member has not completed any integrations.</p>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</@public>
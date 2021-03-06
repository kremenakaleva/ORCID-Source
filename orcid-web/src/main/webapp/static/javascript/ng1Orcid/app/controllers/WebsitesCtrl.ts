//Migrated

declare var $: any;
declare var colorbox: any;
declare var getBaseUri: any;
declare var logAjaxError: any;
declare var orcidVar: any;

import * as angular from 'angular';
import {NgModule} from '@angular/core';

// This is the Angular 1 part of the module

export const WebsitesCtrl = angular.module('orcidApp').controller(
    'WebsitesCtrl', 
    [
        '$compile',
        '$rootScope', 
        '$scope', 
        'bioBulkSrvc', 
        'commonSrvc', 
        'emailSrvc', 
        'initialConfigService', 
        'utilsService', 
        function WebsitesCtrl(
            $compile, 
            $rootScope, 
            $scope, 
            bioBulkSrvc, 
            commonSrvc, 
            emailSrvc, 
            initialConfigService, 
            utilsService
        ) {
            bioBulkSrvc.initScope($scope);

            $scope.commonSrvc = commonSrvc;
            $scope.defaultVisibility = null;
            $scope.emailSrvc = emailSrvc;
            $scope.newElementDefaultVisibility = null;
            $scope.orcidId = orcidVar.orcidId; //Do not remove
            $scope.privacyHelp = false;
            $scope.scrollTop = 0;
            $scope.showEdit = false;
            $scope.showElement = {};
            $scope.websitesForm = null;
            
            
            /////////////////////// Begin of verified email logic for work
            var configuration = initialConfigService.getInitialConfiguration();
            var emailVerified = false;
            var emails = {};
            var utilsService = utilsService;

            var showEmailVerificationModal = function(){
                $rootScope.$broadcast('emailVerifiedObj', {flag: emailVerified, emails: emails});
            };
            
            $scope.emailSrvc.getEmails(
                function(data) {
                    emails = data.emails;
                    if( $scope.emailSrvc.getEmailPrimary().verified == true ) {
                        emailVerified = true;
                    }
                }
            );
            /////////////////////// End of verified email logic for work

            $scope.addNew = function() {
                $scope.websitesForm.websites.push({ url: "", urlName: "", displayIndex: "1" });
                $scope.updateDisplayIndex();
            };

            $scope.addNewModal = function() {         
                var tmpObj = {"errors":[],"url":null,"urlName":null,"putCode":null,"visibility":{"errors":[],"required":true,"getRequiredMessage":null,"visibility":$scope.newElementDefaultVisibility},"source":$scope.orcidId,"sourceName":"", "displayIndex": 1};        
                $scope.websitesForm.websites.push(tmpObj);
                $scope.updateDisplayIndex();
                $scope.newInput = true; 
            };

            $scope.close = function() {
                $scope.getWebsitesForm();
                $scope.showEdit = false;
            };

            $scope.closeEditModal = function(){
                $.colorbox.close();
            };

            $scope.deleteWebsite = function(website){
                var websites = $scope.websitesForm.websites;
                var len = websites.length;
                while (len--) {
                    if (websites[len] == website){
                        websites.splice(len,1);
                    }
                }
            };

            $scope.getWebsitesForm = function(){
                $.ajax({
                    url: getBaseUri() + '/my-orcid/websitesForms.json',
                    dataType: 'json',
                    success: function(data) {
                        var itemVisibility = null;
                        var len = null;
                        var websites = null;

                        $scope.websitesForm = data;
                        $scope.newElementDefaultVisibility = $scope.websitesForm.visibility.visibility;
                        
                        websites = $scope.websitesForm.websites;
                        len = websites.length;
                        //Iterate over all elements to:
                        // -> see if they have the same visibility, to set the default visibility element
                        // -> set the default protocol when needed
                        if(len > 0) {
                            while (len--) {
                                if(websites[len].url != null && websites[len].url.value != null) {
                                    if (!websites[len].url.value.toLowerCase().startsWith('http')) {
                                        websites[len].url.value = 'http://' + websites[len].url.value;
                                    }                            
                                }     

                                if(websites[len].visibility != null && websites[len].visibility.visibility) {
                                    itemVisibility = websites[len].visibility.visibility;
                                }
                                /**
                                 * The default visibility should be set only when all elements have the same visibility, so, we should follow this rules: 
                                 * 
                                 * Rules: 
                                 * - If the default visibility is null:
                                 *  - If the item visibility is not null, set the default visibility to the item visibility
                                 * - If the default visibility is not null:
                                 *  - If the default visibility is not equals to the item visibility, set the default visibility to null and stop iterating 
                                 * */
                                if($scope.defaultVisibility == null) {
                                    if(itemVisibility != null) {
                                        $scope.defaultVisibility = itemVisibility;
                                    }                           
                                } else {
                                    if(itemVisibility != null) {
                                        if($scope.defaultVisibility != itemVisibility) {
                                            $scope.defaultVisibility = null;
                                            break;
                                        }
                                    } else {
                                        $scope.defaultVisibility = null;
                                        break;
                                    }
                                }                        
                            }
                        } else {
                            $scope.defaultVisibility = $scope.websitesForm.visibility.visibility;
                        }
                                        
                        $scope.$apply();
                    }
                }).fail(function(e){
                    // something bad is happening!
                    console.log("error fetching websites");
                    logAjaxError(e);
                });
            };

            $scope.hideTooltip = function(elem){
                $scope.showElement[elem] = false;
            };

            $scope.openEdit = function() {
                $scope.addNew();
                $scope.showEdit = true;
            };

            $scope.openEditModal = function(){
                if(emailVerified === true 
                    || configuration.showModalManualEditVerificationEnabled == false
                ){
                    $scope.bulkEditShow = false;
                    $.colorbox({
                        scrolling: true,
                        html: $compile($('#edit-websites').html())($scope),
                        onLoad: function() {
                            $('#cboxClose').remove();
                            if ($scope.websitesForm.websites.length == 0){
                                $scope.addNewModal();
                            } else {
                                if ($scope.websitesForm.websites.length == 1){
                                    if($scope.websitesForm.websites[0].source == null){
                                        $scope.websitesForm.websites[0].source = $scope.orcidId;
                                        $scope.websitesForm.websites[0].sourceName = "";
                                    }
                                }
                                $scope.updateDisplayIndex();
                            }                
                        },
                        width: utilsService.formColorBoxResize(),
                        onComplete: function() {
                                
                        },
                        onClosed: function() {
                            $scope.getWebsitesForm();
                        }            
                    });
                    $.colorbox.resize();
                }else{
                    showEmailVerificationModal();
                }
            };

            $scope.setBulkGroupPrivacy = function(priv) {
                for (var idx in $scope.websitesForm.websites) {
                    $scope.websitesForm.websites[idx].visibility.visibility = priv;        
                }
            };

            $scope.setPrivacy = function(priv, $event) {
                $event.preventDefault();
                $scope.defaultVisibility = priv;
            };

            $scope.setPrivacyModal = function(priv, $event, website) {        
                $event.preventDefault();
                
                var websites = $scope.websitesForm.websites;        
                var len = websites.length;
                
                while (len--) {
                    if (websites[len] == website){
                        websites[len].visibility.visibility = priv;
                        $scope.websitesForm.websites = websites;
                    }   
                }
            };

            $scope.setWebsitesForm = function(){
                var len = null;
                var websites = null;
                
                $scope.websitesForm.visibility = null;
                        
                websites = $scope.websitesForm.websites;
                len = websites.length;
                
                while (len--) {
                    if (websites[len].url == null || websites[len].url.value == null || websites[len].url.value.trim() == ''){
                        websites.splice(len,1);
                    }
                }
                $.ajax({
                    url: getBaseUri() + '/my-orcid/websitesForms.json',
                    type: 'POST',
                    data:  angular.toJson($scope.websitesForm),
                    contentType: 'application/json;charset=UTF-8',
                    dataType: 'json',
                    success: function(data) {
                        $scope.websitesForm = data;
                        if(data.errors.length == 0) {
                            $scope.close();
                            $.colorbox.close();
                        }                    
                        $scope.$apply();
                    }
                }).fail(function() {
                    // something bad is happening!
                    console.log("WebsiteCtrl.serverValidate() error");
                });
            };

            $scope.showTooltip = function(elem, event){     
                $scope.left = angular.element(event.target.parentNode).parent().prop('offsetLeft');
                $scope.top = angular.element(event.target.parentNode).parent().prop('offsetTop');
                
                $scope.$watch('scrollTop', function (value) {
                    if (elem === '-privacy'){
                        angular.element('.edit-websites .popover-help-container').css({
                            top: -195,
                            left: -4
                        });
                    }else{
                        angular.element('.edit-websites .popover-help-container').css({
                            top: $scope.top - $scope.scrollTop,
                            left: $scope.left - 5
                        });
                    }
                });
                $scope.showElement[elem] = true; 
            };

            $scope.swapDown = function(index){
                var temp =  null;
                var tempDisplayIndex = null;
                if (index < $scope.websitesForm.websites.length - 1) {
                    temp = $scope.websitesForm.websites[index];
                    tempDisplayIndex = $scope.websitesForm.websites[index]['displayIndex'];
                    temp['displayIndex'] = $scope.websitesForm.websites[index + 1]['displayIndex']
                    $scope.websitesForm.websites[index] = $scope.websitesForm.websites[index + 1];
                    $scope.websitesForm.websites[index]['displayIndex'] = tempDisplayIndex;
                    $scope.websitesForm.websites[index + 1] = temp;
                }
            };

            $scope.swapUp = function(index){
                var temp =  null;
                var tempDisplayIndex = null;
                if (index > 0) {
                    temp = $scope.websitesForm.websites[index];
                    tempDisplayIndex = $scope.websitesForm.websites[index]['displayIndex'];
                    temp['displayIndex'] = $scope.websitesForm.websites[index - 1]['displayIndex']
                    $scope.websitesForm.websites[index] = $scope.websitesForm.websites[index - 1];
                    $scope.websitesForm.websites[index]['displayIndex'] = tempDisplayIndex;
                    $scope.websitesForm.websites[index - 1] = temp;
                }
            };

            $scope.updateDisplayIndex = function() {
                let idx: any;
                idx = null;
                for (idx in $scope.websitesForm.websites){
                    $scope.websitesForm.websites[idx]['displayIndex'] = $scope.websitesForm.websites.length - idx;
                }
            };

            $scope.getWebsitesForm();
        }
    ]
);

// This is the Angular 2 part of the module
@NgModule({})
export class WebsitesCtrlNg2Module {}
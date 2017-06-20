import * as angular from 'angular';
import {NgModule} from '@angular/core';

// This is the Angular 1 part of the module
export const NotificationAlertsCtrl = angular.module('orcidApp').controller(
    'NotificationAlertsCtrl',
    [
        '$scope', 
        '$compile', 
        'notificationsSrvc', 
        function (
            $scope, 
            $compile, 
            notificationsSrvc
        ){
            $scope.notificationsSrvc = notificationsSrvc;
            notificationsSrvc.getNotificationAlerts();
        }
    ]
);

// This is the Angular 2 part of the module
@NgModule({})
export class NotificationAlertsCtrlNg2Module {}
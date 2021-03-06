import { Injectable } 
    from '@angular/core';

import { Headers, Http, RequestOptions, Response, URLSearchParams } 
    from '@angular/http';

import { Observable } 
    from 'rxjs/Observable';

import { Subject }
    from 'rxjs/Subject';

import 'rxjs/Rx';

@Injectable()
export class EmailService {
    public delEmail: any;
    private emails: any;
    private headers: Headers;          
    public inputEmail: any;
    private notify = new Subject<any>();
    private primaryEmail: any;
    private unverifiedSetPrimary: boolean;
    private url: string;

    notifyObservable$ = this.notify.asObservable();

    constructor( private http: Http ){
        this.delEmail = null;
        this.emails = null;
        this.headers = new Headers(
            { 
                'Content-Type': 'application/json' 
            }
        );     
        this.inputEmail = null;
        this.primaryEmail = null;
        this.unverifiedSetPrimary = false;
        this.url = getBaseUri() + '/account/emails.json';
    }

    addEmail( email? ): Observable<any> {
        let encoded_data;
        if( email ){
            console.log('if', email);
            encoded_data = JSON.stringify( email );
        }else{
            console.log('else', this.inputEmail);
            encoded_data = JSON.stringify( this.inputEmail );
            
        }
        
        return this.http.post( 
            getBaseUri() + '/account/addEmail.json', 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.inputEmail = data;
                if (this.inputEmail.errors.length == 0) {
                    this.initInputEmail();
                    this.getEmails();
                }                         
            }
        )
        .share();
    }

    deleteEmail() {
        let options = new RequestOptions(
            { headers: this.headers }
        );
        
        return this.http.delete( 
            getBaseUri() + '/account/deleteEmail.json?email=' + encodeURIComponent(this.delEmail.value),             
            options
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.getEmails();                       
            }
        )
        .share();
    }

    getEmailFrequencies(): Observable<any> {
        return this.http.get(
            window.location.href + '/email-frequencies.json'
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.emails = data;
                
                for (let i in data.emails){
                    //console.log('data.emails[i]', data.emails[i]);
                    if (data.emails[i].primary == true){
                        this.primaryEmail = data.emails[i];
                    }
                }                                                
            }
        )
        .share();
    }

    getEmailPrimary(): any {
        return this.primaryEmail;
    }

    getEmails(): Observable<any> {
        return this.http.get(
            this.url
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.emails = data;
                
                for (let i in data.emails){
                    //console.log('data.emails[i]', data.emails[i]);
                    if (data.emails[i].primary == true){
                        this.primaryEmail = data.emails[i];
                    }
                }                                                
            }
        )
        .share();
    }

    getData = this.getEmails;

    initInputEmail(): void {
        this.inputEmail = {
            "current":true,
            "errors":[],
            "primary":false,
            "value":"",
            "verified":false,
            "visibility":"PRIVATE"
        };
    }

    notifyOther(): void {
        this.notify.next();        
    }

    saveEmail( obj ): Observable<any> {
        let encoded_data = JSON.stringify( obj );
        
        return this.http.post( 
            this.url, 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.inputEmail = data;
                if (this.inputEmail.errors.length == 0) {
                    this.initInputEmail();
                    this.getEmails();
                }                         
            }
        )
        .share();
    }

    saveEmailFrequencies( obj ): Observable<any> {
        let encoded_data = JSON.stringify( obj );
        
        return this.http.post( 
            window.location.href + '/email-frequencies.json', 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.inputEmail = data;
                if (this.inputEmail.errors.length == 0) {
                    this.initInputEmail();
                    this.getEmails();
                }                         
            }
        )
        .share();
    }

    setData( obj ): Observable<any> {
        let encoded_data = JSON.stringify( this.emails );
        
        return this.http.post( 
            this.url, 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.inputEmail = data;
                if (this.inputEmail.errors.length == 0) {
                    this.initInputEmail();
                    this.getEmails();
                }                         
            }
        )
        .share();
    }

    setEmailPrivacy(email): Observable<any> {
        let encoded_data = JSON.stringify( email );
        
        return this.http.post( 
            getBaseUri() + '/account/email/visibility', 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {                       
            }
        )
        .share();
    }

    setPrimary(email, callback?): Observable<any> {
        let encoded_data = JSON.stringify( email );
        
        return this.http.post( 
            getBaseUri() + '/account/email/setPrimary', 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                this.inputEmail = data;
                if (this.inputEmail.errors.length == 0) {
                    this.initInputEmail();
                    this.getEmails();
                }                         
            }
        )
        .share();

        /*
        Old code, behaviour changed with new email functionality

        for (let i in this.emails.emails) {
            if (this.emails.emails[i] == email) {
                this.emails.emails[i].primary = true;
                this.primaryEmail = email;
                if (this.emails.emails[i].verified == false) {
                    this.unverifiedSetPrimary = true;
                } else {
                    this.unverifiedSetPrimary = false;
                }

            } else {
                this.emails.emails[i].primary = false;
            }
        }
        this.saveEmail();
        */
    }

    verifyEmail(email?): Observable<any>  {

        let _email = null; 
        if(email){
            _email = email;
        } else {
            _email = this.getEmailPrimary();
        }
        
        let options = new RequestOptions(
            { headers: this.headers }
        );

        return this.http.get(
            getBaseUri() + '/account/verifyEmail.json?email=' + encodeURIComponent(_email.value),
            options
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {
                                             
            }
        )
        .share();
    }

    deleteCustomEmail( obj ): Observable<any> {
        let encoded_data = JSON.stringify( obj );
        
        return this.http.post( 
            getBaseUri() + '/group/custom-emails/delete.json', 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {                      
            }
        )
        .share();
    }

    editCustomEmail( obj ): Observable<any> {
        let encoded_data = JSON.stringify( obj );
        
        return this.http.post( 
            getBaseUri() + '/group/custom-emails/update.json', 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {                      
            }
        )
        .share();
    }

    saveCustomEmail( obj ): Observable<any> {
        let encoded_data = JSON.stringify( obj );
        
        return this.http.post( 
            getBaseUri() + '/group/custom-emails/create.json', 
            encoded_data, 
            { headers: this.headers }
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {                      
            }
        )
        .share();
    }

    displayCreateForm( clientId ): Observable<any> {
        return this.http.get(
            getBaseUri() + '/group/custom-emails/get-empty.json?clientId=' + clientId
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {                                              
            }
        )
        .share();
    }

    getCustomEmails( clientId ): Observable<any> {
        return this.http.get(
            getBaseUri() + '/group/custom-emails/get.json?clientId=' + clientId
        )
        .map(
            (res:Response) => res.json()
        )
        .do(
            (data) => {                                              
            }
        )
        .share();
    }
}

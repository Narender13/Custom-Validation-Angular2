import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, matchingPasswords, passValidator } from './validator';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'form.html',
})
export class FormComponent implements OnInit {
    public registerForm: FormGroup; // our model driven form
    public myForm: FormGroup; // our form model
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    public usersubmitted: boolean;
    authenticated: any;
    public user: {
        name: string,
        address: {
            street: string,
            postcode: string // set default value to 8000
        }
    }

    constructor(private _formBuilder: FormBuilder, private route: Router) { };

    ngOnInit() {
        // we will initialize our form model here
        // the short way
        this.registerForm = this._formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            address: this._formBuilder.group({
                street: ['', Validators.required],
                zip: ['', Validators.required],
                city: ['', Validators.required],
                email: ['', Validators.compose([Validators.required, emailValidator])]
            }),
            password: ['', Validators.compose([Validators.required, passValidator])],
            confirmPassword: ['', Validators.required],
        }, { validator: matchingPasswords('password', 'confirmPassword') });
        this.myForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            addresses: this._formBuilder.array([
                this.initAddress(),
            ])
        });

        this.user = {
            name: '',
            address: {
                street: '',
                postcode: ''
            }
        };


    }
    initAddress() {
        const phoneNoRegex = /^\d{3}-?\d{3}-?\d{4}$/g;
        // initialize our address
        return this._formBuilder.group({
            street: ['', Validators.required],
            postcode: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern(phoneNoRegex)]]
        });
    }

    userFormSave(model: any) {
        this.usersubmitted = true; // set form submit to true
        // call API to save customer
        console.log(model);
    }
    addAddress() {
        // add address to the list
        const control = <any>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }
    removeAddress(i: number) {
        // remove address from the list
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

    save(model: any, isValid: boolean) {
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

    saveUser(value: any, valid: boolean) {

        console.log(value, valid);
        console.log(this.user);

    }

}



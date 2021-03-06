import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];

  signupForm: FormGroup;
  forbiddenUserNames = ["Chris", "Anna"];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsAsyncValidtors)
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([])
    });
    this.signupForm.valueChanges.subscribe (
      (value) => console.log(value)
    );
    this.signupForm.statusChanges.subscribe(

      (status) => {
        console.log(status);
      }
    );


      // this.signupForm.patchValue ({
      //   'userData' : {
      //     'username' : 'Max',
      //     'email' : 'max@test.com'
      //   },
      //   'gender' : 'male',
      //   'hobbies' : []
      // });


      this.signupForm.patchValue({
        userData: {
          username: "Max",
        }
      });
    }

  get controls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  onSubmitForm() {
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, [
      Validators.required,
      this.forbiddenNames.bind(this)
    ]);
    (this.signupForm.get("hobbies") as FormArray).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsFoebidden: true };
    }

    return null;
  }

  forbiddenEmailsAsyncValidtors(control: FormControl) : Promise<any> | Observable<any> {

    const promise = new Promise<any>((resolve, reject) =>  {

      setTimeout(() => {
        if (control.value == 'test@test.com') {
          resolve({'emailIsForbidden': true})
        }
        else {
          resolve(null)
        }
        
      }, 1500);
   },
  );

  return promise;
  }
}

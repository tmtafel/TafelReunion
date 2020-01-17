import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup.service';
import { Signup } from 'src/app/signup.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup-list',
  templateUrl: './signup-list.component.html',
  styleUrls: ['./signup-list.component.scss']
})
export class SignupListComponent implements OnInit {

  signups: Signup[];
  name = new FormControl('');
  constructor(private signupService: SignupService) { }

  ngOnInit() {
    this.signupService.getSignups().subscribe(data => {
      this.signups = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()["name"],
          creationDate: e.payload.doc.data()["creationDate"]
        } as Signup
      })
    });
  }

  create() {
    const insertName = this.name.value;
    if (insertName) {
      console.log("creating");
      this.signupService.createSignup(insertName);
    }
  }

  update(signup: Signup) {
    this.signupService.updateSignup(signup);
  }

  delete(id: string) {
    this.signupService.deleteSignup(id);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe(success => {
      this.router.navigateByUrl('/');
    });
  }

}

import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  sair(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}
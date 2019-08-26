import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { User } from '../user';
import { Repos } from '../repos';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  search: string;
  user: User;
  repos: Repos;

  constructor(public profile: ProfileService) { }

  searchUser(search) {
    this.profile.getUser(search).then(
      (success) => {
        this.user = this.profile.user;
      },
      (error) => {
        console.log(error);
      }
    );
    this.profile.getRepo(search).then(
      (success) => {
        this.repos  = this.profile.repos;
        console.log(this.repos);
      },
      (error) => {
        console.log(error);
      }

    );
  }
  ngOnInit() {
    this.searchUser('moharick');
  }



}

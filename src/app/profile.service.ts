import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';
import { Repos } from './repos';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: User;
  repos: Repos;

  urlheader = 'https://api.github.com/users/';
  repoheader = 'https://api.github.com/users/';
  apitoken = '?access_token=' + environment.apiUrl;


  constructor(private http: HttpClient) { }

  getUser(search: string) {
    // tslint:disable-next-line:class-name
    interface mydata {
      created_at: any;
      avatar_url: any;
      followers_url: any;
      following_url: any;
      repos_url: any;
      login: any;
      public_repos: any;
    }
    return new Promise((resolve, reject) => {
      this.http.get<mydata>(this.urlheader + search + this.apitoken).toPromise().then(
        (result) => {
          this.user = result;
          // console.log(result);
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );

    });
  }


  getRepo(search: string) {
    interface Myrepo {
      id: string;
      name: string;
      // tslint:disable-next-line:variable-name
      html_url: string;
      description: string;
    }
    return new Promise((resolve, reject) => {
      this.http.get<Myrepo>(this.repoheader + search + '/repos?' + this.apitoken).toPromise().then(
        (result) => {
          this.repos = result;
          resolve();
        },
        (error) => {
          reject();
        }
      );
    });

  }
}

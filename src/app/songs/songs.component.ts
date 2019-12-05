import { UserPostoji } from './../userPostoji.service';

import { Http, Response} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {


  
  pesme = [];
  pesemAkoNisteUlogovani = [];
  pesmaIzabrana = '';
  TitlnadPesmama;

  constructor(
    public sanitizer: DomSanitizer, 
    private http: Http,
    public logOrNot: UserPostoji
    ) {}

  ngOnInit() {

        if(this.logOrNot.userJeUlogovan === true){
          this.TitlnadPesmama = 'Your Songs';

          this.http.get('https://ren-musics.firebaseio.com/songs.json')
        .subscribe(
          (res: Response) => {
            const data = res.json();
            data.forEach((el)=>{

                  this.pesme.push({
                    linkPesme: el.linkPesme,
                    slika: el.slika
                  })
                  
          })
          
          }
        );

        }else{
          this.TitlnadPesmama = 'Some songs, log in to play yours';

          this.http.get('https://ren-musics.firebaseio.com/staticSongs.json')
        .subscribe(
          (res: Response) => {
            const data = res.json();
            data.forEach((el)=>{

                  this.pesme.push({
                    linkPesme: el.linkPesme,
                    slika: el.slika
                  })
                  
          })
          
          }
        );
        }

  }
  
  onPesmaKliknuta(data){

        this.pesmaIzabrana = data.linkPesme;

  }


}

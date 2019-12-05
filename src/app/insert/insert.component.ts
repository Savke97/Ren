import { UserPostoji } from './../userPostoji.service';

import { NewSongService } from './../newsongs.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response} from '@angular/http';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
})
export class InsertComponent implements OnInit{
  

  songsLinks: FormGroup;
  posalji_Pesmu_Na_Server = [];
  pokaziTutorial = false;
  textNaDugmeZaTutorial = 'Tutorial';
  constructor(private newSong: NewSongService, private http: Http, public logInorNo: UserPostoji
    ) { }


  ngOnInit() {
    this.initForm();
    this.http.get('https://ren-musics.firebaseio.com/songs.json')
    .subscribe(
      (res: Response) =>{
        const data = res.json();
        this.newSong.pesme = [];
        data.forEach((el, i)=>{
          this.newSong.ubaciNovePesme(el.linkPesme, el.slika);
        })

      }
    )
  }


  

  onSubmitClick(){
    if(this.logInorNo.userJeUlogovan === true){

      this.newSong.ubaciNovePesme(this.songsLinks.value['song'],this.songsLinks.value['tumb']);
    /* Saljem unete podatke u formi ka mom firebase serveru */
    this.http.put('https://ren-musics.firebaseio.com/songs.json', this.newSong.pesme.slice())
    .subscribe(
      (response) =>{}
    );


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'You have successfully entered the song',
      showConfirmButton: false,
      timer: 2500
    })

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not logged in',
      })
    }
    
  }

  onTutorialClick(){
    this.pokaziTutorial = !this.pokaziTutorial;
    if(this.pokaziTutorial === true){
      this.textNaDugmeZaTutorial = 'Quit Tutorial!'
    }
    else{
      this.textNaDugmeZaTutorial = 'Tutorial!'
    }
  }

  private initForm(){
    let songLink = '';
    let tumbLink = '';


    this.songsLinks = new FormGroup({
      'song': new FormControl(songLink, Validators.required),
      'tumb': new FormControl(tumbLink, Validators.required)
    })
  }

  

}

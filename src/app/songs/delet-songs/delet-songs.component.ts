import { UserPostoji } from './../../userPostoji.service';
import { NewSongService } from './../../newsongs.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Response} from '@angular/http';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-delet-songs',
  templateUrl: './delet-songs.component.html',
  styleUrls: ['./delet-songs.component.css']
})
export class DeletSongsComponent implements OnInit {


  pesme = [];
  pesmaIzbranaZaBrisanje = '';
  constructor(public sanitizer: DomSanitizer, 
              private newSong: NewSongService, 
              private http: Http,
              private forLogUsers: UserPostoji
              ) { }

  ngOnInit() {
    if(this.forLogUsers.userJeUlogovan === true){
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


  onIzabranaPesmaZaBrisanje(data){
    if(this.forLogUsers.userJeUlogovan === true){
      this.pesmaIzbranaZaBrisanje = data;
      let novePesme = [];
      Swal.fire({
        title: 'Are you sure you wont to delete this song?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          for(let i = 0; i<this.pesme.length; i++){
            if(this.pesme[i].linkPesme !== this.pesmaIzbranaZaBrisanje){
                 novePesme.push({
                      linkPesme: this.pesme[i].linkPesme,
                      slika: this.pesme[i].slika
                  }) 
            }
          }   
          this.http.put('https://ren-musics.firebaseio.com/songs.json', novePesme.slice())
            .subscribe(
                (response) =>{
                  console.log(response);
                }
              );     
          Swal.fire(
            'Deleted!',
            'Your song has been deleted. Just reload the page',
            'success'
          )
        }
      })
    }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You are not logged in to delete songs',
            })
    }
    


    
  }

}

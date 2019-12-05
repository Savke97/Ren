export class NewSongService{
    pesme = [
                {linkPesme:'https://www.youtube.com/embed/T5S9WyDboVQ', slika:'https://i.ytimg.com/vi/CoRbgUZb0n4/maxresdefault.jpg'},
                {linkPesme:'https://www.youtube.com/embed/vMDWoqCzkCg', slika:'https://i.pinimg.com/originals/61/80/c8/6180c8d91407b4ba1e10a4f8caeaf06b.jpg'}
            ];
     ubaciNovePesme(link, thumb){
        this.pesme.push({
            linkPesme: link,
            slika: thumb
        });
     }
}
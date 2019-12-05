export class UsersRegister{
    users = [
        {e:'savkeren97@gmail.com', p:'Torettoo97@'},
        {e:'savke@gmail.com', p:'Torettoo'}
      ];

    newUser(email,pass){
        this.users.push({
            e: email,
            p: pass
          })
    }
}
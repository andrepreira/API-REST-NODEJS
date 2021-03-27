const express =require('express');
const app = express();
const data=require('./data.json'); // Aqui teríamos a conexão com o banco de dados

app.use(express.json());

/** Verbos HTTP

GET: Receber dados de um Resource.
POST: Enviar dados ou informações para serem processados por um Resource.
PUT: Atualizar dados de um Resource.
DELETE: Deletar um Resource.

**/

//exemplo de cominicação padrão JSON
app.get('/clients',function(req,res){
    res.json(data);
} );

//exemplo de cominicação COM UM CLIENTE ID
app.get('/clients/:id',function(req,res){

    //escolhe o client pelo id
    const {id} = req.params;
    const client = data.find(cli => cli.id == id );

    if(!client) return res.status(204).json();

    res.json(client);
} );

app.post('/clients',function(req,res){
    //pega name e email do body do client
    const { name, email }= req.body;
    //salvar

    res.json({name, email});
} );


//Atualizar client
app.put('/clients/:id',function(req,res){
    //escolhe o client pelo id
    const {id} = req.params;
    const client = data.find(cli => cli.id == id );

    if(!client) return res.status(204).json();

    //pega name e email do body do client
    const { name, email }= req.body;

    //atualiza name e email do client
    client.name=name;
    client.email=email;

    res.json(client);

} );

app.delete('/clients/:id',function(req,res){
   // filtra os clients com id diferente do id requisitado
    const {id} = req.params;
    const clientsFiltered=data.filter(client => client.id != id); 

    res.json(clientsFiltered);
} );



app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000 ');
});
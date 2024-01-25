//ARQUIVO JS PARA MANIPULACOES ENVOLVENDO O SERVIDOR
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

//CRIANDO CONSTANTES 
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

//METEOR.STARTUP INDICA O INICIO DO CODIGO QUANDO O METEOR INICIAR
Meteor.startup(() => {
  //PELO METODO FINDUSER SE O USUARIO NAO FOR ENCONTRADO O METODO 
  if (!Accounts.findUserByUsername(SEED_USERNAME)) { 
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  //PROCURANDO NOME DO USUARIO E PASSANDO PARA UMA VARIAVEL USER
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  //PASSANDO DADOS MANUALMENTE PARA O BANCO DE DADOS
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});

//AUTENTICACAO GITHUB
ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: '3be1e05a5f88502b4384', // insert your clientId here
      secret: '5b67d36f3d3a2a0cc235c56135e9eba51d0bc63c', // insert your secret here
    },
  }
);
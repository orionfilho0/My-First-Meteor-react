//ARAMAZENA TAREFAS EM UMA INSTANCIA MONGO E EXPORTA
import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('tasks');
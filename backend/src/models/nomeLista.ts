import mongoose, { Schema, Document } from "mongoose";

// Interface para a subtarefa
interface ISubTarefa {
    nomeTarefa: string;
    descricao?: string;
    dataCriacao: Date;
    dataVencimento?: Date;
    prioridade: string;
    status: string;
}

interface ISubSubTarefa {
    nomeTarefa: string;
    descricao?: string;
    dataCriacao: Date;
    dataVencimento?: Date;
    prioridade: string;
    status: string;
}

interface IListaTarefa extends Document {
    userId: mongoose.Types.ObjectId; // Referência ao usuário
    nomeLista: string;
    dataCriacao: Date;
    tarefas: ISubTarefa[]; // Array de subtarefas
}

const ListaTarefaSchema: Schema<IListaTarefa> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    nomeLista: {
        type: String,
        required: [true, "O nome da lista é obrigatório"],
        maxlength: [100, "O nome da lista deve ter no máximo 100 caracteres"],
        trim: true
    },
    dataCriacao:{
        type: Date,
    },
    tarefas: [{
        listaid: {
            type: mongoose.Types.ObjectId,
            ref: "Lista",
            required: true
        },
        nomeTarefa: { type: String, required: [true, "O nome da tarefa é obrigatório"], maxlength: 100 },
        descricao: { type: String, maxlength: 500, trim: true },
        dataCriacao: { type: Date},
        dataVencimento: { type: Date },
        prioridade: { type: String },
        status: { type: String},
        tarefas: [{
            tarefaId: {
                type: mongoose.Types.ObjectId,
                ref: "tarefas",
                required: true
            },

            nomeTarefa: { type: String, required: [true, "O nome da tarefa é obrigatório"], maxlength: 100 },
            descricao: { type: String, maxlength: 500, trim: true },
            dataCriacao: { type: Date},
            dataVencimento: { type: Date },
            prioridade: { type: String },
            status: { type: String},
            
        }]
    }]
});

const ListaTarefa = mongoose.model<IListaTarefa>("ListaTarefa", ListaTarefaSchema);

export default ListaTarefa;

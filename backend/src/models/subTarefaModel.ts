import mongoose, { Schema, Document } from "mongoose";


interface ISubSubTarefa {
    nomeTarefa: string;
    descricao?: string;
    dataCriacao: Date;
    dataVencimento?: Date;
    prioridade: string;
    status: string;
}

interface ISubTarefa extends Document {
    listaid: mongoose.Types.ObjectId;
    nomeTarefa: string;
    descricao: string;
    dataCriacao: Date;
    dataVencimento: Date;
    prioridade: string;
    status: string;
    subtarefa: ISubSubTarefa[];
}

const SubTarefaSchema: Schema<ISubTarefa> = new Schema({
    listaid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ListaTarefa",
        required: true
    },
    nomeTarefa: {
        type: String,
        required: [true, "O nome da tarefa é obrigatório"],
        maxlength: [100, "O nome da tarefa deve ter no máximo 100 caracteres"],
        trim: true
    },
    descricao: {
        type: String,
        maxlength: [500, "A descrição deve ter no máximo 500 caracteres"],
        trim: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    dataVencimento: {
        type: Date
    },
    prioridade: {
        type: String,

    },
    status: {
        type: String,

    },
    subtarefa: [{
        nomeTarefa: { type: String, required: [true, "O nome da tarefa é obrigatório"], maxlength: 100 },
        descricao: { type: String, maxlength: 500, trim: true },
        dataCriacao: { type: Date},
        dataVencimento: { type: Date },
        prioridade: { type: String },
        status: { type: String}
    }]
});

const SubTarefa = mongoose.model<ISubTarefa>("SubTarefa", SubTarefaSchema);

export default SubTarefa;
export { ISubTarefa };

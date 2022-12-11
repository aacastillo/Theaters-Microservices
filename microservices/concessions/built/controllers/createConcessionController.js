"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConcession = void 0;
const ConcessionModel_1 = require("../models/ConcessionModel");
const createConcession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const concessionModel = new ConcessionModel_1.ConcessionModel(data);
        const newConcession = yield concessionModel.createConcession();
        res.status(200).send(newConcession);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createConcession = createConcession;

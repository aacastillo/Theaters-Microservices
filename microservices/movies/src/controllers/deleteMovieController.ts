import express, {Express, Request, Response} from 'express';
import {MovieRequest } from '../types.js';
import {MovieModel} from '../models/movieModel.js'
import * as dbe from '../data/dbCommsSingleton.js';

export const deleteMovie = async (req: Request, res: Response) => {
    const data: MovieRequest = req.body;
  
    //if data has no movie id
    let invalid = true;
    if (data.movie_id !== undefined && data.movie_id as string !== "" && typeof data.movie_id === "string") {
        invalid = false;
    }
  
    // get movie to see if it exists
    if (invalid) {
        res.status(400).send("Error: Request body does not include a valid id");
    } else {
        try {
            // get movie to see if it exists
            const movieModel = new MovieModel(data);
            if (dbe.hasMovie(movieModel.id as string)) {
                movieModel.deleteMovie();
                res.status(200).send("Success: Movie Deleted");
            } else {
                res.status(404).send("Error: Movie not found");
            }
        } catch (err) {
            res.status(400).send("Error: database failure");
        }        
    }
    
}
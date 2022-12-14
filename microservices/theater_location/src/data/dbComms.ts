import { connectDB } from './dbInit.js';
import { MongoClient, ObjectId} from 'mongodb';
import { TheaterModel, TheaterData } from '../types';
import { TheaterLocateException } from '../models/theaterLocationModel.js';

export async function getTheaters(zipcode: string): Promise<string[]> {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    let distance: number | string | undefined = process.env.ZIPCODE_PROXIMITY;

    if (distance === undefined) {
        distance = "75";
    }
    distance = parseInt(distance);

    const cursor = theaterLocations.find();
    const res: string[] = [];
    await cursor.forEach( mydoc => {
        if (Math.abs(+zipcode - +mydoc.zipcode) <= (distance as number)) {
            mydoc.theaters.forEach( function(theaterId: string) {
                res.push(theaterId);
            });
        }    
    });

    await mongo.close();
    return res;
}

export async function hasZipCode(zipcode: string) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    
    const hasZipCode = await theaterLocations.find({zipcode: zipcode}).hasNext();
    await mongo.close();
    return hasZipCode;
}

export async function addTheaterZipcode(theater: TheaterData) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const zipcode = theater["zip" as keyof typeof theater];
    let ret: string | ObjectId;

    const theaterWithZip = await theaterLocations.findOne({zipcode: zipcode});
    if (theaterWithZip) {
        theaterWithZip.theaters = theaterWithZip.theaters.push(zipcode);
        ret = zipcode;
    } else {
        ret = await createZipEntry(zipcode as string, theater.id);
    }
    await mongo.close();
    return ret;
}

export async function createZipEntry(zipcode: string, theaterId: string) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    
    const entry = {
        zipcode,
        theaters: [theaterId]
    }

    const res = await theaterLocations.insertOne(entry);
    if (!res.acknowledged) {
        throw new TheaterLocateException("Failed to insert theater zipcode", [zipcode]);
    }

    await mongo.close();
    return res.insertedId;
}

export async function removeTheaterZipcode(theater: TheaterModel) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const zipcode = theater.zip;
    const theaterId = theater.id;

    const theatersWithZip = await theaterLocations.findOne({zipcode: zipcode});
    if (!theatersWithZip) {
        throw new TheaterLocateException("Failed to delete theater, zipcode does not exist", [zipcode!]);
    }

    const theaterIds = theatersWithZip.theaters;
    // remove theaterId from list
    theaterIds.splice(theaterIds.indexOf(theaterId), 1);
    theatersWithZip.theaters = theaterIds;

    const updatedList = await theaterLocations.updateOne({zipcode: zipcode}, {'$set': theatersWithZip });
    await mongo.close();
    return updatedList;
}
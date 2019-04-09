
import mongoose, { MongooseDocument, Model } from 'mongoose';
import { error } from 'util';

const Schema = mongoose.Schema;

export enum redirectType {
  redirect = 0,
  antenna = 1,
}
export interface IUriDocument extends mongoose.Document {
  id: number;
  addId: number;
  uri: string;
  type: redirectType;
}
interface ICounters extends mongoose.Document {
  id: string;
  seq: number;
}

export class Db {
  private uri: Model<IUriDocument, {}>;
  private counters: Model<ICounters, {}>;
  private readonly test: mongoose.Schema = new Schema({
    id: Number,
    addId: Number,
    uri: String,
    type: Number,
  }, {collection: 'test'});
  private readonly countersSchema: mongoose.Schema = new Schema({
    id: String,
    seq: Number,
  }, {collection: 'counters'});

  constructor(uri: string) {
    mongoose.connect(uri, {useNewUrlParser: true});
    this.uri = mongoose.model<IUriDocument>('test', this.test);
    this.counters = mongoose.model<ICounters>('counters', this.countersSchema);
  }
  public find = async (param: object): Promise<IUriDocument[]> => {
    return await this.uri.find(param).exec();
  }
  public update = async (uri: string, type: redirectType): Promise<Uint32Array> => {
    const find = await this.find({uri, type});
    if (find.length >= 1) {
      return new Uint32Array([find[0].addId, find[0].id]);
    }
    const ret = new Uint32Array(2);
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const a = await this.counters.findByIdAndUpdate({id: 'uri_id'}, {$inc: {seq: 1}}).exec();
      if (a.seq === 0xffffffff) {
        const b = await this.counters.findByIdAndUpdate({id: 'uri_add_id'}, {$inc: {seq: 1}}).exec();
        await this.counters.updateOne({id: 'uri_id'}, {seq: 0}).exec();
        ret[0] = b.seq;
      } else if (a.seq > 0xffffffff) {
        throw new Error();
      } else {
        const b = await this.counters.findOne({id: 'uri_add_id'}).exec();
        ret[0] = b.seq;
      }
      ret[1] = a.seq;
    } catch (err) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
    const id = ret[1];
    const addId = ret[0];
    await this.counters.insertMany([{id, addId, uri, type}]);
    return ret;
  }
}






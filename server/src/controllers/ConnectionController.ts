import { Request, Response, response } from 'express';
import db from "../../database/connection";

export default class ConnectionController {

  static async create(request: Request, response: Response) {
    const { user_id } = request.body;

    try {
      await db('connection').insert({ user_id });

      return response.status(201).send();
    }catch (err) {
      return response.status(400).json({
        error: 'Unexpexted error while creating new connection'
      });
    }
    
  }

  static async index(request: Request, response: Response) {
    const totalConnections = await db('connection').count('* as total');

    const { total } = totalConnections[0];

    return response.json({ total });
  }
}
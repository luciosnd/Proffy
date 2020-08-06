import { Request, Response, response } from 'express';
import db from "../../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {  
  week_day: number; 
  from: string; 
  to: string;
}
export default class ClassController {
   
  static async create(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
  
    const trx = await db.transaction();
  
    try {
      const usersIds = await trx('user').insert({
        name, 
        avatar, 
        whatsapp,
        bio
      });
  
      const classesId = await trx('class').insert({
        subject, 
        cost,
        user_id: usersIds[0]
      }); 
  
      const classSchedule = schedule.map((item: ScheduleItem) => {
        return {
          class_id: classesId[0],
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to)
        };
      });
  
      await trx('class_schedule').insert(classSchedule);    
  
      await trx.commit();
  
      return response.status(201).json(request.body);
    
    } catch(err) {
      await trx.rollback();
      return response.status(400).json({
        error: 'Unexpexted error while creating new class'
      });
    }
  }

  static async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('class')
      .join('user', 'class.user_id', '=', 'user.id')
      .join('class_schedule', 'class.id', '=', 'class_schedule.class_id')
      .where({
        subject: subject,
        week_day: week_day,
      })
      .where('class_schedule.from', '<=', timeInMinutes)
      .where('class_schedule.to', '>', timeInMinutes)
      .select(['class.*', 'user.*']);

    return response.json(classes);
  }
  
}
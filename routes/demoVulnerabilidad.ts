/*
 * Archivo de DEMOSTRACIÓN para el laboratorio SAST (Parte D).
 * Contiene una inyección SQL intencional: NO usar en producción.
 */
import { type Request, type Response, type NextFunction } from 'express'
import * as models from '../models/index'

export function buscarUsuarioPorEmail () {
  return (req: Request, res: Response, next: NextFunction) => {
    const email = req.query.email
    // VULNERABLE: la entrada del usuario se concatena directamente en la consulta SQL
    models.sequelize.query("SELECT id, email FROM Users WHERE email = '" + email + "'")
      .then(([usuarios]) => { res.json(usuarios) })
      .catch((error: Error) => { next(error) })
  }
}

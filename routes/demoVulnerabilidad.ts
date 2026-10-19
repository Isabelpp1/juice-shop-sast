/*
 * Archivo de DEMOSTRACIÓN para el laboratorio SAST (Parte D).
 * Versión CORREGIDA: usa una consulta parametrizada (replacements).
 */
import { type Request, type Response, type NextFunction } from 'express'
import * as models from '../models/index'

export function buscarUsuarioPorEmail () {
  return (req: Request, res: Response, next: NextFunction) => {
    const email = String(req.query.email ?? '')
    // CORREGIDO: el valor se envía como parámetro enlazado, nunca se concatena en el SQL
    models.sequelize.query('SELECT id, email FROM Users WHERE email = :email', { replacements: { email } })
      .then(([usuarios]) => { res.json(usuarios) })
      .catch((error: Error) => { next(error) })
  }
}

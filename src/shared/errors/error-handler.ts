import { InvalidArgumentError } from '@/core/shared/domain/errors/invalid-argument.error'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'
import {
  EntityValidationError,
  LoadEntityError,
  SearchValidationError,
} from '@/core/shared/domain/validators/validation.error'
import { InvalidUuidError } from '@/core/shared/domain/value-objects/uuid.vo'
import { Prisma } from '@/core/shared/infra/db/prisma/generated/prisma'
import { NextFunction, Request, Response } from 'express'

export function errorHandler(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('errorHandler: ', err)
  if (err instanceof EntityValidationError)
    return res.status(400).json({ message: err.message, errors: err.error })

  if (err instanceof SearchValidationError)
    return res.status(400).json({ message: err.message })

  if (err instanceof LoadEntityError)
    return res.status(400).json({ message: err.message })

  if (err instanceof NotFoundError)
    return res.status(404).json({ message: err.message })

  if (err instanceof InvalidArgumentError)
    return res.status(400).json({ message: err.message })

  if (err instanceof InvalidUuidError)
    return res.status(400).json({ message: err.message })

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      message: 'There was an error with the database',
      fields: err.meta?.target,
    })
  }

  next()

  return res.status(500).json({ message: 'Internal server error 2' })
}

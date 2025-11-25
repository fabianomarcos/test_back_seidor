import { BadRequestError } from '@/core/shared/domain/errors/bad-request.error'
import { InvalidArgumentError } from '@/core/shared/domain/errors/invalid-argument.error'
import { NotFoundError } from '@/core/shared/domain/errors/not-found.error'
import { UniqueEntityError } from '@/core/shared/domain/errors/unique-entity.error'
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
  if (
    err instanceof BadRequestError ||
    err instanceof LoadEntityError ||
    err instanceof InvalidUuidError ||
    err instanceof InvalidArgumentError ||
    err instanceof EntityValidationError ||
    err instanceof SearchValidationError
  )
    return res.status(400).json({ message: err.message })

  if (err instanceof NotFoundError)
    return res.status(404).json({ message: err.message })

  if (err instanceof UniqueEntityError)
    return res.status(409).json({ message: err.message })

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(422).json({
      message: 'There was an error with the database',
      fields: err.meta?.target,
    })
  }

  return res.status(500).json({ message: 'Internal server error' })
}

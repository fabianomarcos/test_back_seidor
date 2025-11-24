import { DriverOutput } from '@/core/driver/application/use-cases/common/driver-output'
import { Transform } from 'class-transformer'

export class DriverPresenter {
  id: string
  name: string
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updated_at: Date

  constructor(output: DriverOutput) {
    this.id = output.id
    this.name = output.name
    this.created_at = output.created_at
    this.updated_at = output.updated_at
  }
}

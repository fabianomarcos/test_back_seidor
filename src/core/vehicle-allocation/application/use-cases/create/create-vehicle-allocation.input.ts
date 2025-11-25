import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator'

export type CreateDriveInputConstructorProps = {
  reason: string
  start_date: Date
  end_date?: Date
  driver_id: string
  vehicle_id: string
}

export class CreateVehicleAllocationInput {
  @IsString()
  @IsNotEmpty()
  reason: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  vehicle_id: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  driver_id: string

  @IsDate()
  @IsNotEmpty()
  start_date: Date

  @IsDate()
  end_date?: Date | null

  constructor(props: CreateDriveInputConstructorProps) {
    if (!props) return
    this.driver_id = props.driver_id
    this.vehicle_id = props.vehicle_id
    this.start_date = props.start_date
    this.end_date = props.end_date as Date
    this.reason = props.reason
  }
}

export class ValidateCreateVehicleAllocationInput {
  static validate(input: CreateVehicleAllocationInput) {
    return validateSync(input)
  }
}

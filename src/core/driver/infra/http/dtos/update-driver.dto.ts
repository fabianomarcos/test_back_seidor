import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateDriverInputWithoutId {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class UpdateDriverDto extends UpdateDriverInputWithoutId {}

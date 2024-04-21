import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateMedicalRecordDTO {
  @IsNotEmpty()
  patient: string

  @IsString()
  @IsNotEmpty()
  condition: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  allergies: string[]

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  surgeries: string[]
}

export class UpdateMedicalRecordDTO {
  @IsNotEmpty()
  @IsOptional()
  patient?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  condition?: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  allergies?: string[]

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  surgeries?: string[]
}

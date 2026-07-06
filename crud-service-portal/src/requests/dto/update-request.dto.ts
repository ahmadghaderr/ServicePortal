import { IsString, IsOptional, IsEmail } from 'class-validator';
import { Department } from '../entities/request.entity';

export class EditRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  department?: Department;

  @IsEmail()
  @IsOptional()
  requesterEmail?: string;
}

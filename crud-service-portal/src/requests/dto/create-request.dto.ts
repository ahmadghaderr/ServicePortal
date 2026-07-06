import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Department } from '../entities/request.entity';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsEnum(Department, {
    message: 'Department must be IT, HR, FACILITIES, or FINANCE',
  })
  department: Department;

  @IsEmail({}, { message: 'A valid email address is required' })
  requesterEmail: string;
}

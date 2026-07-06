import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
  Put,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Department, Status } from './entities/request.entity';

@Controller('api/requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('department') department?: Department,
    @Query('status') status?: Status,
  ) {
    return this.requestsService.findAll(title, department, status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.requestsService.findOne(id);
  }

  @Put(':id')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.requestsService.updateStatus(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.requestsService.cancel(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.requestsService.remove(id);
  }
}

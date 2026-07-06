import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { ServiceRequest, Status, Department } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { EditRequestDto } from './dto/update-request.dto';
@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly requestRepository: Repository<ServiceRequest>,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    const newRequest = this.requestRepository.create(createRequestDto);
    return await this.requestRepository.save(newRequest);
  }

  async findAll(title?: string, department?: Department, status?: Status) {
    const whereConditions: FindOptionsWhere<ServiceRequest> = {};

    if (title) {
      whereConditions.title = ILike(`%${title}%`);
    }

    if (department) {
      whereConditions.department = department;
    }

    if (status) {
      whereConditions.status = status;
    }

    return await this.requestRepository.find({
      where: whereConditions,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const request = await this.requestRepository.findOne({ where: { id } });

    if (!request) {
      throw new NotFoundException(`Service Request with ID #${id} not found`);
    }
    return request;
  }

  async cancel(id: number) {
    const request = await this.findOne(id);

    request.status = Status.CANCELLED;
    const updated = await this.requestRepository.save(request);

    return {
      message: 'Service request cancelled successfully',
      data: updated,
    };
  }

  async EditRequest(id: number, updateDto: EditRequestDto) {
    const request = await this.findOne(id);

    if (updateDto.title) request.title = updateDto.title;
    if (updateDto.description) request.description = updateDto.description;
    if (updateDto.department) request.department = updateDto.department;
    if (updateDto.requesterEmail)
      request.requesterEmail = updateDto.requesterEmail;

    request.status = Status.ACCEPTED;

    const updated = await this.requestRepository.save(request);

    return {
      message: 'Request updated successfully',
      data: updated,
    };
  }

  async remove(id: number) {
    const result = await this.requestRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Service Request with ID #${id} not found`);
    }

    return { message: `Request #${id} successfully deleted` };
  }
}

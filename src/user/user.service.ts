import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private readonly eventEmitter: EventEmitter2,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user);
    this.eventEmitter.emit('user.created', {
      email: user.email,
      name: user.name,
    });

    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException();
    user.email = updateUserDto.email;
    user.name = updateUserDto.name;
    await this.userRepository.update(user.id, user);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    this.eventEmitter.emit('user.deleted', {
      email: user.email,
      name: user.name,
    });
    return this.userRepository.delete({ id });
  }
}

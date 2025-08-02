import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createPost(post: CreatePostDto) {
    const userFound = await this.usersService.getUser(post.authorId);

    if (!userFound) {
      throw new HttpException(
        `Usuario con el id ${post.authorId} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }
  getPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }
}

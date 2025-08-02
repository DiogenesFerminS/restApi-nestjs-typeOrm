import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  @Get()
  getAllPost() {
    return this.postService.getPosts();
  }
}

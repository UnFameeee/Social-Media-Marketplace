import { Test, TestingModule } from '@nestjs/testing';
import { PostLikeController } from './post-like.controller';

describe('PostLikeController', () => {
  let controller: PostLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostLikeController],
    }).compile();

    controller = module.get<PostLikeController>(PostLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

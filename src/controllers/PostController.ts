/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 11:14:18
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-14 15:56:29
 */
import {JsonController, Get, Post as HttpPost, Param, Delete, Body} from "routing-controllers";
import {Service} from "typedi";
import {PostRepository} from "../repository/PostRepository";
import {Post} from "../model/Post";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi"; 
@OpenAPI({
    security: [{ basicAuth: [] }],
  })
@Service()
@JsonController()
export class PostController {

    constructor(private postRepository: PostRepository) {
    }

    @ResponseSchema(Post, { isArray: true })
    @OpenAPI({ summary: 'Return a list of users' })
    @Get("/posts")
    all(): Promise<Post[]> {
        return this.postRepository.findAll();
    }

    @Get("/posts/:id")
    @ResponseSchema(Post, { isArray: true })
    @OpenAPI({ summary: 'Return a list of users' })
    one(@Param("id") id: number): Post {
        return this.postRepository.findOne(id);
    }

    @HttpPost("/posts")
    @ResponseSchema(Post, { isArray: true })
    @OpenAPI({ summary: 'Return a list of users' })
    post(@Body() post: Post): Post {
        return this.postRepository.save(post);
    }

    @Delete("/posts/:id")
    @ResponseSchema(Post, { isArray: true })
    @OpenAPI({ summary: 'Return a list of users' })
    delete(@Param("id") id: number): Post {
        return this.postRepository.remove(id);
    }

}
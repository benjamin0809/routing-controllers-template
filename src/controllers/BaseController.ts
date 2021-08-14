/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 14:40:21
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-14 14:42:00
 */
import {JsonController, Get, Post, Param, Put, Delete, Body, UseBefore, Authorized} from "routing-controllers";
export abstract class AbstractControllerTemplate {
    @Post()
    public create() {}
  
    @Get()
    public read() {}
  
    @Put()
    public update() {}
  
    @Delete()
    public delete(@Param("id") id: number) {}
  }

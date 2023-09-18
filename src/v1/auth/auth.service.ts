import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { UserCreateReq, UserEntity } from './dtos/users.dto';
// import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Redis } from 'ioredis';
import { userType } from '@prisma/client';

interface payloadJWT {
  userId: string;
  user_type: userType;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async creatUser({
    name,
    lastName,
    email,
    password,
  }: UserCreateReq): Promise<UserEntity> {
    console.log({
      name,
      lastName,
      email,
      password,
    });

    try {
      const passwordHash = await bcrypt.hash(password, process.env.SALT_BCRYPT);
      const createduser = await this.prismaService.users.create({
        data: {
          name,
          lastName,
          email,
          passwordHash,
        },
      });
      return new UserEntity(createduser);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    // console.log(process.env.SALT_BCRYPT)
  }

  async findeByEmail(email: string): Promise<UserEntity | undefined> {
    return this.prismaService.users.findFirst({
      where: {
        email: email,
      },
    });
  }

  async generateToken(userId: string): Promise<string> {
    const payload = { userId };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 81000,
    });
    return token;
  }

  async setTokenRedis(key: string, token: string): Promise<string> {
    try {
      const cachedData = await this.redisClient.set(key, token);
      await this.redisClient.expire(key, 84600);

      return cachedData;
    } catch (e) {
      console.error(e);
    }
  }

  async getTokenRedis(key: string): Promise<string> {
    try {
      const cachedData = await this.redisClient.get(key);

      return cachedData;
    } catch (e) {
      console.error(e);
    }
  }

  async getUserWithToken(token: string): Promise<UserEntity | undefined> {
    try {
      const payload = (await jwt.verify(
        token,
        process.env.JWT_SECRET,
      )) as payloadJWT;
      if (!payload) {
        return null;
      }
      const user = await this.prismaService.users.findUnique({
        where: {
          user_id: payload.userId,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

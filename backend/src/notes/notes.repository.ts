import { Injectable } from '@nestjs/common';
import { NoteType, Prisma } from '../generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

interface UpdateNoteData {
  title?: string;
  noteType?: NoteType;
  content?: string;
  sourceUrl?: string;
  tagIds?: string[];
}

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, data: CreateNoteDto) {
    const { tagIds, ...noteData } = data;

    return this.prisma.note.create({
      data: {
        ...noteData,
        user: { connect: { id: userId } },
        tag: tagIds
          ? {
              create: tagIds.map((id) => ({
                tag: { connect: { id } },
              })),
            }
          : undefined,
      },
      include: { tag: { include: { tag: true } } },
    });
  }

  findById(id: string, userId: string) {
    return this.prisma.note.findFirst({
      where: { id, userId },
      include: { tag: { include: { tag: true } } },
    });
  }

  findByUser(userId: string) {
    return this.prisma.note.findMany({
      where: { userId },
      include: { tag: { include: { tag: true } } },
    });
  }

  async update(id: string, userId: string, data: UpdateNoteData) {
    const { tagIds, ...updateData } = data;
    try {
      return await this.prisma.note.update({
        where: { id, userId },
        data: {
          ...updateData,
          tag: tagIds
            ? {
                deleteMany: {},
                create: tagIds.map((id) => ({
                  tag: { connect: { id } },
                })),
              }
            : undefined,
        },
        include: { tag: { include: { tag: true } } },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      return this.prisma.note.delete({
        where: { id, userId },
        include: { tag: { include: { tag: true } } },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }
}

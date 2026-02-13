import { PrismaClient } from '@prisma/client';
import { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';
import { Comment } from '@/core/domain/entities/Comment';

export class PrismaCommentRepository implements ICommentRepository {
    constructor(private prisma: PrismaClient) { }

    async findByArticleId(articleId: string, offset: number = 0, limit: number = 4): Promise<Comment[]> {
        const prismaComments = await this.prisma.comment.findMany({
            where: { articleId },
            orderBy: { createdAt: 'desc' },
            skip: offset,
            take: limit,
            // Incluir datos del autor para mostrar el nombre real en la UI
            include: { user: { select: { username: true } } },
        });

        return prismaComments.map(c => new Comment({
            id: c.id,
            textComment: c.textComment,
            userId: c.userId,
            articleId: c.articleId,
            createdAt: c.createdAt,
            authorName: c.user?.username,
        }));
    }

    async findByUserAndArticle(userId: string, articleId: string): Promise<Comment | null> {
        const prismaComment = await this.prisma.comment.findFirst({
            where: {
                userId,
                articleId
            }
        });

        if (!prismaComment) return null;

        return new Comment({
            id: prismaComment.id,
            textComment: prismaComment.textComment,
            userId: prismaComment.userId,
            articleId: prismaComment.articleId,
            createdAt: prismaComment.createdAt
        });
    }

    async findById(id: string): Promise<Comment | null> {
        const prismaComment = await this.prisma.comment.findUnique({
            where: { id }
        });

        if (!prismaComment) return null;

        return new Comment({
            id: prismaComment.id,
            textComment: prismaComment.textComment,
            userId: prismaComment.userId,
            articleId: prismaComment.articleId,
            createdAt: prismaComment.createdAt
        });
    }

    async create(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
        const prismaComment = await this.prisma.comment.create({
            data: {
                textComment: comment.textComment,
                userId: comment.userId,
                articleId: comment.articleId
            }
        });

        return new Comment({
            id: prismaComment.id,
            textComment: prismaComment.textComment,
            userId: prismaComment.userId,
            articleId: prismaComment.articleId,
            createdAt: prismaComment.createdAt
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.comment.delete({
            where: { id }
        });
    }
}

import { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';
import { Comment } from '@/core/domain/entities/Comment';
import { CommentAlreadyExistsError } from '@/core/domain/errors/CommentAlreadyExistsError';

interface CreateCommentDTO {
    textComment: string;
    userId: string;
    articleId: string;
}

export class CreateCommentUseCase {
    constructor(private commentRepository: ICommentRepository) { }

    async execute(dto: CreateCommentDTO): Promise<Comment> {
        // 1. Validar unicidad (regla de negocio principal)
        const existingComment = await this.commentRepository.findByUserAndArticle(dto.userId, dto.articleId);

        if (existingComment) {
            throw new CommentAlreadyExistsError(dto.userId, dto.articleId);
        }

        // 2. Crear entidad
        return this.commentRepository.create({
            textComment: dto.textComment,
            userId: dto.userId,
            articleId: dto.articleId
        });
    }
}

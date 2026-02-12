import { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';
import { Comment } from '@/core/domain/entities/Comment';

export class GetArticleCommentsUseCase {
    constructor(private commentRepository: ICommentRepository) { }

    async execute(articleId: string, page: number = 1, pageSize: number = 4): Promise<Comment[]> {
        const offset = (page - 1) * pageSize;
        return this.commentRepository.findByArticleId(articleId, offset, pageSize);
    }
}

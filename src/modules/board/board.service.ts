import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {

    constructor(
        private readonly boardRepository: BoardRepository
    ){}

    async findBoardById(id: number): Promise<Board> {
		const board = await this.boardRepository.findOne({ id });
		if (board) {
			return board;
		}
		throw new HttpException("Board details is not exists", HttpStatus.NOT_FOUND);
	}

    async saveNewBoard(createBoardDto: CreateBoardDto){
        return await this.boardRepository.manager.connection.transaction(async manager => {
            manager.save(createBoardDto);
        });
        //return await this.boardRepository.saveBoard(createBoardDto);
    }
}

import { Injectable } from "@nestjs/common"
import { EntityRepository, Repository } from "typeorm"
import { Board } from "./board.entity"
import { CreateBoardDto } from "./dto/create-board.dto"

@Injectable()
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async saveBoard(data: CreateBoardDto){
        console.log("daaaa", data);
        
        const {
            dimensions,
            volume,
            rail,
            listing,
            brand,
            wave,
            madeof,
            finType
        } = data;

        const board = new Board();

        board.dimensions = dimensions;
        board.volume = volume;
        board.rail = rail;
        board.listing = listing;
        board.brand = brand;
        board.finType = finType;
        board.madeof = madeof;
        board.wave = wave;

        return await this.save(board);        
    }

    async updateBoard(updateBoard): Promise<Board>{
        return await this.save(updateBoard);
    }
}
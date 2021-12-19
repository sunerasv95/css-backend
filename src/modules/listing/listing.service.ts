import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { Listing } from "./listing.entity";
import { ListingRepository } from "./listing.repository";
import { CategoryService } from "../category/category.service";
import { BrandService } from "../brand/brand.service";
import { FinTypeService } from "../fin-type/fin-type.service";
import { WaveService } from "../wave/wave.service";
import { MadeofService } from "../madeof/madeof.service";
import { BoardService } from "../board/board.service";
import { getManager } from "typeorm";
import { Board } from "../board/board.entity";
import { Accessory } from "../accessory/accessory.entity";
import { DetailableTypes } from "./types/detailable-types.enums";
import { AccessoryService } from "../accessory/accessory.service";
import { slugify } from "src/common/helpers";

@Injectable()
export class ListingService {
	constructor(
		@InjectRepository(Listing)
		private readonly listingRepository: ListingRepository,
		private readonly categoryService: CategoryService,
		private readonly brandService: BrandService,
		private readonly finTypeService: FinTypeService,
		private readonly waveService: WaveService,
		private readonly madeofService: MadeofService,
		private readonly boardService: BoardService,
		private readonly accessoryService: AccessoryService
	) {}

	async findAllListings(): Promise<Listing[]> {
		return await this.listingRepository.find({ relations: ["category"] });
	}

	async findListingById(id: number): Promise<Listing> {
		const listing = await this.listingRepository.findOne(
			{ id },
			{ relations: [
				"category", 
				"accessory", 
				"board", 
				"board.brand",
				"board.finType",
				"board.wave",
				"board.madeof"
			] }
		);
		if (listing) {
			return listing;
		}
		throw new HttpException("Listing is not exists", HttpStatus.NOT_FOUND);
	}

	async createNewListing(createListDto: CreateListDto): Promise<any> {
		try {
			const {
				categoryId,
				listingTitle,
				listingDescription,
				tradeType,
				isFeatured,
				isPaid,
				isUrgent,
				board,
				accessory,
				isDeleted,
				status,
			} = createListDto;

			let detailableId: number,
				detailableType: DetailableTypes,
				savedListing: Listing = null;

			await getManager().transaction(async (manager) => {
				const category = await this.categoryService.findCategoryById(
					categoryId
				);

				let newListing = new Listing();

				newListing.listingTitle = listingTitle;
				newListing.listingSlug = await slugify(listingTitle);
				newListing.listingDescription = listingDescription;
				newListing.tradeType = tradeType;
				newListing.isFeatured = isFeatured;
				newListing.isPaid = isPaid;
				newListing.isUrgent = isUrgent;
				newListing.isDeleted = 0;
				newListing.status = 1;
				newListing.category = category;
				newListing.detailableId = detailableId;
				newListing.detailableType = detailableType;

				const listing = await manager.save(newListing);

				if (board && board != undefined) {
					const {
						dimensions,
						volume,
						rail,
						finTypeId,
						brandId,
						waveTypeId,
						madeofId,
					} = board;

					const brand = await this.brandService.findBrandById(brandId);
					const finType = await this.finTypeService.findFinTypeById(finTypeId);
					const wave = await this.waveService.findWaveById(waveTypeId);
					const madeof = await this.madeofService.findMadeofById(madeofId);

					const newBoard = new Board();

					newBoard.dimensions = dimensions;
					newBoard.volume = volume;
					newBoard.rail = rail;
					newBoard.listing = listing;
					newBoard.brand = brand;
					newBoard.finType = finType;
					newBoard.madeof = madeof;
					newBoard.wave = wave;
					newBoard.listing = listing;

					const savedBoard = await manager.save(newBoard);
					detailableId = savedBoard.id;
					detailableType = DetailableTypes.BOARD_LST;

					console.log("board", savedBoard);
				}

				if (accessory && accessory !== undefined) {
					const { brandId } = accessory;

					const brand = await this.brandService.findBrandById(brandId);

					const newAccessory = new Accessory();
					newAccessory.brand = brand;
					newAccessory.listing = listing;

					const savedAccessory = await manager.save(newAccessory);
					detailableId = savedAccessory.id;
					detailableType = DetailableTypes.ACCESSORY_LST;

					console.log("accessory", savedAccessory);
				}

				listing.detailableType = detailableType;
				listing.detailableId = detailableId;

				savedListing = await manager.save(listing);

			});

			return savedListing;

		} catch (error) {
			throw error;
		}
	}

	async updateExistListing(id: number, updateListDto: UpdateListDto): Promise<boolean> {
		try {

			const updateListing = await this.findListingById(id);
			console.log("update before", updateListing);

			const {
				categoryId,
				listingTitle,
				listingDescription,
				tradeType,
				isFeatured,
				isPaid,
				isUrgent,
				board,
				accessory,
				isDeleted,
				status,
			} = updateListDto;

			await getManager().transaction(async (manager) => {

				if (listingTitle) {
					updateListing.listingTitle = listingTitle
					updateListing.listingSlug = await slugify(listingTitle);
				};
				if (listingDescription)
					updateListing.listingDescription = listingDescription;
				if (tradeType) updateListing.tradeType = tradeType;
				if (isFeatured) updateListing.isFeatured = isFeatured;
				if (isPaid) updateListing.isPaid = isPaid;
				if (isUrgent) updateListing.isUrgent = isUrgent;
				if (categoryId) {
					const category = await this.categoryService.findCategoryById(
						categoryId
					);
					updateListing.category = category;
				}

				console.log("update", updateListing);
				
				await manager.save(updateListing);

				//update board details
				if (
					board &&
					updateListing.detailableType === DetailableTypes.BOARD_LST
				) {
					let boardId = updateListing.detailableId;
					const updateBoard = await this.boardService.findBoardById(boardId);

					const {
						dimensions,
						volume,
						rail,
						finTypeId,
						brandId,
						waveTypeId,
						madeofId,
					} = board;

					if (dimensions) updateBoard.dimensions = dimensions;
					if (volume) updateBoard.volume = volume;
					if (rail) updateBoard.rail = rail;
					if (brandId) {
						const brand = await this.brandService.findBrandById(brandId);
						updateBoard.brand = brand;
					}
					if (waveTypeId) {
						const wave = await this.waveService.findWaveById(waveTypeId);
						updateBoard.wave = wave;
					}
					if (finTypeId) {
						const finType = await this.finTypeService.findFinTypeById(
							finTypeId
						);
						updateBoard.finType = finType;
					}
					if (madeofId) {
						const madeof = await this.madeofService.findMadeofById(madeofId);
						updateBoard.madeof = madeof;
					}

					await manager.save(updateBoard);
				} 
				
				if (
					accessory &&
					updateListing.detailableType === DetailableTypes.ACCESSORY_LST
				) {
					let accessoryId = updateListing.detailableId;
					const updateAccessory = await this.accessoryService.findAccessoryById(
						accessoryId
					);

					const { brandId } = accessory;

					if (brandId) {
						const brand = await this.brandService.findBrandById(brandId);
						updateAccessory.brand = brand;
					}

					await manager.save(updateAccessory);
				} 
				//  {
				// 	throw new HttpException(
				// 		"Something went wrong!",
				// 		HttpStatus.INTERNAL_SERVER_ERROR
				// 	);
				// }
			});

		} catch (error) {
			throw error;
		}

		return true;
	}

	// async deleteExisting(id: number) {
	// 	const listing = await this.findListingById(id);

	// 	const result = await this.listingRepository.softDeleteCategory(id);
	// 	if (result.raw.affectedRows > 0) {
	// 		const updatedResult = await this.listingRepository.updateIsDeleted(id);
	// 		if (updatedResult.raw.affectedRows > 0) {
	// 			return { deleted: true };
	// 		}
	// 		return { deleted: false };
	// 	} else {
	// 		throw new HttpException("Something went wrong", 500);
	// 	}
	// }
}

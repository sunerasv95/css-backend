import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Double,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";

import { slugify } from "./../../common/helpers";
import { Brand } from "../brand/brand.entity";
import { Category } from "../category/category.entity";
import { TradeType } from "../trade-type/trade-type.entity";
import { TradeMode } from "../trade-type/enums/trade-mode.enum";
import { Board } from "../board/board.entity";
import { Accessory } from "../accessory/accessory.entity";

@Entity({ name: "trade_listings" })
export class Listing {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 200 })
	listingTitle: string;

	@Column({ type: "varchar", length: 200, unique: true })
	listingSlug: string;

	@Column({ type: "varchar", length: 600 })
	listingDescription: string;

	@Column({ type: "simple-enum", enum: TradeMode })
	tradeType: string;

	@Column({ type: "tinyint", default: 0 })
	isFeatured: number;

	@Column({ type: "tinyint", default: 0 })
	isPaid: number;

	@Column({ type: "tinyint", default: 0 })
	isUrgent: number;

	@Column({ type: "tinyint" })
	status: number;

	@Column({ type: "tinyint", default: 0 })
	isDeleted: number;

	@Column({ type: "timestamp", default: null })
	publishedAt: Date;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@DeleteDateColumn({ type: "timestamp" })
	deletedAt: Date;

	@Column({ type: "varchar", nullable: true })
	detailableType: string

	@Column({ type: "int", nullable: true })
	detailableId: number

	@Column({ type: 'int', default: 0})
	memberId: number

	@Column({ type: 'int'})
	categoryId: number

	@ManyToOne(() => Category, cat => cat.listings)
	category: Category

	@OneToOne(() => Board, board => board.listing)
	board: Board

	@OneToOne(() => Accessory, accessory => accessory.listing)
	accessory: Accessory

	// @ManyToOne(() => Member, mem => mem.listings)
	// member: Member

	// @ManyToOne(() => TradeType, tradeType => tradeType.listings)
	// tradeType: TradeType

	// @BeforeInsert()
	// async saveSlug() {		
	// 	this.listingSlug = await slugify(this.listingTitle);
	// }

	// @BeforeUpdate() 
	// 	async updateSlug() {
	// 		this.listingSlug = await slugify(this.listingTitle);
	// 	}
}

import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  IsBoolean,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  image: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateStockDto {
  @IsNumber()
  @Min(0)
  stock: number;
}

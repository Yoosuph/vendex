import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  @IsString()
  storeName?: string;

  @IsOptional()
  @IsString()
  storeDescription?: string;

  @IsOptional()
  @IsString()
  storeCategory?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  businessEmail?: string;
}

export class ApproveVendorDto {
  @IsOptional()
  @IsString()
  vendorId?: string;
}

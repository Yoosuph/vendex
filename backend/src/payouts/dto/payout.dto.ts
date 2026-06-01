import { IsNumber, IsString, IsOptional, IsBoolean, Min } from "class-validator";

export class RequestPayoutDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  methodId: string;
}

export class ProcessPayoutDto {
  @IsString()
  status: string;
}

export class CreatePayoutMethodDto {
  @IsString()
  type: string;

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @IsString()
  maskedAccount: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsString()
  country?: string;
}

export class UpdatePayoutMethodDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @IsOptional()
  @IsString()
  maskedAccount?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsString()
  country?: string;
}

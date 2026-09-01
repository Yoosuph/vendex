import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateDisputeDto {
  @IsString()
  orderId: string;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class ResolveDisputeDto {
  @IsString()
  decision: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

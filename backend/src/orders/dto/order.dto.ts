import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class ShippingDetailsDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  zip: string;
}

class PaymentMethodDto {
  @IsOptional()
  @IsString()
  cardName?: string;

  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsString()
  expDate?: string;
}

class OrderItemDto {
  @IsString()
  id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => ShippingDetailsDto)
  @IsObject()
  shippingDetails: ShippingDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentMethodDto)
  @IsObject()
  paymentMethod?: PaymentMethodDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
  @IsString()
  status: string;
}

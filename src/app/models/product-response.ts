export interface ProductResponseDto {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: number | null;         
  calories: number;
  nutrientsJson: string;

  categoryId?: number;
  categoryName?: string;
}
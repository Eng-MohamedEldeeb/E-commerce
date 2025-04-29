import { CartRepository } from 'src/db/repositories/cart.repo';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddToCartDTO } from './dto/addToCart.dto';
import { CartFactory } from './factory/cart.factory.service';
import { errorResponse } from 'src/common/res/error.response';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addToCart(userId: Types.ObjectId, addToCartDTO: AddToCartDTO) {
    return asyncHandler(async () => {
      const cart = await this.cartRepository.findOne({
        filter: { createdBy: userId },
      });

      if (!cart) {
        const cartItem = CartFactory.create({
          createdBy: userId,
          cartItem: addToCartDTO,
        });

        return {
          success: true,
          msg: 'Done',
          cart: await this.cartRepository.create(cartItem),
        };
      }

      const isInCart = cart.products.some(
        (product) =>
          product.productId.toString() == addToCartDTO.productId.toString(),
      );

      if (!isInCart) {
        return {
          success: true,
          msg: 'Done',
          cart: await this.cartRepository.updateOne({
            filter: {
              createdBy: userId,
            },
            data: {
              $push: {
                products: {
                  productId: addToCartDTO.productId,
                  quantity: addToCartDTO.quantity,
                },
              },
            },
            options: { new: true, lean: true },
          }),
        };
      }

      let productExisted: boolean = false;

      for (const [index, product] of cart.products.entries()) {
        if (product.productId.toString() == addToCartDTO.productId.toString()) {
          cart.products[index].quantity = addToCartDTO.quantity;
          productExisted = true;
          await cart.save();
          break;
        }
      }

      if (productExisted) return { success: true, msg: 'Done', cart };
    });
  }

  removeFromCart(userId: Types.ObjectId, removeFromCartDto: RemoveFromCartDto) {
    return asyncHandler(async () => {
      const cart = await this.cartRepository.findOne({
        filter: { createdBy: userId },
        projection: { _id: 1 },
        options: { lean: true },
      });

      if (!cart)
        return errorResponse('not-found', "user doesn't have cart yet");

      return {
        success: true,
        msg: 'Done',
        data: await this.cartRepository.updateById({
          id: cart._id,
          data: {
            $pull: {
              products: {
                productId: { $in: removeFromCartDto.productIds },
              },
            },
          },
          options: { new: true, lean: true },
        }),
      };
    });
  }

  clearCart(userId: Types.ObjectId) {
    return asyncHandler(async () => {
      const cart = await this.cartRepository.findOne({
        filter: { createdBy: userId },
        projection: { _id: 1 },
        options: { lean: true },
      });

      if (!cart)
        return errorResponse('not-found', "user doesn't have cart yet");

      return {
        success: true,
        msg: 'Done',
        data: await this.cartRepository.updateById({
          id: cart._id,
          data: {
            products: [],
          },
          options: { new: true, lean: true },
        }),
      };
    });
  }
}

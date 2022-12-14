import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    orderer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    recipient: {
      name: String,
      phoneNumber: String,
      address: {
        type: new Schema(
          {
            postalCode: String,
            address1: String,
            address2: String,
          },
          {
            _id: false,
          }
        ),
        required: true,
      },
      request: {
        type: String,
      },
    },
    purchaseOrderInfo: {
      type: new Schema(
        {
          products: Array,
          totalAmount: Number,
          shippingStatus: {
            type: String,
            required: false,
            default: '상품 준비중',
          },
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    deletedAt: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };

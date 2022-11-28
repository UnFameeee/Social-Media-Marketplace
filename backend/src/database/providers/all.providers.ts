import { Auth } from "src/database/model/claim.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { ChatConnectedProfile } from "src/social-media/message/model/connected.model";
import { ChatJoinedRoom } from "src/social-media/message/model/joined_room.model";
import { ChatMessage } from "src/social-media/message/model/message.model";
import { ChatRoom } from "src/social-media/message/model/room.model";
import { Category } from "../model/category.model";
import { PostCommentLike } from "../model/post-comment-like.model";
import { Description } from "../model/description.model";
import { Friendship } from "../model/friendship.model";
import { OrderLine } from "../model/order_line.model";
import { ParentChildComment } from "../model/parent_child_comment.model";
import { PaymentMethod } from "../model/payment_method.model";
import { PostComment } from "../model/post-comment.model";
import { PostLike } from "../model/post-like.model";
import { Post } from "../model/post.model";
import { Product } from "../model/product.model";
import { ProductImage } from "../model/product_image.model";
import { Profile } from "../model/profile.model";
import { ProfileAvatarImage } from "../model/profile_avatar_image.model";
import { ProfilePostImage } from "../model/profile_post_image.model";
import { ProfileWallpaperImage } from "../model/profile_wallpaper_image.mode";
import { RoomImage } from "../model/room_image";
import { ShippingAddress } from "../model/shipping_address.model";
import { ShoppingCart } from "../model/shopping_cart.model";
import { ShoppingCartItem } from "../model/shopping_cart_item.model";
import { ShopAddress } from "../model/shop_address.model";
import { ShopOrder } from "../model/shop_order.model";
import { SubCategory } from "../model/sub_category.model";
import { Variation } from "../model/variation.model";
import { Notification } from "../model/notification.model";

//Authentication
export const authProviders = [
    {
        provide: PROVIDER.Auth,
        useValue: Auth,
    }
]

//Social Media
export const postProviders = [
    {
        provide: PROVIDER.Post,
        useValue: Post
    }
]

export const postLikeProviders = [
    {
        provide: PROVIDER.PostLike,
        useValue: PostLike
    }
]

export const postCommentProviders = [
    {
        provide: PROVIDER.PostComment,
        useValue: PostComment
    }
]

export const postCommentLikeProviders = [
    {
        provide: PROVIDER.PostCommentLike,
        useValue: PostCommentLike
    }
]

export const parentChildCommentProviders = [
    {
        provide: PROVIDER.ParentChildComment,
        useValue: ParentChildComment
    }
]

export const profileProviders = [
    {
        provide: PROVIDER.Profile,
        useValue: Profile
    }
]

export const friendshipProviders = [
    {
        provide: PROVIDER.Friendship,
        useValue: Friendship
    }
]

export const descriptionProviders = [
    {
        provide: PROVIDER.Description,
        useValue: Description
    }
]

export const profileAvatarImageProviders = [
    {
        provide: PROVIDER.ProfileAvatarImage,
        useValue: ProfileAvatarImage
    }
]

export const profileWallpaperImageProviders = [
    {
        provide: PROVIDER.ProfileWallpaperImage,
        useValue: ProfileWallpaperImage
    }
]

export const profilePostImageProviders = [
    {
        provide: PROVIDER.ProfilePostImage,
        useValue: ProfilePostImage
    }
]

export const chatroomImageProviders = [
    {
        provide: PROVIDER.ChatroomImage,
        useValue: RoomImage
    }
]

//Marketplace
export const shopAddressProviders = [
    {
        provide: PROVIDER.ShopAddress,
        useValue: ShopAddress
    }
]

export const shippingAddressProviders = [
    {
        provide: PROVIDER.ShippingAddress,
        useValue: ShippingAddress
    }
]

export const shoppingCartProviders = [
    {
        provide: PROVIDER.ShoppingCart,
        useValue: ShoppingCart
    }
]


export const shoppingCartItemProviders = [
    {
        provide: PROVIDER.ShoppingCartItem,
        useValue: ShoppingCartItem
    }
]

export const productProviders = [
    {
        provide: PROVIDER.Product,
        useValue: Product
    }
]

export const shopOrderProviders = [
    {
        provide: PROVIDER.ShopOrder,
        useValue: ShopOrder
    }
]

export const paymentMethodProviders = [
    {
        provide: PROVIDER.PaymentMethod,
        useValue: PaymentMethod
    }
]

export const orderLineProviders = [
    {
        provide: PROVIDER.OrderLine,
        useValue: OrderLine
    }
]

export const productImageProviders = [
    {
        provide: PROVIDER.ProductImage,
        useValue: ProductImage
    }
]

export const variationProviders = [
    {
        provide: PROVIDER.Variation,
        useValue: Variation
    }
]

export const categoryProviders = [
    {
        provide: PROVIDER.Category,
        useValue: Category
    }
]

export const notificationProviders = [
    {
        provide: PROVIDER.Notification,
        useValue: Notification
    }
]


export const subCategoryProviders = [
    {
        provide: PROVIDER.SubCategory,
        useValue: SubCategory
    }
]


//Not used yet
export const chatConnectedProfileProviders = [
    {
        provide: PROVIDER.ChatConnectedProfile,
        useValue: ChatConnectedProfile
    }
]

export const chatJoinedRoomProviders = [
    {
        provide: PROVIDER.ChatJoinedRoom,
        useValue: ChatJoinedRoom
    }
]

export const chatMessageProviders = [
    {
        provide: PROVIDER.ChatMessage,
        useValue: ChatMessage
    }
]

export const chatRoomProviders = [
    {
        provide: PROVIDER.ChatRoom,
        useValue: ChatRoom
    }
]
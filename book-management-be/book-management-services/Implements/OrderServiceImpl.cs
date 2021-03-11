using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using book_management_models;
using book_management_models.DTOs.EmailDTO;
using book_management_models.DTOs.OrderDTOs;
using book_management_models.ServiceResults;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;
using Org.BouncyCastle.Asn1.Esf;

namespace book_management_services.Implements
{
    public class OrderServiceImpl : IOrderService
    {
        private IUnitOfWorks _unitOfWorks;
        private IMapper _mapper;
        private CartRepositoryImpl _cartRepo;
        private OrderRepositoryImpl _orderRepo;
        private OrderItemRepositoryImpl _orderItemRepo;
        private CartItemRepositoryImpl _cartItemRepo;
        private BookRepositoryImpl _bookRepo;
        private IEmailService _emailService;
        private IUserService _userService;

        public OrderServiceImpl(IUnitOfWorks unitOfWorks, IMapper mapper, IEmailService emailService, IUserService userService)
        {
            this._unitOfWorks = unitOfWorks;
            this._mapper = mapper;
            this._cartRepo = _unitOfWorks.CartRepository();
            this._orderRepo = _unitOfWorks.OrderRepository();
            this._orderItemRepo = _unitOfWorks.OrderItemRepositoryImpl();
            this._cartItemRepo = _unitOfWorks.CartItemRepository();
            this._bookRepo = _unitOfWorks.BookRepository();
            this._emailService = emailService;
            this._userService = userService;
        }

        public async Task<CreateResult> CreateOrder(OrderForCreateDTO order)
        {
            var createResult = new CreateResult()
            {
                Result = false,
                ResultMessage = ""
            };
            
            //Cart have no item to order
            if (!_cartRepo.IsCartItemExist(order.UserId))
            {
                createResult.ResultMessage = "You have no items in cart!";
                return createResult;
            }

            Cart cart = _cartRepo.GetCartByUserId(order.UserId);
            User user = _userService.GetById(order.UserId);

            //Insert new order
            Order newOrder = new Order()
            {
                UserId = order.UserId,
                TotalPrice = cart.TotalPrice,
                ShippingFee = order.ShippingFee,
                DeliveryDate =  order.DeliveryDate,
                DeliveryOption = order.DeliveryOption,
                PaymentMethod =  order.PaymentMethod,
                Status = OrderStatus.Recorded,
                User = user
            };
            var orderInsertResult = await _orderRepo.CreateOrder(newOrder);

            if (!orderInsertResult)
            {
                createResult.ResultMessage = "Insert new order failed!";
                return createResult;
            }

            IEnumerable<CartItem> cartItems = await _cartItemRepo.GetByUserId(order.UserId);
            foreach (CartItem cartItem in cartItems)
            {
                //Insert order item
                OrderItem orderItem = new OrderItem()
                {
                    BookId = cartItem.BookId,
                    Quantity = cartItem.Quantity,
                    OrderId = newOrder.Id,
                };

                var orderItemInsertResult = await _orderItemRepo.CreateOrderItem(orderItem);
                if (!orderItemInsertResult)
                {
                    createResult.ResultMessage = "Add order item failed!";
                    return createResult;
                }

                //Update book quantity
                var book = _bookRepo.GetBookById(cartItem.BookId);
                
                //Check quantity of book
                if (book.Quantity < cartItem.Quantity)
                {
                    createResult.ResultMessage = "Book's quantity is not enough!";
                    return createResult;
                }

                book.Quantity -= cartItem.Quantity;
                var updateBookResult = await _bookRepo.UpdateBook(book, cartItem.BookId);

                if (!updateBookResult)
                {
                    createResult.ResultMessage = "Update book quantity failed!";
                    return createResult;
                }
            }
            
            //Send email to user
            var mailContent = new EmailContent()
            {
                ToEmail = user.Email,
                ToName = user.Name,
                Message = "",
                Subject = "Invoid for order"
            };
            await _emailService.SendEmailAsync(mailContent, newOrder);

            //Clear all cart item after create order
            var clearCartItemResult = _cartItemRepo.ClearAllCartItem(order.UserId);
            if (!clearCartItemResult)
            {
                createResult.ResultMessage = "Clear cart item failed!";
                return createResult;
            }

            createResult.Result = true;
            createResult.ResultMessage = "Create new order successfull!";
            createResult.NewOrderId = newOrder.Id;
            return createResult;
        }

        public IEnumerable<OrderForListDTO> GetListOrder(Guid userId)
        {
            var orders = this._orderRepo.GetListOrder(userId);

            var result = _mapper.Map<List<OrderForListDTO>>(orders);

            return result;
        }

        public async Task<OrderDetailDTO> GetOrderById(Guid orderId)
        {
            var order = await _orderRepo.GetOrderById(orderId);

            var result = _mapper.Map<OrderDetailDTO>(order);

            return result;
        }
    }
}
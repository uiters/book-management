using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using book_management_models;
using book_management_models.DTOs.OrderDTOs;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

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

        public OrderServiceImpl(IUnitOfWorks unitOfWorks, IMapper mapper)
        {
            this._unitOfWorks = unitOfWorks;
            this._mapper = mapper;
            this._cartRepo = _unitOfWorks.CartRepository();
            this._orderRepo = _unitOfWorks.OrderRepository();
            this._orderItemRepo = _unitOfWorks.OrderItemRepositoryImpl();
            this._cartItemRepo = _unitOfWorks.CartItemRepository();
            this._bookRepo = _unitOfWorks.BookRepository();
        }

        public async Task<bool> CreateOrder(Guid userId)
        {
            //Cart have no item to order
            if (!_cartRepo.IsCartItemExist(userId))
            {
                return false;
            }

            Cart cart = _cartRepo.GetCartByUserId(userId);

            //Insert new order
            Order newOrder = new Order()
            {
                UserId = userId,
                TotalPrice = cart.TotalPrice
            };
            var orderInsertResult = await _orderRepo.CreateOrder(newOrder);

            if (!orderInsertResult)
            {
                return false;
            }

            IEnumerable<CartItem> cartItems = await _cartItemRepo.GetByUserId(userId);
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
                    return false;
                }
                
                //Update book quantity
                var book = _bookRepo.GetBookById(cartItem.BookId);
                book.Quantity -= cartItem.Quantity;
                var updateBookResult = await _bookRepo.UpdateBook(book, cartItem.BookId);

                if (!updateBookResult)
                {
                    return false;
                }
            }
            
            //Clear all cart item after create order
            var clearCartItemResult = _cartItemRepo.ClearAllCartItem(userId);
            if (!clearCartItemResult)
            {
                return false;
            }

            return true;
        }

        public IEnumerable<Order> GetListOrder(Guid userId)
        {
            var orders = this._orderRepo.GetListOrder(userId);

            return orders;
        }

        public async Task<OrderDetailDTO> GetOrderById(Guid orderId)
        {
            var order = await _orderRepo.GetOrderById(orderId);

            var result = _mapper.Map<OrderDetailDTO>(order);

            return result;
        }
    }
}